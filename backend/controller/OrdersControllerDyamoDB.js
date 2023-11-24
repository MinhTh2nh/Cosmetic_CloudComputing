const OrderModel = require('../models/OrdersModelDyamo');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const getAllOrders = async (req, res,) => {
    try {
        const orders = await OrderModel.getOrders();
        res.json({
            items: orders.items,
            count: orders.count,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'failed', error: 'Internal Server Error' });
    }
};

const getOrdersbyID = async (res, req) => {


      try {
          const orderId = req.params.order_Id;
          const order = await OrderModel.getOrdersID(order_Id);
          if (!order) {
            return res.status(404).json({ status: 'error', message: 'Order not found' });
          }
          res.status(200).json({ status: 'success', data: order });
      } catch (error) {
          console.error('Error retrieving order:', error);
          
      }

};

module.exports = {
  getAllOrders,
  getOrdersbyID
};
