const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
  const { user_id, total_price, status } = req.body;
  try {
    const newOrder = await prisma.order.create({
      data: {
        user_id,
        total_price,
        status,
      },
    });
    res.status(201).json({ message: 'Order created successfully', newOrder });
  } catch (error) {
    res.status(500).json({ error: 'Error creating order', details: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true, 
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders', details: error.message });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: true,
      },
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order', details: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    res.status(200).json({ message: 'Order status updated successfully', updatedOrder });
  } catch (error) {
    res.status(500).json({ error: 'Error updating order', details: error.message });
  }
};

module.exports = { createOrder, getAllOrders, getOrderById, updateOrderStatus };
