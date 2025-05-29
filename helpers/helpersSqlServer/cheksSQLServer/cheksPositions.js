const { check } = require('express-validator');

const validarPositionsPeticionesStatus = [
    // Validación de Education
            check('position_id', 'El position_id es obligatorio').not().isEmpty() 
              .isNumeric().withMessage('El position_id debe ser un número')
              .isLength({min:3, max: 3 }).withMessage('El position_id debe ser de 3 caracteres'),

            check('position_name', 'El position_name es obligatoria').not().isEmpty() 
              .isLength({ max: 50 }).withMessage('El position_name debe ser de 50 caracteres')
              .matches(/^[a-zA-Z0-9\s\-_áéíóúÁÉÍÓÚñÑ]+$/).withMessage('El position_name solo puede contener letras, números, espacios y guiones'),

];

module.exports = { validarPositionsPeticionesStatus };