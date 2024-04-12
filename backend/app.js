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


app.listen(3000, () => {
  console.log('server is running on port 3000');
});
