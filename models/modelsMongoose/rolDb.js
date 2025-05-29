
const {Schema, model} = require('mongoose');
const { fechaEcuador } = require('../../helpers/fechaActual');

const SchemaRol = Schema({

    rol:{
        type: String,
        required: true,
        unique: true
    },
    
    
    estado:{
        type: Boolean,
        default: true
    },

    
    fechacreacion:{
        type: Date,
        required: true,
        default: fechaEcuador(),
    },


});

SchemaRol.methods.toJSON= function(){

    const {_id, __v,...roles}= this.toObject();
    
    return roles;
}

module.exports= model('Role',SchemaRol);