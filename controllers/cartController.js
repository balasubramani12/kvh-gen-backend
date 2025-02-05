import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// Add a product to the cart
export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const existingItem = cart.items.find((item) => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity || 1;
        } else {
            cart.items.push({ product: productId, quantity: quantity || 1 });
        }

        await cart.save();

        res.status(200).json({ message: 'Product added to cart successfully', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
// Fetch the cart for a user
export const getCart = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Fetch cart and populate the 'product' field
        const cart = await Cart.findOne({ user: userId }).populate('items.product');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Ensure each item has a valid product object
        const populatedItems = cart.items.map(item => ({
            ...item.toObject(),
            product: item.product || { name: 'N/A', brand: 'N/A', img: '' }, // Fallback for missing products
        }));

        res.status(200).json({ items: populatedItems });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
// Update cart item quantity
export const updateCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const { quantity } = req.body;

        // Find the cart for the user
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the item in the cart
        const item = cart.items.find((item) => item.product.toString() === productId);
        if (!item) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Update the quantity
        item.quantity = quantity;

        // Save the updated cart
        await cart.save();
        res.status(200).json({ message: 'Cart updated successfully', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Remove a product from the cart
export const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter((item) => item.product.toString() !== productId);

        await cart.save();

        res.status(200).json({ message: 'Product removed from cart successfully', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Clear all items from the cart
export const clearCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Find the user's cart
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Clear all items in the cart
        cart.items = [];

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: 'Cart cleared successfully', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};