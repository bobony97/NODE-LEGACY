const { response } = require("express");
const { validUploadFile } = require("../helpers/uploadFile");


const uploadFile = async(req, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archive) {
      return res.status(400).json({msg: 'No hay archivos que subir'});
    };

    const completedPath = await validUploadFile(req.files);

    res.status(200).json({
      completedPath
    });
};


module.exports = {
    uploadFile
};