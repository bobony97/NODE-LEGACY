const { response } = require("express");
const { validUploadFile } = require("../helpers/uploadFile");


const uploadFile = async(req, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archive) {
      return res.status(400).json({msg: 'No hay archivos que subir'});
    };

    try {
      const completedPath = await validUploadFile(req.files);
      res.status(200).json({completedPath});
    } catch(err) {
      res.status(400).json({
        err
      });
    }

};


module.exports = {
    uploadFile
};