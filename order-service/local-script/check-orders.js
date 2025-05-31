require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('../models/Orders');

const connectToDatabase = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        tls: true,
        tlsCAFile: '../global-bundle.pem',
    });
    console.log('✅ Connected to DocumentDB');
};

const checkOrders = async () => {
    await connectToDatabase();

    const orders = await Order.find().sort({ createdAt: -1 });

    if (orders.length === 0) {
        console.log('📭 No orders found.');
    } else {
        console.log(`📦 Total Orders: ${orders.length}`);
        for (const order of orders) {
            console.log(`- OrderID: ${order.orderId}, Customer: ${order.customerId}, Status: ${order.status}, Total: ${order.totalAmount}`);
        }
    }

    mongoose.disconnect();
};
