const express = require('express');
const {
    register,
    login,
    getAllUsers,
    updateUser,
    deleteUser,
} = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', authenticateToken, getAllUsers);
router.put('/:id', authenticateToken,updateUser);
router.delete('/:id', authenticateToken, deleteUser);

module.exports = router;