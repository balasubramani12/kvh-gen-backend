import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Create a new product (Admin only)
router.post('/create', async (req, res) => {
    try {
        const { name, brand, category, qty, price, desc, img } = req.body;

        // Create a new product
        const newProduct = new Product({ name, brand, category, qty, price, desc, img });
        await newProduct.save();

        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Fetch all products
router.get('/all', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Fetch a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Update a product (Admin only)
router.put('/:id', async (req, res) => {
    try {
        const { name, brand, category, qty, price, desc, img } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, brand, category, qty, price, desc, img },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Delete a product (Admin only)
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;