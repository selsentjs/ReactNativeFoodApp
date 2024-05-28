require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const HorizontalFoodRoute = require('./routes/horizontalFoodRoute');
const GridFoodRoute = require('./routes/gridFoodRoute');

require('./database/conn');

//router
const AuthRouter = require('./routes/Auth/authRoute');
const UserRouter = require('./routes/Auth/userRoute');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('welcome');
});

app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/user', UserRouter);

app.use('/api/v1/food', HorizontalFoodRoute);
app.use('/api/v1/grid', GridFoodRoute);



// In-memory array to store order details
const orderDetailsArray = [];

// Route to post order details
app.post('/api/v1/orderDetails', (req, res) => {
  const orderDetails = req.body;
  orderDetailsArray.push(orderDetails);
  console.log('Order details received:', orderDetails);
  console.log('Order items:', orderDetails.items);
  res.status(200).send({message: 'Order details received successfully'});
});

// Route to get all order details
app.get('/api/v1/orderDetails', (req, res) => {
  res.status(200).json(orderDetailsArray);
});

// route to update order details by orderId
app.put('/api/v1/orderDetails/:orderId', (req, res) => {
  const {orderId} = req.params;
  const updatedOrderDetails = req.body;
  const index = orderDetailsArray.findIndex(order => order.orderId === orderId);

  if (index !== -1) {
    orderDetailsArray[index] = {
      ...orderDetailsArray[index],
      ...updatedOrderDetails,
    };
    console.log('Order details updated:', orderDetailsArray[index]);
    res.status(200).send({message: 'Order details updated successfully'});
  } else {
    res.status(404).send({message: 'Order not found'});
  }
});

// Route to delete order details by orderId
app.delete('/api/v1/orderDetails/:orderId', (req, res) => {
  const {orderId} = req.params;
  const index = orderDetailsArray.findIndex(order => order.orderId === orderId);

  if (index !== -1) {
    orderDetailsArray.splice(index, 1);
    console.log('Order details deleted:', orderId);
    res.status(200).send({message: 'Order details deleted successfully'});
  } else {
    res.status(404).send({message: 'Order not found'});
  }
});

app.listen(3000, () => {
  console.log('server is running on port 3000');
});
