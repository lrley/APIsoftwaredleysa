const {response, request}= require('express');
const bcryptjs = require('bcryptjs')

const Usuario =  require('../../models/modelsMongoose/usuario')


const UsuariosMongooseGet = async(req= request, res= response) => {
     
   const {q,nombre='No name', apikey, page = 1, limit} = req.query;

    res.status(400).json({
         msg:`Todo ok con GETs varios Usuarios Mongoose`,
         q,
         nombre,
         apikey,
         page,
         limit

    })

    
}



const UsuarioMongooseGet= (req= request, res= response) => {
    const {id}= req.params
    const {nombre='Sin nombre', apikey='', page=1, limit=10,cedula='',} =  req.query;

    res.status(400).json({
        msg:`Todo ok con GET solo un Usuarios Mongoose`,
        id
    })


 
}




const UsuarioMongoosePost = async(req= request, res= response) => {

try {
   const {nombre,cedula,email,clave,rol} = req.body;
   
      const usuario =new Usuario({nombre, cedula,email,clave,rol})
   
      //verificar si el correo existe
      
      //encriptar la contraseña
      const salt =  bcryptjs.genSaltSync();
      usuario.clave= bcryptjs.hashSync(clave,salt)

      //Guardar en BD


    usuario.save();
   

   
   res.status(400).json({
      usuario
   })
   
} catch (error) {
   console.log(error);   
   res.status(500).json({msg:'Error al guardar Usuario'})
}



}




const UsuarioMongoosePut = (req, res) => {
               
       const {id}= req.params
    res.status(400).json({
    msg:`Todo ok con Put Usuarios Mongoose`,
    id
 })

}



const UsuarioMongooseDelete = (req, res) => {

       const {id}= req.params
    res.status(400).json({
    msg:`Todo ok con Delete Usuarios Mongoose`,
    id
 })

            
}

module.exports= {

UsuariosMongooseGet,  
UsuarioMongooseGet,   
UsuarioMongoosePost,  
UsuarioMongoosePut,   
UsuarioMongooseDelete,

}




/*

const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../../models/mongoose/usuario'); // Ajusta la ruta según tu estructura
const { fechaEcuador } = require('../../helpers/fechaActual');

const usuarioPost = async (req = request, res = response) => {
    try {
        const { nombre, cedula, email, clave, rol, img, google } = req.body;
        
        // Validaciones básicas
        if (!nombre || !cedula || !email || !clave) {
            return res.status(400).json({
                ok: false,
                msg: 'Los campos nombre, cedula, email y clave son obligatorios'
            });
        }

        // Validar formato de cédula (opcional - puedes implementar tu propia validación)
        if (cedula.length !== 10) {
            return res.status(400).json({
                ok: false,
                msg: 'La cédula debe tener 10 dígitos'
            });
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                ok: false,
                msg: 'El formato del email no es válido'
            });
        }

        // Validar rol
        const rolesValidos = ['ADMIN_ROL', 'USER_ROL'];
        if (rol && !rolesValidos.includes(rol)) {
            return res.status(400).json({
                ok: false,
                msg: 'El rol debe ser ADMIN_ROL o USER_ROL'
            });
        }

        // Verificar si ya existe un usuario con esa cédula
        const existeCedula = await Usuario.findOne({ cedula: cedula.trim() });
        if (existeCedula) {
            return res.status(400).json({
                ok: false,
                msg: `Ya existe un usuario con la cédula ${cedula}`
            });
        }

        // Verificar si ya existe un usuario con ese email
        const existeEmail = await Usuario.findOne({ email: email.toLowerCase().trim() });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: `Ya existe un usuario con el email ${email}`
            });
        }

        // Crear el objeto usuario
        const datosUsuario = {
            nombre: nombre.toUpperCase().trim(),
            cedula: cedula.trim(),
            email: email.toLowerCase().trim(),
            rol: rol || 'USER_ROL',
            img: img || 'Sin Foto',
            google: google || false,
            fechacreacion: fechaEcuador()
        };

        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(10);
        datosUsuario.clave = bcryptjs.hashSync(clave, salt);

        // Crear una nueva instancia del usuario
        const usuario = new Usuario(datosUsuario);

        // Guardar en la base de datos
        await usuario.save();

        // Preparar respuesta (sin incluir la contraseña)
        const usuarioRespuesta = {
            uid: usuario._id,
            nombre: usuario.nombre,
            cedula: usuario.cedula,
            email: usuario.email,
            rol: usuario.rol,
            img: usuario.img,
            estado: usuario.estado,
            google: usuario.google,
            fechacreacion: usuario.fechacreacion
        };

        return res.status(201).json({
            ok: true,
            msg: 'Usuario creado exitosamente',
            usuario: usuarioRespuesta
        });

    } catch (error) {
        console.error('Error en usuarioPost:', error);
        
        // Manejar errores específicos de Mongoose
        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                ok: false,
                msg: 'Error de validación',
                errores
            });
        }

        // Manejar error de duplicado (por si las validaciones previas fallan)
        if (error.code === 11000) {
            const campo = Object.keys(error.keyPattern)[0];
            return res.status(400).json({
                ok: false,
                msg: `Ya existe un usuario con ese ${campo}`
            });
        }

        // Error de conexión a la base de datos
        if (error.name === 'MongoError' || error.name === 'MongoServerError') {
            return res.status(503).json({
                ok: false,
                msg: 'Error de conexión con la base de datos. Intente más tarde.',
                error: 'DATABASE_CONNECTION_ERROR'
            });
        }

        // Error genérico
        return res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor',
            error: process.env.NODE_ENV === 'development' ? error.message : 'INTERNAL_SERVER_ERROR'
        });
    }
};

module.exports = {
    usuarioPost
};


*/