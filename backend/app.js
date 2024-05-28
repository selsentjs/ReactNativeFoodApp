require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const HorizontalFoodRoute = require('./routes/horizontalFoodRoute');
const GridFoodRoute = require('./routes/gridFoodRoute');

require('./database/conn');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('welcome');
});

app.use('/api/v1/food', HorizontalFoodRoute);
app.use('/api/v1/grid', GridFoodRoute);

// In-memory array to store order details
const orderDetailsArray = [];

// Route to post order details
app.post('/api/v1/orderDetails', (req, res) => {
  const orderDetails = req.body;
  orderDetailsArray.push(orderDetails);
  console.log('Order details received:', orderDetails);
  res.status(200).send({message: 'Order details received successfully'});
});

// Route to get all order details
app.get('/api/v1/orderDetails', (req, res) => {
  res.status(200).json(orderDetailsArray);
});

app.listen(3000, () => {
  console.log('server is running on port 3000');
});
