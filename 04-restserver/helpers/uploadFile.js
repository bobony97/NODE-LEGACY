const path = require('path');
const { v4: uuidv4 } = require('uuid');

const validUploadFile = ( files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {
    return new Promise((resolve, reject) => {
        console.log(files)
        const { archive } = files;

        //Esto va a cortar el nombre del archivo para obtener la extension del mismo
        const shortName = archive.name.split('.');

        //Esto va a extraer la extension del archivo, de "shortName"
        const extension = shortName[shortName.length - 1];

        if (!validExtensions.includes(extension)) {
            return reject(`La extension ${extension}, no es valida`);
        };

        const temporalName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, temporalName);

        //mv es el método que mueve el archivo al uploadPath, que es la ruta de destino en tu sistema de archivos.
        archive.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            };

            resolve(temporalName);
        });
    });
};


module.exports = {
    validUploadFile
};