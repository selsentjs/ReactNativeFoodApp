const express = require('express');
const router = express.Router();

const {
  getAllOrders,
  getSingleOrder,
 
  createOrder,
  updateOrder,
  deleteOrder,
  
} = require('../controllers/orderController');

router.get('/', getAllOrders);
router.get('/:id', getSingleOrder);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:orderId', deleteOrder);


module.exports = router;
