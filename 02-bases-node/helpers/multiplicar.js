const fs = require('fs'); //Se trae el sistema de archivos de windows

const crearArchivo = async( base = 5 ) => {
    try {
        console.log('=====================');
        console.log(`    Tabla del ${ base }`);
        console.log('=====================');
    
        let salida = '';
    
        for(let i = 1; i <= 10; i++) {
            salida += `${ base } x ${i} = ${ base * i }\n`;
        }
    
        console.log(salida)
    
        //Esto permite crear archivos, el primer argumento espera un path, si no lo tiene va a utilizar la carpeta raíz para crear el archivo, el segundo argumento 'tabla-5.txt' 
        //va a ser el nombre del archivo, el tercer argumento es la información a grabar y el cuarto el callback 
        // fs.writeFileSync( `tabla-${base}.txt`, salida, (err) => {
        //     if(err) throw err;
    
        //     console.log(`Archivo tabla-${base}.txt creado`)
        // })
    
        //El writeFileSync nos evita tener que usar el callback y si ocurre un error se atrapa mediante un try catch
        fs.writeFileSync( `tabla-${base}.txt`, salida);

        return `tabla-${base}.txt`;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    crearArchivo: crearArchivo
}