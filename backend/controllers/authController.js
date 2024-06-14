const User = require('../models/Auth/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// =============================================================
// register
const register = async (req, res) => {
  const {name, email, mobile, password, role} = req.body;
  try {
    const emailAlreadyExists = await User.findOne({email});

    if (emailAlreadyExists) {
      return res.send('Email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      role,
    });

    // create token
    const tokenUser = {name: user.name, userId: user._id};
    const token = jwt.sign(tokenUser, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    // Set token as cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // expires in 1 day
      secure: true,
      sameSite: 'none', // cross-site cookies
    });

    res.status(201).json({user, token});
  } catch (err) {
    res.status(500).json(err);
  }
};

//=============================================================
// Route to check if email exists
const checkEmail = async (req, res) => {
  const {email} = req.body;
  try {
    const user = await User.findOne({email});

    if (user) {
      return res.json({msg: 'email already exists'});
    } else {
      return res.json({msg: 'email is not exists'});
    }
  } catch (err) {
    console.error('Error checking email:', error);
    res.status(500).json({error: 'Server Error'});
  }
};

//==================================================================

const login = async (req, res) => {
  const {email, password, terms_Conditions} = req.body;
  try {
    if (!email || !password || terms_Conditions === undefined) {
      return res.status(400).json({
        msg: 'Please provide email, password, and accept terms and conditions',
      });
    }
    // Check if terms_Conditions is true
    if (!terms_Conditions) {
      return res.status(400).json({
        msg: 'You must accept the terms and conditions to log in',
      });
    }
    const user = await User.findOne({email});

    if (!user) {
      return res.status(401).json({error: 'Invalid credentials'});
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({error: 'Invalid credentials'});
    }

    // if everything is correct
    const tokenUser = {name: user.name, userId: user._id};
    const token = jwt.sign(tokenUser, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 3600000, // Max age is in milliseconds (1 hour)
      secure: true, // Set to true if your app is served over HTTPS
      sameSite: 'strict', // Set to 'strict' to block cookies from being sent in cross-site requests
    });
    res.status(200).json({user, token});
  } catch (err) {
    res.status(500).json(err);
  }
};

//==================================================================

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({msg: 'user logout successfully'});
};

//====================================================================


module.exports = {
  register,
  checkEmail,
  login,
  logout,
  
};
