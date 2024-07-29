const { Schema, model } = require('mongoose');

const categoriesSchema = Schema({
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
        //Indica que el tipo va a ser otro objeto en mongo
        type: Schema.Types.ObjectId,
        //Hace referencia al otro objeto, especificado en el model ej: "module.exports = model('Category', categorySchema)", en este caso seria "Category"
        ref: 'User',
        required: true
    }
});

categoriesSchema.methods.toJSON = function() {
    const { __v, state, _id, ...category } = this.toObject();
    category.uid = _id;
    return category;
};


module.exports = model('Category', categoriesSchema);