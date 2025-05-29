const { check } = require('express-validator');

const validarJobPeticionesStatus = [
    // Validación de Status
            check('status_id', 'El status_id es obligatorio').not().isEmpty() 
              .isNumeric().withMessage('El status_id debe ser un número')
              .isLength({min:3, max: 3 }).withMessage('El status_id debe ser de 3 caracteres'),

            check('status_name', 'El status_name es obligatoria').not().isEmpty() 
              .isLength({ max: 50 }).withMessage('El status_name debe ser de 50 caracteres')
              .matches(/^[a-zA-Z0-9\s\-_áéíóúÁÉÍÓÚñÑ]+$/).withMessage('El status_name solo puede contener letras, números, espacios y guiones'),

];

module.exports = { validarJobPeticionesStatus };