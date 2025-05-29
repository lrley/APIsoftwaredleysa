const {response, request}= require('express');
const moment = require('moment-timezone');

/**
 * Convierte una fecha UTC a formato Ecuador
 * @param {Date|string} fecha - Fecha en formato UTC para convertir
 * @param {boolean} incluirHora - Si es true incluye la hora, si es false solo la fecha
 * @returns {string} Fecha formateada en zona horaria de Ecuador
 */
const convertirFechaEcuador = (fecha, incluirHora = true) => {
    const zonaHoraria = 'America/Guayaquil';
    
    try {
        if (!fecha) {
            return null;
        }

        // Si solo quieren la fecha sin hora
        if (!incluirHora) {
            return moment(fecha)
                .tz(zonaHoraria)
                .format('YYYY-MM-DD');
        }

        // Retorna fecha y hora
        return moment(fecha)
            .tz(zonaHoraria)
            .format('YYYY-MM-DD HH:mm:ss');
            
    } catch (error) {
        console.error('Error al convertir la fecha:', error);
        return null;
    }
};

/**
 * Obtiene la fecha y hora actual en Ecuador
 * @param {boolean} incluirHora - Si es true incluye la hora, si es false solo la fecha
 * @returns {string} Fecha actual en zona horaria de Ecuador
 */
const obtenerFechaActualEcuador = (incluirHora = true) => {
    const zonaHoraria = 'America/Guayaquil';
    
    try {
        if (!incluirHora) {
            return moment()
                .tz(zonaHoraria)
                .format('YYYY-MM-DD');
        }

        return moment()
            .tz(zonaHoraria)
            .format('YYYY-MM-DD HH:mm:ss');
            
    } catch (error) {
        console.error('Error al obtener la fecha actual:', error);
        return null;
    }
};


const fechaEcuador=()=>{

   //Obtener fecha y hora de Ecuador
   const fechaEcuador = moment().tz('America/Guayaquil');
   //Restar 5 horas al crear la fecha para MongoDB
   const fechaAGuardar = new Date(fechaEcuador.subtract(5, 'hours').format());


   return fechaAGuardar;
}


const verificaFecha=async(fechainicio, fechafin)=>{
 
    const formatoFecha = 'YYYY-MM-DD HH:mm:ss';
    
    const fechaInicioValida = moment(fechainicio, formatoFecha, true);
    const fechaFinValida = moment(fechafin, formatoFecha, true);
    let msg='ok';
        if (!fechaInicioValida.isValid() || !fechaFinValida.isValid()) {
            return {msg:'Una de las fechas es invalidas'}
        }

        if (fechaFinValida.isBefore(fechaInicioValida)) {
            return { msg:'No puede ser Fecha Fin menor que fecha de Inicio' }
        }

         const fechaInit = new Date(fechaInicioValida.subtract(5, 'hours').format());
         const fechaF = new Date(fechaFinValida.subtract(5, 'hours').format());
     return {fechaInit,fechaF,msg}   


}

module.exports = {
    convertirFechaEcuador,
    obtenerFechaActualEcuador,
    fechaEcuador,
    verificaFecha
};



