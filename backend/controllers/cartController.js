const {
    readData,
    readCart,
    writeCart
} = require('../utils/fileStorage');

// GET /api/cart
const getCart = async (req, res) => {
    try {
        const cart = await readCart();

        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Không thể lấy giỏ hàng'
        });
    }
};

// POST /api/cart
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const id = Number(productId);
        const qty = Number(quantity);

        // Kiểm tra dữ liệu đầu vào
        if (
            !Number.isInteger(id) ||
            !Number.isInteger(qty) ||
            qty < 1
        ) {
            return res.status(400).json({
                error: 'Dữ liệu giỏ hàng không hợp lệ'
            });
        }

        // Kiểm tra sản phẩm có tồn tại không
        const products = await readData();

        const product = products.find(p => p.id === id);

        if (!product) {
            return res.status(404).json({
                error: 'Không tìm thấy sản phẩm'
            });
        }

        // Đọc giỏ hàng hiện tại
        const cart = await readCart();

        const existingItem = cart.find(
            item => item.productId === id
        );

        if (existingItem) {
            // Nếu đã có sản phẩm, tăng số lượng
            existingItem.quantity += qty;
        } else {
            // Nếu chưa có, thêm sản phẩm mới
            cart.push({
                productId: id,
                quantity: qty
            });
        }

        await writeCart(cart);

        res.status(201).json({
            message: 'Đã thêm vào giỏ hàng',
            cart
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Không thể thêm vào giỏ hàng'
        });
    }
};

// DELETE /api/cart/:productId
const removeFromCart = async (req, res) => {
    try {
        const productId = Number(req.params.productId);

        const cart = await readCart();

        const index = cart.findIndex(
            item => item.productId === productId
        );

        if (index === -1) {
            return res.status(404).json({
                error: 'Không tìm thấy sản phẩm trong giỏ'
            });
        }

        cart.splice(index, 1);

        await writeCart(cart);

        res.json({
            message: 'Đã xoá khỏi giỏ hàng',
            cart
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Không thể xoá khỏi giỏ hàng'
        });
    }
};

// Xuất các controller
module.exports = {
    getCart,
    addToCart,
    removeFromCart
};