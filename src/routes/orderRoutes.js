const express = require('express');
const { createOrder, getAllOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrderStatus);

module.exports = router;
