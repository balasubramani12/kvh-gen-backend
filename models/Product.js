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
            'pooja&religious',
            'essentials',
            'spices&masala',
            'personal&beautycare',
            'kids&babycare',
            'home&kitchenessentials',
            'snacks',
            'miscellaneous',
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