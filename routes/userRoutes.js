import express from 'express';
import {
    signup,
    login,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

// Signup Route
router.post('/signup', signup);

// Login Route
router.post('/login', login);

// Fetch All Users
router.get('/all', getAllUsers);

// Fetch a Specific User by ID
router.get('/:id', getUserById);

// Update a User
router.put('/:id', updateUser);

// Delete a User
router.delete('/:id', deleteUser);

export default router;