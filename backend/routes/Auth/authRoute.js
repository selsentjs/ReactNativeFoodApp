const express = require('express');
const router = express.Router();
const {
  register,
  checkEmail,
  login,
  logout,
} = require('../../controllers/authController');

router.post('/register', register);
router.post('/check-email', checkEmail);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
