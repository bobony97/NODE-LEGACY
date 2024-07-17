const { Schema, model } = require('mongoose'); 

const userSchema = Schema({
    name: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es obligatoria' ],
    },
    image: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROL', 'USER_ROL', 'SALES_ROL']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//Reesbribir metodos: Con este metodo se va a retirar propiedades de la respuesta enviada al cliente
userSchema.methods.toJSON = function() {
    const { __v, password, ... user } = this.toObject();
    return user;
};

module.exports = model( 'User', userSchema );