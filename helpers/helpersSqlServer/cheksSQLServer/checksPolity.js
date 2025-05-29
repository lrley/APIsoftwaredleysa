const { check } = require('express-validator');

const validarPolityPeticionesStatus = [
    // Validación de Education
            check('polity_id', 'El polity_id es obligatorio').not().isEmpty() 
              .isNumeric().withMessage('El polity_id debe ser un número')
              .isLength({min:3, max: 3 }).withMessage('El polity_id debe ser de 3 caracteres'),

            check('polity_name', 'El polity_name es obligatoria').not().isEmpty() 
              .isLength({ max: 50 }).withMessage('El polity_name debe ser de 50 caracteres')
              .matches(/^[a-zA-Z0-9\s\-_áéíóúÁÉÍÓÚñÑ]+$/).withMessage('El polity_name solo puede contener letras, números, espacios y guiones'),

];

module.exports = { validarPolityPeticionesStatus };