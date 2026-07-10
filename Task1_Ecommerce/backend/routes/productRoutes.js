import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET /api/products -> Database se saare products fetch karne ke liye
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;