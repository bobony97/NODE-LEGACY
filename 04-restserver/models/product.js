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
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
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

ProductSchema.methods.toJson = function() {
    const { __v, state, ...product } = this.toObject();
    return product;
};


module.exports = mongoose.model('Product', ProductSchema);