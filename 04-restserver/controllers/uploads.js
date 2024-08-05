const { response } = require("express");
const { validUploadFile } = require("../helpers/uploadFile");
const path = require('path');
const fs = require('fs');

const User = require('../models/usuario');
const Product = require('../models/product');


const uploadFile = async(req, res = response) => {
    try {
      // const completedPath = await validUploadFile(req.files, ['txt', 'md'], 'textos');
      const completedPath = await validUploadFile(req.files, undefined, 'textos');
      res.status(200).json({completedPath});
    } catch(err) {
      res.status(400).json({
        err
      });
    }
};

const updateImage = async(req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch( collection ) {
      case 'user':
        model = await User.findById(id);
        if(!model) {
          return res.status(400).json({ msg: 'No existe un usuario con este id' });
        };
      break;

      case 'product':
        model = await Product.findById(id);
        if(!model) {
          return res.status(400).json({ msg: 'No existe un producto con este id' });
        };
    break;

    default:
      res.status(500).json({
        msg: 'Error en la base de datos'
      });
  };


  try {
    //Limpiar imagenes previas
    if( model.img ) {
      const imgPath = path.join( __dirname, '../uploads', collection, model.img );

      //Pregunta si existe el archivo, caso contrario lo crea
      if( fs.existsSync(imgPath) ) {
        fs.unlinkSync(imgPath);
      };
    };

    const completedPath = await validUploadFile(req.files, undefined, collection);
    model.img = completedPath;

    await model.save();
    res.status(200).json(model);
  } catch(err) {
    res.status(400).json({
      err
    });
  }
};

const showImage = async(req, res = response) => {
    const { id, collection } = req.params;

    let model;

    switch( collection ) {
        case 'user':
          model = await User.findById(id);
          if(!model) {
            return res.status(400).json({ msg: 'No existe un usuario con este id' });
          };
        break;

        case 'product':
          model = await Product.findById(id);
          if(!model) {
            return res.status(400).json({ msg: 'No existe un producto con este id' });
          };
      break;

      default:
        res.status(500).json({
          msg: 'Error en la base de datos'
        });
    };


    try {
      if( model.img ) {
        const imgPath = path.join( __dirname, '../uploads', collection, model.img );

        if( fs.existsSync(imgPath) ) {
          return res.sendFile(imgPath);
        };
      };

      const noImage = path.join(__dirname, '../assets/no-image.jpg');

      res.status(400).sendFile(noImage);
    } catch(err) {
      res.status(400).json({
        err
      });
    }
};


module.exports = {
    uploadFile,
    updateImage,
    showImage
};