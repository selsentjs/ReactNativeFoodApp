const GridFood = require('../models/GridFood');
const data = require('./gridImage.json');

// get all the foods
const getAllFoods = async (req, res) => {
  try {
    const food = await GridFood.find({});
    res.status(200).json({food});
    //res.status(200).json({food: data});
  } catch (err) {
    res.status(500).json(err);
  }
};

// get single food
const getSingleFood = async (req, res) => {
  const {id} = req.params;
  try {
    const food = data.food.find(item => item._id === id); // Search for the food item by ID
    // const food = await GridFood.findOne({_id: id});

    res.status(200).json({food});
  } catch (err) {
    res.status(500).json(err);
  }
};

// create food
const createFood = async (req, res) => {
  try {
    const newFood = new GridFood(req.body);
    const food = await newFood.save();

    res.status(201).json({food});
  } catch (err) {
    res.status(500).json(err);
  }
};

// update food
const updateFood = async (req, res) => {
  const {id: id} = req.params;

  try {
    const food = await GridFood.findOneAndUpdate({_id: id}, req.body);
    res.status(200).json({msg: 'food updated successfully', food});
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete food
const deleteFood = async (req, res) => {
  const {id: id} = req.params;
  try {
    const food = await GridFood.findOneAndDelete({_id: id});
    res.status(200).json({msg: 'food deleted successfully', food});
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllFoods,
  getSingleFood,
  createFood,
  updateFood,
  deleteFood,
};
