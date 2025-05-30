require('dotenv').config();
const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            tls: true,
            tlsCAFile: './rds-combined-ca-bundle.pem',
        });

        console.log('Connected to AWS DocumentDB');
    } catch (err) {
        console.error('Full connection error:', JSON.stringify(err, null, 2));
        throw new Error('Failed to connect to the database');
    }
};

module.exports = connectToDatabase;
