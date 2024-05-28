const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController');

router.get('/', getAllUsers);
router.get('/:id', getSingleUser);

router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
