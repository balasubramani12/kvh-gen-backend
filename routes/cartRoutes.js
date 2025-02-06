import express from 'express';
import {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    clearCartByID,getUserCart // Import the new clearCart function
} from '../controllers/cartController.js';

const router = express.Router();

// Add a product to the cart
router.post('/add', addToCart);

// Fetch the cart for a user
router.get('/:userId', getCart);

// Update the quantity of a product in the cart
router.put('/update/:userId/:productId', updateCartItem);

// Remove a product from the cart
router.delete('/remove/:userId/:productId', removeFromCart);

// Route to clear a user's cart by userId
router.delete('/clear/:userId', clearCartByID);



// Clear all items from the cart
router.delete('/clear', clearCart); // New route

export default router;