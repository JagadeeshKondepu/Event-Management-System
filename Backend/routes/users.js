import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get all users (vendors and customers)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ['vendor', 'user'] } }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;