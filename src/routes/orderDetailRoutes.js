const express = require('express');
const {
  createOrderDetail,
  getAllOrderDetails,
  getOrderDetailById,
  deleteOrderDetail,
} = require('../controllers/orderDetailController');
const router = express.Router();

router.post('/', createOrderDetail);
router.get('/', getAllOrderDetails);
router.get('/:id', getOrderDetailById);
router.delete('/:id', deleteOrderDetail);

module.exports = router;
