
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

/**
 * Guarda una imagen en la ruta especificada y devuelve el buffer de la imagen
 * @param {Object} imagen - Objeto con la imagen a guardar
 * @param {string} codigoUser - Código o nombre para el archivo
 * @param {string} extension - Extensión deseada para el archivo (por ejemplo: 'png', 'jpg', 'jpeg')
 * @returns {Promise<Buffer|boolean>} - Retorna un buffer con la imagen si todo sale bien, o false si hay errores
 */
const cargaDeImagenes = async (imagen='', codigoUser='0', extension='') => {
    
  try {
    // Verificamos si se envió algún archivo o específicamente una foto
    if (!imagen || Object.keys(imagen).length === 0 || !imagen.photo) {
      return false;
    }
    
    const { photo } = imagen;
    
    // Ruta donde se guardarán las imágenes (única ruta)
    const secondaryDir = 'C:\\AttendanceSqlFFS\\image';
    
    // Verificar/crear el directorio si no existe
    if (!fs.existsSync(secondaryDir)) {
      fs.mkdirSync(secondaryDir, { recursive: true });
    }
    
    // Configurar el nombre del archivo y su extensión
    let fileName = '';
    if (codigoUser) {
      if (extension) {
        // Si se proporciona una extensión específica, usarla
        const cleanExtension = extension.startsWith('.') ? extension : `.${extension}`;
        // Eliminar cualquier extensión existente en el codigoUser
        const baseNameWithoutExt = codigoUser.includes('.') ? 
          codigoUser.substring(0, codigoUser.lastIndexOf('.')) : codigoUser;
        fileName = `${baseNameWithoutExt}${cleanExtension}`;
      } else {
        // Si no se proporciona extensión, usar la original o mantener la existente
        const originalExt = path.extname(photo.name) || '.jpg'; // Por defecto .jpg si no hay extensión
        fileName = codigoUser.includes('.') ? codigoUser : `${codigoUser}${originalExt}`;
      }
    } else {
      // Sanitizar el nombre del archivo original
      const baseFileName = path.basename(photo.name, path.extname(photo.name)).replace(/\s+/g, '_');
      // Usar la extensión proporcionada o la original
      const fileExtension = extension ? 
        (extension.startsWith('.') ? extension : `.${extension}`) : 
        path.extname(photo.name) || '.jpg';
      fileName = `${baseFileName}${fileExtension}`;
    }

    // Ruta completa donde se guardará el archivo
    const filePath = path.join(secondaryDir, fileName);

    // Convertir photo.mv a una promesa para manejarla con async/await
    const moveFile = promisify(photo.mv);
    
    try {
      // Guardar el archivo directamente en la ruta secundaria
      await moveFile(filePath);
      
      console.log(`Imagen guardada exitosamente como: ${fileName}`);
      console.log(`Ruta completa: ${filePath}`);
      
      // Leer el archivo guardado como buffer y devolverlo
      const imageBuffer = fs.readFileSync(filePath);
      return imageBuffer;
    } catch (err) {
      console.log('Error al guardar el archivo:', err);
      return false;
    }
  } catch (error) {
    console.error('Error general:', error);
    return false;
  }
}

module.exports = {
  cargaDeImagenes
}



/* mejorada imagen guardando en una sola ruta
const path = require('path');
const fs = require('fs');

const cargaDeImagenes = (imagen='', codigoUser='0') => {
  try {
    // Verificamos si se envió algún archivo o específicamente una foto
    if (!imagen || Object.keys(imagen).length === 0 || !imagen.photo) {
      return false;
    }
    
    const { photo } = imagen;
    
    // Ruta donde se guardarán las imágenes (única ruta)
    const rutaDeImagen = 'C:\\AttendanceSqlFFS\\image';
    
    // Verificar/crear el directorio si no existe
    if (!fs.existsSync(rutaDeImagen)) {
      fs.mkdirSync(rutaDeImagen, { recursive: true });
    }
    
    // Configurar el nombre del archivo
    let fileName = '';
    if (codigoUser) {
      // Si se proporciona un nombre personalizado, usarlo
      // Asegurarse de que tenga la extensión correcta
      const originalExt = path.extname(photo.name);
      fileName = codigoUser.includes('.') ? codigoUser : `${codigoUser}${originalExt}`;
    } else {
      // Sanitizar el nombre del archivo original
      fileName = photo.name.replace(/\s+/g, '_');
    }

    // Ruta completa donde se guardará el archivo
    const filePath = path.join(rutaDeImagen, fileName);

    // Guardar el archivo directamente en la ruta secundaria
    photo.mv(filePath, (err) => {
      if (err) {
        console.log('Error al guardar el archivo:', err);
        return false;
      }
      
      console.log(`Imagen guardada exitosamente como: ${fileName}`);
      console.log(`Ruta completa: ${filePath}`);
    });
    
    return true;
  } catch (error) {
    console.error('Error general:', error);
    return false;
  }
}

module.exports = {
  cargaDeImagenes
}
*/

 /*guardando en dos rutas
 const employeePut = async (req= request, res= response) => {
    try {
        const { id } = req.params;
        const { body } = req;
        
        console.log(req.files);
        
        // Verificamos si se envió algún archivo o específicamente una foto
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.photo) {
            return res.status(400).json('No se ha enviado foto.');
        }
        
        const { photo } = req.files;
        
        // Verificar que estamos trabajando con rutas absolutas
        const rootDir = path.resolve(process.cwd());
        console.log(`Directorio raíz: ${rootDir}`);
        
        // Crear una ruta absoluta para el directorio de uploads
        const uploadsDir = path.join(rootDir, 'uploads');
        console.log(`Directorio de uploads: ${uploadsDir}`);
        
        // Verificar si existe algo en la ruta del directorio
        if (fs.existsSync(uploadsDir)) {
            const stats = fs.statSync(uploadsDir);
            // Si existe pero no es un directorio, eliminar el archivo
            if (!stats.isDirectory()) {
                fs.unlinkSync(uploadsDir);
                fs.mkdirSync(uploadsDir);
                console.log(`Se eliminó un archivo y se creó el directorio: ${uploadsDir}`);
            }
        } else {
            // Crear el directorio si no existe
            fs.mkdirSync(uploadsDir, { recursive: true });
            console.log(`Directorio creado: ${uploadsDir}`);
        }
        
        // Sanitizar el nombre del archivo
        const fileName = photo.name.replace(/\s+/g, '_');
        const uploadPath = path.join(uploadsDir, fileName);
        console.log(`Ruta de guardado: ${uploadPath}`);
        
        // SEGUNDA UBICACIÓN: CONFIGURACIÓN
        const secondaryDir = 'C:\\AttendanceSqlFFS\\image';
        
        // Verificar/crear el directorio secundario
        if (!fs.existsSync(secondaryDir)) {
            fs.mkdirSync(secondaryDir, { recursive: true });
            console.log(`Directorio secundario creado: ${secondaryDir}`);
        }
        
        const secondaryPath = path.join(secondaryDir, fileName);
        console.log(`Ruta secundaria de guardado: ${secondaryPath}`);
        
        // Guardar el archivo
        photo.mv(uploadPath, async (err) => {
            if (err) {
                console.log('Error al mover el archivo a la ruta principal:', err);
                return res.status(500).json({ msg: `Error al cargar la imagen en la ruta principal`, err });
            }
            
            try {
                // Leer el archivo que acabamos de guardar
                const fileContent = fs.readFileSync(uploadPath);
                
                // Guardar una copia en la segunda ubicación
                fs.writeFileSync(secondaryPath, fileContent);
                console.log(`Imagen duplicada en ruta secundaria: ${secondaryPath}`);
                
                res.json({
                    msg: 'Imagen subida con éxito a ambas ubicaciones',
                    primaryPath: uploadPath,
                    secondaryPath: secondaryPath,
                    fileName
                });
            } catch (copyError) {
                console.error('Error al duplicar la imagen:', copyError);
                
                // Si hay error al duplicar, al menos notificamos que se guardó en la ubicación principal
                res.json({
                    msg: 'Imagen guardada en ubicación principal, pero hubo un error al duplicarla',
                    primaryPath: uploadPath,
                    error: copyError.message,
                    fileName
                });
            }
        });
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ msg: 'Error en el servidor', error });
    }
        
}   
    
    */