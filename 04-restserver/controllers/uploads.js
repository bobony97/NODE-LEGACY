const { response } = require("express");
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = async(req, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).json({msg: 'No hay archivos que subir'});
      return;
    }

    //"archivo" se va a llamar la informacion que enviemos
    if (!req.files.archive) {
      res.status(400).json({msg: 'No hay archivos que subir'});
      return;
    }
  
    const { archive } = req.files;

    //Esto va a cortar el nombre del archivo para obtener la extension del mismo
    const shortName = archive.name.split('.');

    //Esto va a extraer la extension del archivo, de "shortName"
    const extension = shortName[shortName.length - 1 ];

    //Validar extension
    const validExtension = ['png', 'jpg', 'jpeg', 'gif'];

    if(!validExtension.includes(extension)) {
        return res.status(400).json({
            msg: `La extension ${ extension }, no es valida`
        });
    };

    const temporalName = uuidv4() + '.' + extension;
    const uploadPath = path.join( __dirname, '../uploads/', temporalName.name);
    
    //mv es el método que mueve el archivo al uploadPath, que es la ruta de destino en tu sistema de archivos.
    archive.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).json({
            err
        });
      }
  
      res.json({ msg: 'File uploaded to ' + uploadPath});
    });
};


module.exports = {
    uploadFile
};