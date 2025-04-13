import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    quantity: Number
  }],
  total: Number,
  status: { type: String, default: 'Pending' },
  deliveryAddress: String,
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
