const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/usuario');
const { generateJWT } = require('../helpers/generateJWT');

const login = async(req, res = response) => {

    try {
        const { email, password } = req.body;
        
        //Verifica si el usuario existe
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }
        
        //Verifica si el usuario esta activo
        if(!user.state) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        //Verifica la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Algo salio mal, contacte con el administrador'
        });
    }
};



module.exports = {
    login
};
