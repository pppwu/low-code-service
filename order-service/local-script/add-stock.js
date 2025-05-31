require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Products');

const connectToDatabase = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        tls: true,
        tlsCAFile: '../global-bundle.pem',
    });
    console.log('✅ Connected to DocumentDB');
};

const increaseStock = async () => {
    await connectToDatabase();

    const updates = [
        { productId: 'P001', add: 10 },
        { productId: 'P002', add: 15 },
    ];

    for (const update of updates) {
        const result = await Product.updateOne(
            { productId: update.productId },
            { $inc: { stock: update.add } },
            { upsert: false }
        );

        if (result.modifiedCount === 0) {
            console.log(`⚠️  Product ${update.productId} not found or update failed`);
        } else {
            console.log(`✅ Added ${update.add} units to ${update.productId}`);
        }
    }

    mongoose.disconnect();
};

increaseStock();