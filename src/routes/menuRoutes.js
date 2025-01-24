const express = require('express');
const {
  createMenu,
  getAllMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
} = require('../controllers/menuController');

const router = express.Router();

router.post('/', createMenu);
router.get('/', getAllMenus);
router.get('/:id', getMenuById);
router.put('/:id', updateMenu);
router.delete('/:id', deleteMenu);

module.exports = router;
