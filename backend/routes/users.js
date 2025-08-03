import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ 
        error: true, 
        message: 'User not found' 
      });
    }
    res.status(200).json({ 
      error: false, 
      message: 'User retrieved successfully',
      data: user 
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Failed to fetch user profile' 
    });
  }
});

export default router;