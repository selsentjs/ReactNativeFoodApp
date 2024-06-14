const User = require('../models/Auth/User');
const path = require('path');
const {v4: uuidv4} = require('uuid');

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json({user});
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleUser = async (req, res) => {
  const {id: userId} = req.params;
  try {
    let user = await User.findOne({_id: userId});

    if (!user) {
      return res.status(404).json({msg: 'User not found'});
    }

    res.status(200).json({user});
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  const {id: userId} = req.params;
  const {name, email, mobile} = req.body;
  try {
    let user = await User.findOne({_id: userId});

    if (!user) {
      return res.status(404).json({msg: 'User not found'});
    }

    if (!email || !name || !mobile) {
      return res.send('please provide credentials');
    }

    // Update user properties
    user.name = name;
    user.email = email;
    user.mobile = mobile;
   

    // Save the updated user
    await user.save();
    res.status(200).json({msg: 'user updated successfully', user});
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteUser = async (req, res) => {
  const {id: userId} = req.params;
  try {
    const user = await User.findOneAndDelete({_id: userId});
    res.status(200).json({msg: 'user deleted', user});
  } catch (err) {
    res.status(500).json(err);
  }
};
const uploadProfileImage = async (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).send('No File Uploaded');
  }
  const productImage = req.files.image;

  if (!productImage.mimetype || !productImage.mimetype.startsWith('image')) {
    return res.status(400).send('Please Upload Image');
  }
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    return res.send('Please upload image smaller 1MB');
  }
  const imageName = `${uuidv4()}-${productImage.name}`;
  const imagePath = path.join(__dirname, '../public/uploads/', imageName);

  await productImage.mv(imagePath);

  return res.status(200).json({image: {src: `/uploads/${imageName}`}});
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  uploadProfileImage,
};
