const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,  
  updateUser,
  deleteUser,
  uploadProfileImage,
} = require('../../controllers/userController');

router.get('/', getAllUsers);
router.get('/:id', getSingleUser);
router.post('/image/upload', uploadProfileImage);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


module.exports = router;
