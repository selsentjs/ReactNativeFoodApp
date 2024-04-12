const HorizontalFood = require('../models/HorizontalFood');

// get all the foods
const getAllFoods = async (req, res) => {
  try {
    const food = await HorizontalFood.find({});
    res.status(200).json({food});
  } catch (err) {
    res.status(500).json(err);
  }
};

// get single food
const getSingleFood = async (req, res) => {
  const {id: foodId} = req.params;
  try {
    const food = await HorizontalFood.findOne({_id: foodId});
    res.status(200).json({food});
  } catch (err) {
    res.status(500).json(err);
  }
};

// create food
const createFood = async (req, res) => {
  try {
    const newFood = new HorizontalFood(req.body);
    const food = await newFood.save();

    res.status(201).json({food});
  } catch (err) {
    res.status(500).json(err);
  }
};

// update food
const updateFood = async (req, res) => {
  const {id: foodId} = req.params;
  const {category, image} = req.body;
  try {
    const food = await HorizontalFood.findOneAndUpdate(
      {_id: foodId},
      {
        category: category,
        image: image,
      },
    );
    res.status(200).json({msg: 'food updated successfully', food});
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete food
const deleteFood = async (req, res) => {
  const {id: foodId} = req.params;
  try {
    const food = await HorizontalFood.findOneAndDelete({_id: foodId});
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
