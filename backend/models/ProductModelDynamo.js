const AWS = require('aws-sdk')
require("dotenv").config();
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();
// console.log('DynamoDB Client:', dynamoClient);
const dynamoDB = new AWS.DynamoDB();
const TABLE_NAME = 'products';


const getAllProducts = async () => {
    const params = {
        TableName: TABLE_NAME,
        Select: 'COUNT',
    };

    const countResult = await dynamoDB.scan(params).promise();

    const scanParams = {
        TableName: TABLE_NAME,
    };

    const result = await dynamoDB.scan(scanParams).promise();

    return {
        items: result.Items,
        count: countResult.Count,
    };
};


const getProductId = async (productid) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            productid,
        },
    };

    return await dynamoClient.get(params).promise();
};

const getProductByProductType = async (productType) => {
    const params = {
        TableName: TABLE_NAME,
        FilterExpression: 'productType = :productType',
        ExpressionAttributeValues: {
            ':productType': productType,
        },
    };

    const result = await dynamoClient.scan(params).promise();
    return result.Items;
};






const createProduct = async (Product) => {
    const { count } = await getAllProducts();
    const id = count; // Increment the count for a new numeric ID
    Product.productid = id.toString(); // Convert to string for consistency

    const params = {
        TableName: TABLE_NAME,
        Item: Product,
    };

    return await dynamoClient.put(params).promise();
};



const updateProductById = async (productid, updatedProductInfo) => {
    const existingProduct = await getProductId(productid);

    if (!existingProduct.Item) {
        throw new Error('Product not found.');
    }

    const params = {
        TableName: TABLE_NAME,
        Key: {
            productid,
        },

        UpdateExpression: 'SET #name = :name, #price = :price, #description = :description, #quantity = :quantity, #productType = :productType',

        ExpressionAttributeNames: {
            '#name': 'name',
            '#price': 'price',
            '#description': 'description',
            '#quantity': 'quantity',
            '#productType': 'productType',
        },

        ExpressionAttributeValues: {
            ':name': updatedProductInfo.name || '',
            ':price': updatedProductInfo.price || '',
            ':description': updatedProductInfo.description || '',
            ':quantity': updatedProductInfo.quantity || '',
            ':productType': updatedProductInfo.productType || '', // Đảm bảo giá trị tồn tại
        },
        
        ReturnValues: 'ALL_NEW',
    };

    try {
        const result = await dynamoClient.update(params).promise();

        return result.Attributes;
    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Internal Server Error');
    }
}


const deleteProductById = async (productid) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            productid,
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
    deleteProductById,
    getProductByProductType,
};