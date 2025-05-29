
const {Schema, model} = require('mongoose');
const { fechaEcuador } = require('../../helpers/fechaActual');

const usuarioSchema = Schema({

    nombre:{
        type: String,
        required: [true, 'El nombre es Obligatorio']
    },

    cedula:{
        type: String,
        required: [true, 'La Cedula es Requerida'],
        unique: true
    },

    email:{
        type: String,
        required: [true, 'El Correo es Obligatorio'],
        unique: true
    },

    clave:{
        type: String,
        required: [true, 'La contraseña es Obligatorio']
    },

    rol:{
        type: String,
        required: true,
        enum:['ADMIN_ROL', 'USER_ROL']
    },
    
    img:{
        type: String,
        default: 'Sin Foto'
    },

    estado:{
        type: Boolean,
        default: true
    },

    google:{
        type: Boolean,
        default: false
    },

    fechacreacion:{
        type: Date,
        default: fechaEcuador(),
        required: true,
    },




});

usuarioSchema.methods.toJSON= function(){

    const {/* _id, */ /* __v, */clave, ...user}= this.toObject();
  //  user.uid=_id
    return user;
}

module.exports= model('Usuario',usuarioSchema);