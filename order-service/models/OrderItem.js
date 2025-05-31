const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    orderId: String,
    productId: String,
    quantity: Number,
    price: Number,
    subtotal: Number
});

module.exports = mongoose.model('OrderItem', orderItemSchema);