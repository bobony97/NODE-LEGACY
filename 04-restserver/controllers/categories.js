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

    const newCategory = new Category( data );

    //Guardar en la base de datos
    await newCategory.save();

    res.status(201).json({
        newCategory
    });
};


const getAllCategories = async(req, res = response) => {
    const { limit } = req.query;

    const [ total, categories ] = await Promise.all([
        Category.countDocuments({state: true}),
        Category.find( {state: true} )
                .limit(Number(limit))
                //En este caso con el populate indicamos que queremos traer solamente el nombre, en este caso del user
                .populate('user', 'name')
    ]);

    res.status(200).json({
        total,
        categories
    });
};

const getCategoryById = async(req, res = response) => {
    const { id } = req.params;

    const category = await Category.findById({_id: id, state: true} )
                                    .populate('user', 'name');

    if(category.state === false) {
        return res.status(400).json({
            msg: 'No se encuentra la categoria'
        });
    };

    res.status(200).json({
        category
    });
};

const editCategoryById = async(req, res = response) => {
    const { id } = req.params;
    const { state, user, ...newData } = req.body;

    newData.name = newData.name.toUpperCase();
    newData.user = req.user._id;

    const findAndEditCategory = await Category.findByIdAndUpdate(id, newData, {new: true});

    res.status(201).json({
        findAndEditCategory
    });
}

const deleteCategory = async(req, res = response) => {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, {state: false}, {new: true});

    res.status(200).json({
        category
    });
}



module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    editCategoryById,
    deleteCategory
}