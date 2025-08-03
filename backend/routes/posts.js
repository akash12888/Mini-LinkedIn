import express from 'express';
import Post from '../models/Post.js';
import auth from '../middleware/auth.js';
import { validatePost } from '../middleware/validation.js';

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email bio')
      .sort({ createdAt: -1 });
    
    res.json({
      error: false,
      message: 'Posts retrieved successfully',
      data: posts
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ 
      error: true,
      message: 'Failed to retrieve posts' 
    });
  }
});

// Create post
router.post('/', auth, validatePost, async (req, res) => {
  try {
    const { content } = req.body;
    
    const post = new Post({
      content: content.trim(),
      author: req.userId
    });
    
    await post.save();
    
    const populatedPost = await Post.findById(post._id)
      .populate('author', 'name email bio');
    
    res.status(201).json({
      error: false,
      message: 'Post created successfully',
      data: populatedPost
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ 
      error: true,
      message: 'Failed to create post' 
    });
  }
});

// Get posts by user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const posts = await Post.find({ author: userId })
      .populate('author', 'name email bio')
      .sort({ createdAt: -1 });
    
    res.json({
      error: false,
      message: 'User posts retrieved successfully',
      data: posts
    });
  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({ 
      error: true,
      message: 'Failed to retrieve user posts' 
    });
  }
});

// Get single post
router.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    
    const post = await Post.findById(postId)
      .populate('author', 'name email bio');
    
    if (!post) {
      return res.status(404).json({ 
        error: true,
        message: 'Post not found' 
      });
    }
    
    res.json({
      error: false,
      message: 'Post retrieved successfully',
      data: post
    });
  } catch (error) {
    console.error('Get single post error:', error);
    res.status(500).json({ 
      error: true,
      message: 'Failed to retrieve post' 
    });
  }
});

// Delete post (only by author)
router.delete('/:postId', auth, async (req, res) => {
  try {
    const { postId } = req.params;
    
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ 
        error: true,
        message: 'Post not found' 
      });
    }
    
    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ 
        error: true,
        message: 'You can only delete your own posts' 
      });
    }
    
    await Post.findByIdAndDelete(postId);
    
    res.json({
      error: false,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ 
      error: true,
      message: 'Failed to delete post' 
    });
  }
});

export default router;