const mongoose = require('mongoose');

const HorizontalFoodSchema = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {timestamps: true},
);

module.exports = mongoose.model('HorizontalFood', HorizontalFoodSchema);
