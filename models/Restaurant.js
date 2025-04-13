// models/Restaurant.js
import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },  // Added type for phone
  email: { type: String, required: true, unique: true },  // Added type for email and set it to unique
  password: { type: String, required: true },  // Added type for password
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who created the restaurant
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who owns the restaurant
}, { timestamps: true });

export default mongoose.model('Restaurant', restaurantSchema);
