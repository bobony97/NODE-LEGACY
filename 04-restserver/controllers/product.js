const { response } = require('express');
const Product = require('../models/product');

const createProduct = async(req, res = response) => {
    const { state, user, ...body } = req.body;
    const name = req.body.name.toUpperCase();

    const dbProduct = await Product.findOne({ name });

    if(dbProduct) {
        return res.status(400).json({
            msg: `El producto: ${dbProduct.name}, ya existe`
        });
    };

    //Generar la data a guardar
    const data = {
        ...body,
        name: req.body.name.toUpperCase(),
        user: req.user._id
    };

    const newProduct = new Product( data );

    await newProduct.save();

    res.status(201).json(newProduct);
};

const getAllProducts = async(req, res = response) => {
    const { limit } = req.params;
    const [total, products] = await Promise.all([
        Product.countDocuments({ state: true }),
        Product.find({ state: true })
                .populate('user', 'name')
                .populate('category', 'name')
                .limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        products
    });
};

const getProductById = async(req, res = response) => {
    const { id } = req.params;

    const product = await Product.findById({_id: id, state: true})
                                .populate('user', 'name')
                                .populate('category', 'name')
                            

    if(!product) {
        return res.status(400).json({
            msg: `El producto ${product.name}, no se encuentra`
        });
    };

    if(!product.state) {
        return res.status(400).json({
            msg: `El producto ${product.name}, se ha eliminado`
        });
    };

    res.status(200).json({
        product
    });
};

const editProductById = async (req, res = response) => {
    const { id } = req.params;
    const { state, user, category, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    // Obtener el producto actual de la base de datos
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
        return res.status(404).json({
            msg: 'Producto no encontrado'
        });
    }

    // Si se proporciona una categoría en la solicitud
    if (category) {
        // Verificar si la categoría proporcionada es diferente de la actual
        if (String(category) !== String(existingProduct.category)) {
            // Verificar si la categoría proporcionada existe y está activa
            const productWithCategory = await Product.findOne({ category, state: true });
            if (!productWithCategory) {
                return res.status(400).json({
                    msg: 'La categoría proporcionada no es válida o no existe'
                });
            }
        }
        data.category = category;
    }

    // Actualizar el producto
    const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
        product: updatedProduct
    });
};


const deleteProduct = async(req, res = response) => {
    const { id } = req.params;

    const deleteProduct = await Product.findByIdAndUpdate(id, { state: false, new: true });

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