const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrderDetail = async (req, res) => {
  const { order_id, menu_id, quantity, price } = req.body;
  try {
    const newOrderDetail = await prisma.order_detail.create({
      data: {
        order_id,
        menu_id,
        quantity,
        price,
      },
    });
    res.status(201).json({ message: 'Order detail created successfully', newOrderDetail });
  } catch (error) {
    res.status(500).json({ error: 'Error creating order detail', details: error.message });
  }
};

const getAllOrderDetails = async (req, res) => {
  try {
    const orderDetails = await prisma.order_detail.findMany({
      include: {
        order: true, 
        menu: true, 
      },
    });
    res.status(200).json(orderDetails);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order details', details: error.message });
  }
};

const getOrderDetailById = async (req, res) => {
  const { id } = req.params;
  try {
    const orderDetail = await prisma.order_detail.findUnique({
      where: { id: parseInt(id) },
      include: {
        order: true,
        menu: true,
      },
    });
    if (!orderDetail) return res.status(404).json({ error: 'Order detail not found' });
    res.status(200).json(orderDetail);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order detail', details: error.message });
  }
};

const deleteOrderDetail = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.order_detail.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Order detail deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting order detail', details: error.message });
  }
};

module.exports = {
  createOrderDetail,
  getAllOrderDetails,
  getOrderDetailById,
  deleteOrderDetail,
};
