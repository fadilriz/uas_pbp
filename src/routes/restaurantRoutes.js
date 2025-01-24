const express = require('express');
const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} = require('../controllers/restaurantController');

const { authenticateToken } = require('../middlewares/authMiddleware'); 

const router = express.Router();

router.post('/', authenticateToken, createRestaurant);
router.get('/', authenticateToken, getAllRestaurants);
router.get('/:id', authenticateToken, getRestaurantById);
router.put('/:id', authenticateToken, updateRestaurant);
router.delete('/:id', authenticateToken, deleteRestaurant);

module.exports = router;
