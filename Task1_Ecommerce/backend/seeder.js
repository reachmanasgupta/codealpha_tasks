import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { techProducts, groceryProducts } from './data/product.js'; // dhyan dein aapki file ka naam product.js hai screen par
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        // Purana data saaf karne ke liye
        await Product.deleteMany();

        // Agar database ka naam URI mein 'tech_store_db' hai toh tech products dalenge, nahi toh grocery
        if (process.env.MONGO_URI.includes('tech_store_db')) {
            await Product.insertMany(techProducts);
            console.log('Tech Products Imported Successfully!');
        } else {
            await Product.insertMany(groceryProducts);
            console.log('Grocery Products Imported Successfully!');
        }

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importData();