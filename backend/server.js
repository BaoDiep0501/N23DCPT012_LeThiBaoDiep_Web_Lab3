const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

// Middleware CORS
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// Middleware đọc JSON
app.use(express.json());

// Middleware ghi log request
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Đăng ký Router
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Khởi chạy server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});