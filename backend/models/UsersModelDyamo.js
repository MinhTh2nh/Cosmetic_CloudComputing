const AWS = require('aws-sdk')
require("dotenv").config();
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const dynamoDB = new AWS.DynamoDB();

const TABLE_NAME = 'users';

const getAllUsers = async () => {
    const params = {
        TableName: TABLE_NAME,
    };

    const result = await dynamoClient.scan(params).promise();

    return {
        items: result.Items,
        count: result.Count,
    };
};

const deleteByEmail = async (email) => {
    const scanParams = {
        TableName: TABLE_NAME,
        FilterExpression: 'email = :email',
        ExpressionAttributeValues: {
            ':email': email,
        },
    };

    const scanResult = await dynamoClient.scan(scanParams).promise();

    if (scanResult.Items.length === 0) {
        throw new Error('User not found with the specified email.');
    }

    // Find the user with the matching email and get its id
    const userToDelete = scanResult.Items.find(item => item.email === email);

    if (!userToDelete) {
        throw new Error('User not found with the specified email.');
    }

    const userId = userToDelete.id;

    const deleteParams = {
        TableName: TABLE_NAME,
        Key: {
            id: userId,
        },
    };

    await dynamoClient.delete(deleteParams).promise();
    return { message: 'User deleted successfully' };

};


const getUserByEmail = async (email) => {
    const params = {
        TableName: TABLE_NAME,
        FilterExpression: 'email = :email',
        ExpressionAttributeValues: {
            ':email': email,
        },
    };

    const result = await dynamoClient.scan(params).promise();
    return result.Items[0]; 
    // Assuming there's at most one user with the same email or phoneNumber
};

const updateUserByEmail = async (email, updatedUserInfo) => {
    // Check if the user with the specified email exists
    const existingUser = await getUserByEmail(email);

    if (!existingUser.Item) {
        throw new Error('User not found.');
    }

    // Check if the updated email or phoneNumber already exists for another user
    const duplicateUser = await getUserByEmailOrPhoneNumber(updatedUserInfo.email, updatedUserInfo.phoneNumber);

    if (duplicateUser && duplicateUser.email !== email) {
        throw new Error('User with the same email or phoneNumber already exists.');
    }
    const params = {
        TableName: TABLE_NAME,
        Key: {
            email,
        },
        UpdateExpression: 'SET email = :email, password = :password, phoneNumber = :phoneNumber, username = :username',
        ExpressionAttributeValues: {
            ':email': updatedUserInfo.email,
            ':password': updatedUserInfo.password,
            ':phoneNumber': updatedUserInfo.phoneNumber,
            ':username': updatedUserInfo.username,
        },
        ReturnValues: 'ALL_NEW', // Return the updated item
    };

    const result = await dynamoClient.update(params).promise();

    return result.Attributes; // Return the updated user information
};


const getUserByEmailOrPhoneNumber = async (email, phoneNumber) => {
    const params = {
        TableName: TABLE_NAME,
        FilterExpression: 'email = :email OR phoneNumber = :phoneNumber',
        ExpressionAttributeValues: {
            ':email': email,
            ':phoneNumber': phoneNumber,
        },
    };

    const result = await dynamoClient.scan(params).promise();
    return result.Items[0]; // Assuming there's at most one user with the same email or phoneNumber
};

const addUser = async (User) => {
    const existingUser = await getUserByEmailOrPhoneNumber(User.email, User.phoneNumber);
    if (existingUser) {
        throw new Error('User with the same email or phoneNumber already exists.');
    }
    const { count } = await getAllUsers();
    // Increment the count to get the next unique ID
    const id = (count).toString();
    User.id = id;
    const params = {
        TableName: TABLE_NAME,
        Item: User,
    };
    return dynamoClient.put(params).promise();
};


const UserModel  = {
    dynamoClient,
    getUserByEmail,
    getUserByEmailOrPhoneNumber ,
    getAllUsers,
    addUser,
    deleteByEmail,
    updateUserByEmail
};

module.exports = UserModel;
