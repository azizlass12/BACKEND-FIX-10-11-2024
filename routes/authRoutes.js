const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Optional: For JWT token generation
const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create and save user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user: { name: user.name, email: user.email },  // Send basic user info, not the password
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Optional: Generate a JWT token and send it in response
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,  // Send the token to the client
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Get all users (only for admins or authorized users)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);  // Return the list of users
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// Delete a user by ID (only for admins or authorized users)
router.delete('/user/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

module.exports = router;
