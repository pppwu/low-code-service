require('dotenv').config();
const mongoose = require('mongoose');

// 1. 連線
const connectToDatabase = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        tls: true,
        tlsCAFile: '../global-bundle.pem',
    });
    console.log('✅ Connected to DocumentDB');
};

// 2. Product schema
const productSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    name: String,
    price: Number,
    stock: Number,
    version: { type: Number, default: 1 }
});
const Product = mongoose.model('Product', productSchema);

// 3. Seed 資料
const seedProducts = [
    {
        productId: 'P001',
        name: 'Laptop',
        price: 30000,
        stock: 10,
        version: 1
    },
    {
        productId: 'P002',
        name: 'Monitor',
        price: 10000,
        stock: 5,
        version: 1
    }
];

// 4. 主流程
const main = async () => {
    await connectToDatabase();

    console.log('🧹 Cleaning existing products...');
    await Product.deleteMany({}); // 清除全部 Product

    console.log('📦 Seeding products...');
    await Product.insertMany(seedProducts);

    console.log('✅ Done! Seeded clean product list.');
    mongoose.disconnect();
};

main();