const mongoose = require('mongoose');
const { Schema, model } = mongoose;
// const { Schema, model } = require('mongoose');

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


module.exports = model('Category', categoriesSchema);