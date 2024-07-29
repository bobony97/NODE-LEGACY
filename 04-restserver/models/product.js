const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    }
});

ProductSchema.methods.toJSON = function() {
    const { __v, state, _id, available, ...product } = this.toObject();
    product.uid = _id;
    return product;
};


module.exports = mongoose.model('Product', ProductSchema);