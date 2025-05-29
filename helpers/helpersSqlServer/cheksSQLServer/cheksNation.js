const { check } = require('express-validator');

const validarNationPeticionesStatus = [
    // Validación de Education
            check('nation_id', 'El nation_id es obligatorio').not().isEmpty() 
              .isNumeric().withMessage('El nation_id debe ser un número')
              .isLength({min:3, max: 3 }).withMessage('El nation_id debe ser de 3 caracteres'),

            check('nation_name', 'El nation_name es obligatoria').not().isEmpty() 
              .isLength({ max: 50 }).withMessage('El nation_name debe ser de 50 caracteres')
              .matches(/^[a-zA-Z0-9\s\-_áéíóúÁÉÍÓÚñÑ]+$/).withMessage('El nation_name solo puede contener letras, números, espacios y guiones'),

];

module.exports = { validarNationPeticionesStatus };