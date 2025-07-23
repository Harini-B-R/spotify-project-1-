const express = require('express');
const {
  registerUser,
  loginUser,
  getUserLibrary
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// ✅ NEW ROUTE for Library Page
router.get('/:userId/library', getUserLibrary);

module.exports = router;
