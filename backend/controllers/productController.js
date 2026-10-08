const {
    readData,
    writeData
} = require('../utils/fileStorage');

// GET /api/products
const getProducts = async (req, res) => {
    try {
        const products = await readData();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Không thể đọc dữ liệu sản phẩm'
        });
    }
};

// POST /api/products
const createProduct = async (req, res) => {
    try {
        const { name, price } = req.body;

        if (
            typeof name !== 'string' ||
            !name.trim() ||
            !Number.isFinite(Number(price)) ||
            Number(price) <= 0
        ) {
            return res.status(400).json({
                error: 'Tên hoặc giá sản phẩm không hợp lệ'
            });
        }

        const products = await readData();

        const newProduct = {
            id: Date.now(),
            name: name.trim(),
            price: Number(price)
        };

        products.push(newProduct);

        await writeData(products);

        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Không thể thêm sản phẩm'
        });
    }
};

// PUT /api/products/:id
const updateProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const products = await readData();

        const index = products.findIndex(p => p.id === id);

        if (index === -1) {
            return res.status(404).json({
                error: 'Không tìm thấy sản phẩm'
            });
        }

        const { name, price } = req.body;

        if (
            typeof name !== 'string' ||
            !name.trim() ||
            !Number.isFinite(Number(price)) ||
            Number(price) <= 0
        ) {
            return res.status(400).json({
                error: 'Tên hoặc giá sản phẩm không hợp lệ'
            });
        }

        products[index] = {
            ...products[index],
            name: name.trim(),
            price: Number(price)
        };

        await writeData(products);

        res.json(products[index]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Không thể cập nhật sản phẩm'
        });
    }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const products = await readData();

        const index = products.findIndex(p => p.id === id);

        if (index === -1) {
            return res.status(404).json({
                error: 'Không tìm thấy sản phẩm'
            });
        }

        products.splice(index, 1);

        await writeData(products);

        res.json({
            message: 'Đã xoá thành công'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Không thể xoá sản phẩm'
        });
    }
};

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
};