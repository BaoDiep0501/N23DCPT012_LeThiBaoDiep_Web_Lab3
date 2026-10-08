const fs = require('fs').promises;
const path = require('path');

// Đường dẫn đến các file lưu dữ liệu
const DATA_PATH = path.join(__dirname, '../data.json');
const CART_PATH = path.join(__dirname, '../cart.json');

// Đọc danh sách sản phẩm
async function readData() {
    const raw = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(raw);
}

// Ghi danh sách sản phẩm
async function writeData(data) {
    await fs.writeFile(
        DATA_PATH,
        JSON.stringify(data, null, 2),
        'utf-8'
    );
}

// Đọc giỏ hàng
async function readCart() {
    const raw = await fs.readFile(CART_PATH, 'utf-8');
    return JSON.parse(raw);
}

// Ghi giỏ hàng
async function writeCart(cart) {
    await fs.writeFile(
        CART_PATH,
        JSON.stringify(cart, null, 2),
        'utf-8'
    );
}

module.exports = {
    readData,
    writeData,
    readCart,
    writeCart
};