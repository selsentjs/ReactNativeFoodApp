const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GridFood',
      },
    ],

    orderId: {type: String},
    amount: {type: String},
    address: {type: String},
    paymentId: {type: String},
    paymentStatus: {type: String},
    createdAt: {type: Date},
  },
  {timestamps: true},
);

module.exports = mongoose.model('Order', OrderSchema);
