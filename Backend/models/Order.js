import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    _id: String,
    name: String,
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Processing', 'Delivered', 'Cancelled'], default: 'Processing' },
  paymentMethod: { type: String, enum: ['cash', 'upi'], default: 'cash' },
  name: String,
  email: String,
  number: String,
  address: String,
  city: String,
  state: String,
  pincode: String
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);