const mongoose = require('mongoose');
const Order = require('../models/Order');
const moment = require('moment');

// get all the orders or orders by userId
const getAllOrders = async (req, res) => {
  const {userId} = req.query;
  try {
    let orders;
    if (userId) {
      orders = await Order.find({userId: mongoose.Types.ObjectId(userId)})
        .populate({
          path: 'userId',
          model: 'User',
          select: '-password',
        })
        .populate({
          path: 'items',
          model: 'GridFood',
        });
      //console.log('orderByUser:', orders);
    } else {
      orders = await Order.find({})
        .populate({
          path: 'userId',
          model: 'User',
          select: '-password',
        })
        .populate({
          path: 'items',
          model: 'GridFood',
        });
      console.log('getAllOrders:', orders);
    }
    res.status(200).json({orders});
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    res
      .status(500)
      .json({error: 'Internal Server Error', details: err.message});
  }
};
// get single order
const getSingleOrder = async (req, res) => {
  const {id: id} = req.params;
  try {
    const order = await Order.findById({_id: id});
    if (!order) {
      return res.status(404).json({message: 'Order not found'});
    }
    res.status(200).json({order});
  } catch (err) {
    res.status(500).json(err);
  }
};

// create order
const createOrder = async (req, res) => {
  try {
    const {userId, items, orderId, amount, address, paymentId, paymentStatus} =
      req.body;

    const order = await Order.create({
      userId,
      items,
      orderId,
      amount,
      address,
      paymentId,
      paymentStatus,
    });

    res.status(201).json({order});
  } catch (err) {
    console.error('Error creating order:', err.message);
    res
      .status(500)
      .json({error: 'Internal Server Error', details: err.message});
  }
};
// Update order
const updateOrder = async (req, res) => {
  const {id} = req.params;
  try {
    const order = await Order.findByIdAndUpdate(id, req.body, {new: true});
    if (!order) {
      return res.status(404).json({message: 'Order not found'});
    }
    res.status(200).json({order});
  } catch (err) {
    console.error('Error updating order:', err.message);
    res
      .status(500)
      .json({error: 'Internal Server Error', details: err.message});
  }
};

const deleteOrder = async (req, res) => {
  const {orderId} = req.params;
  try {
    const order = await Order.findOneAndDelete({orderId: orderId});
    if (!order) {
      return res.status(404).json({message: 'Order not found'});
    }
    res.status(200).json({msg: 'Order deleted successfully', order});
  } catch (err) {
    res.status(500).json(err);
  }
};



module.exports = {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
 
};
