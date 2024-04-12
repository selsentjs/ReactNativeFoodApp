const express = require('express');
const router = express.Router();

const {
  getAllFoods,
  getSingleFood,
  createFood,
  updateFood,
  deleteFood,
} = require('../controllers/gridFoodController');

router.get('/', getAllFoods);
router.get('/:id', getSingleFood);
router.post('/', createFood);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

module.exports = router;
