const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    customerId: String,
    totalAmount: Number,
    status: { type: String, enum: ['pending', 'submitted', 'approved', 'failed', 'cancelled'], default: 'pending' },
    needApproval: { type: Boolean, default: false },
    createdByRole: { type: String, enum: ['staff', 'manager', 'customer'] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
    version: { type: Number, default: 1 }
});

module.exports = mongoose.model('Order', orderSchema);