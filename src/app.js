const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes')
const menuRoutes = require('./routes/menuRoutes')
const orderRoutes = require('./routes/orderRoutes')
const orderDetail = require('./routes/orderDetailRoutes')

const app = express();
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/restaurant', restaurantRoutes);
app.use('/menu', menuRoutes)
app.use('/order', orderRoutes)
app.use('/orderDetail', orderDetail)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
