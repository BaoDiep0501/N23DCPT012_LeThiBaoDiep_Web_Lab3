const express = require('express');
const router = express.Router();

const {
    getCart,
    addToCart,
    removeFromCart
} = require('../controllers/cartController');

// Lấy giỏ hàng
router.get('/', getCart);

// Thêm sản phẩm vào giỏ
router.post('/', addToCart);

// Xoá sản phẩm khỏi giỏ
router.delete('/:productId', removeFromCart);

module.exports = router;