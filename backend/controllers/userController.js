const User = require('../models/Auth/User');

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
  const {name, email, mobile, password, role} = req.body;
  try {
    let user = await User.findOne({_id: userId});

    if (!user) {
      return res.status(404).json({msg: 'User not found'});
    }

    if (!email || !name || !mobile || !password || !role) {
      return res.send('please provide credentials');
    }

    // Update user properties
    user.name = name;
    user.email = email;
    user.mobile = mobile;
    user.password = password;
    user.role = role;

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

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
