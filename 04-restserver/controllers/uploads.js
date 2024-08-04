const { response } = require("express");
const { validUploadFile } = require("../helpers/uploadFile");


const uploadFile = async(req, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archive) {
      return res.status(400).json({msg: 'No hay archivos que subir'});
    };

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

  res.status(200).json({
    id, 
    collection
  });
};


module.exports = {
    uploadFile,
    updateImage
};