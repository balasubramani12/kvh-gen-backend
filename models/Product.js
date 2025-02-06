import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: [
            'Pooja & Religious',
            'Essentials',
            'Spices & Masala',
            'Personal & Beauty Care',
            'Kids & Baby Care',
            'Household & Kitchen Essentials',
            'Snacks',
            'Miscellaneous',
        ],
        required: true,
    },
    qty: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Product', productSchema);