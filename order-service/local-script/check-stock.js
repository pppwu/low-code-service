require('dotenv').config();
const mongoose = require('mongoose');

const connectToDatabase = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        tls: true,
        tlsCAFile: '../global-bundle.pem',
    });
};

const productSchema = new mongoose.Schema({
    productId: String,
    name: String,
    price: Number,
    stock: Number,
    version: Number
});

const Product = mongoose.model('Product', productSchema);

const main = async () => {
    try {
        await connectToDatabase();
        console.log('✅ Connected to DocumentDB');

        const products = await Product.find({});
        if (products.length === 0) {
            console.log('⚠️ No products found');
        } else {
            console.log('📦 Product Stocks:');
            products.forEach(p => {
                console.log(`- ${p.productId}: ${p.stock} units`);
            });
        }
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        mongoose.disconnect();
    }
};

main();
