import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { userId, userName, content } = req.body;
        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }
        const newPost = await Post.create({ user: userId, userName, content });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;