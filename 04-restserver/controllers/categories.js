const { response } = require("express");
const Category = require('../models/categories');

const createCategory = async(req, res = response) => {

    const name = req.body.name.toUpperCase();

    const dbCategory = await Category.findOne({ name });

    if(dbCategory) {
        return res.status(400).json({
            msg: `La categoria: ${dbCategory.name}, ya existe`
        });
    };

    //Generar la data a guardar
    const data = {
        name,
        user: req.user._id
    };

    const newCategory = await new Category( data );

    //Guardar en la base de datos
    await newCategory.save();

    res.status(201).json({
        newCategory
    });
};



module.exports = {
    createCategory
}