const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    quantity: Number
  }],
  total: Number,
  status: { type: String, default: 'Pending' },
  deliveryAddress: String,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
