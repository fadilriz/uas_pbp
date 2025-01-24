const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createRestaurant = async (req, res) => {
  const { name, address, phone_number } = req.body;
  try {
    const newRestaurant = await prisma.restaurant.create({
      data: {
        name,
        address,
        phone_number,
      },
    });
    res.status(201).json({ message: 'Restaurant created successfully', newRestaurant });
  } catch (error) {
    res.status(500).json({ error: 'Error creating restaurant', details: error.message });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching restaurants', details: error.message });
  }
};

const getRestaurantById = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: parseInt(id) },
    });
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching restaurant', details: error.message });
  }
};

const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, address, phone_number } = req.body;
  try {
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: parseInt(id) },
      data: {
        name,
        address,
        phone_number,
      },
    });
    res.status(200).json({ message: 'Restaurant updated successfully', updatedRestaurant });
  } catch (error) {
    res.status(500).json({ error: 'Error updating restaurant', details: error.message });
  }
};

const deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.restaurant.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting restaurant', details: error.message });
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};
