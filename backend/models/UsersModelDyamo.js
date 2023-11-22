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

const getUserId = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },
    };
    return await dynamoClient.get(params).promise();
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
    return await dynamoClient.put(params).promise();
};
const deleteById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },
    };
    return await dynamoClient.delete(params).promise();
};

const updateUserByID = async (id, updatedUserInfo) => {
    // Check if the user with the specified ID exists
    const existingUser = await getUserId(id);

    if (!existingUser.Item) {
        throw new Error('User not found.');
    }

    // Check if the updated email or phoneNumber already exists for another user
    const duplicateUser = await getUserByEmailOrPhoneNumber(updatedUserInfo.email, updatedUserInfo.phoneNumber);

    if (duplicateUser && duplicateUser.id !== id) {
        throw new Error('User with the same email or phoneNumber already exists.');
    }
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
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

module.exports = {
    dynamoClient,
    getAllUsers,
    getUserId,
    addUser,
    deleteById,
    updateUserByID
};
