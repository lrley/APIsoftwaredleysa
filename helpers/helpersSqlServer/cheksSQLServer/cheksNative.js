const { check } = require('express-validator');

const validarNativePeticionesStatus = [
    // Validación de Education
            check('native_id', 'El native_id es obligatorio').not().isEmpty() 
              .isNumeric().withMessage('El native_id debe ser un número')
              .isLength({min:3, max: 3 }).withMessage('El native_id debe ser de 3 caracteres'),

            check('native_name', 'El native_name es obligatoria').not().isEmpty() 
              .isLength({ max: 50 }).withMessage('El native_name debe ser de 50 caracteres')
              .matches(/^[a-zA-Z0-9\s\-_áéíóúÁÉÍÓÚñÑ]+$/).withMessage('El native_name solo puede contener letras, números, espacios y guiones'),

];

module.exports = { validarNativePeticionesStatus };