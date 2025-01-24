const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createMenu = async (req, res) => {
  const { restaurant_id, name, price, description } = req.body;
  try {
    const newMenu = await prisma.menu.create({
      data: {
        restaurant_id,
        name,
        price,
        description,
      },
    });
    res.status(201).json({ message: 'Menu created successfully', newMenu });
  } catch (error) {
    res.status(500).json({ error: 'Error creating menu', details: error.message });
  }
};

const getAllMenus = async (req, res) => {
  try {
    const menus = await prisma.menu.findMany({
      include: {
        restaurant: true, 
      },
    });
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching menus', details: error.message });
  }
};

const getMenuById = async (req, res) => {
  const { id } = req.params;
  try {
    const menu = await prisma.menu.findUnique({
      where: { id: parseInt(id) },
      include: {
        restaurant: true, 
      },
    });
    if (!menu) return res.status(404).json({ error: 'Menu not found' });

    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching menu', details: error.message });
  }
};

const updateMenu = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedMenu = await prisma.menu.update({
      where: { id: parseInt(id) },
      data,
    });
    res.status(200).json({ message: 'Menu updated successfully', updatedMenu });
  } catch (error) {
    res.status(500).json({ error: 'Error updating menu', details: error.message });
  }
};

const deleteMenu = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.menu.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Menu deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting menu', details: error.message });
  }
};

module.exports = { createMenu, getAllMenus, getMenuById, updateMenu, deleteMenu };
