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

const TABLE_NAME = 'orders';


const getOrders = async () => {

        const params = {
            TableName: TABLE_NAME,
        };

        const orderList = await dynamoClient.scan(params).promise();

        return {
            items: orderList.Items,
            count: orderList.Count,
        }
};

const getOrdersID = async (order_Id) => {
    
        const params = {
            TableName: TABLE_NAME,
            // FilterExpression: 'order_Id = :order_Id',
            // ExpressionAttributeValues: {
            //     ':order_Id': order_Id,
            // },
            Key: {
                'order_Id': order_Id,
            },
        };
      
        const result = await dynamoClient.scan(params).promise();
        return result.Item;
}

const OrderModel  = {
    dynamoClient,
    getOrdersID,
    getOrders
};

module.exports = OrderModel;
