const { response } = require('express');
const Product = require('../models/product');

const createProduct = async(req, res = response) => {
    const { name, price, category, description } = req.body;
    name.toUpperCase();

    const dbProduct = await Category.findOne({ name });

    if(dbProduct) {
        return res.status(400).json({
            msg: `La categoria: ${dbProduct}, ya existe`
        });
    };

    //Generar la data a guardar
    const data = {
        name,
        price,
        description,
        category: req.Category._id,
        user: req.user._id
    };

    const newProduct = new Product( data );

    await newProduct.save();

    res.status(201).json({
        newProduct
    });
};

const getAllProducts = async(req, res = response) => {
    const { limit } = req.params;
    const [total, products] = await Promise.all([
        Product.countDocuments({ state: true }),
        Product.find({ state: true })
                .limit(Number(limit))
                .populate('user', 'name')
                .populate('category', 'name')
    ]);

    res.status(200).json({
        total,
        products
    });
};

const getProductById = async(req, res = response) => {
    const { id } = req.params;

    const product = Product.findById({_id: id, state: true})
                            .populate('category', 'name');

    if(!product.state) {
        return res.status(400).json({
            msg: `El producto ${product.name}, ha sido eliminado`
        });
    };

    res.status(200).json({
        product
    });
};

const editProductById = async(req, res = response) => {
    const { id } = req.params;
    const { state, user, category, ...newData } = req.body;

    newData.name = newData.name.toUpperCase();
    newData.user = req.user._id;

    const findAndEditCategory = await Product.findByIdAndUpdate(id, newData, {new: true});

    res.status(201).json({
        findAndEditCategory
    });
};

const deleteProduct = async(req, res = response) => {
    const { id } = req.params;

    const deleteProduct = await Product.findByIdAndUpdate(id);

    res.status(200).json({
        deleteProduct
    });
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    editProductById,
    deleteProduct,
}