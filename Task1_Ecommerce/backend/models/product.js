import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // Image URL ya path
    category: { type: String, required: true }, // Jaise 'Electronics' ya 'Groceries'
    countInStock: { type: Number, required: true, default: 10 }
}, {
    timestamps: true // Yeh auto-created at aur updated at dates daal dega
});

const Product = mongoose.model('Product', productSchema);
export default Product;