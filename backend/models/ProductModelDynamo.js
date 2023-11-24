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

const TABLE_NAME = 'products';

const getAllProducts = async () => {
    const params = {
        TableName: TABLE_NAME,
    };

    const result = await dynamoDB.scan(params).promise();

    return {
        items: result.Items,
        count: result.Count,
    };
};

const getProductId = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },
    };

    return await dynamoClient.get(params).promise();
};

//cho tạo trùng product
const createProduct = async (Product) => {
    const { count } = await getAllProducts();
    const id = (count).toString();
    Product.id = id;

    const params = {
        TableName: TABLE_NAME, 
        Item: {},
    };

    params.Item.id = Product.id;

    if (Product.image) {
        params.Item.image = Product.image;
    }

    return await dynamoClient.put(params).promise();
};

const updateProductById = async (id, updatedProductInfo) => {
    const existingUser = await getUserId(id);

    if (!existingUser.Item) {
        throw new Error('User not found.');
    }

    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },

        UpdateExpression: 'SET image = :image, name = :name, price = :price, description = :description, quantity = :quantity, productType = :productType',

        ExpressionAttributeValues: {
            ':image': updatedProductInfo.image,
            ':name': updatedProductInfo.name,
            ':price': updatedProductInfo.price,
            ':description': updatedProductInfo.description,
            ':quantity': updatedProductInfo.quantity,
            ':productType': updatedProductInfo.productType,
        },

        ReturnValues: 'ALL_NEW',
    }

    const result = await dynamoClient.update(params).promise();

    return result.Attributes;

}

const deleteProductById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },
    };

    return await dynamoClient.delete(params).promise();
};

module.exports = {
    dynamoClient,
    getAllProducts,
    getProductId,
    createProduct,
    updateProductById,
    deleteProductById
};