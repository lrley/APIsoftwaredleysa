const { check } = require('express-validator');

const validarEducationPeticionesStatus = [
    // Validación de Education
            check('edu_id', 'El edu_id es obligatorio').not().isEmpty() 
              .isNumeric().withMessage('El edu_id debe ser un número')
              .isLength({min:3, max: 3 }).withMessage('El edu_id debe ser de 3 caracteres'),

            check('education', 'El status_name es obligatoria').not().isEmpty() 
              .isLength({ max: 50 }).withMessage('El education debe ser de 50 caracteres')
              .matches(/^[a-zA-Z0-9\s\-_áéíóúÁÉÍÓÚñÑ]+$/).withMessage('El education solo puede contener letras, números, espacios y guiones'),

];

module.exports = { validarEducationPeticionesStatus };