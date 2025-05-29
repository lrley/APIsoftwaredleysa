const { check } = require('express-validator');

const validarJobPeticiones = [
    // Validación de Job
            check('job_id', 'El código es obligatorio').not().isEmpty() 
              .isNumeric().withMessage('El job_id debe ser un número')
              .isLength({min:3, max: 3 }).withMessage('El código debe ser de 3 caracteres'),

            check('job_name', 'El job_name es obligatoria').not().isEmpty() 
              .isLength({ max: 50 }).withMessage('El job_name debe ser de 50 caracteres')
              .matches(/^[a-zA-Z0-9\s\-_áéíóúÁÉÍÓÚñÑ]+$/).withMessage('El job_name solo puede contener letras, números, espacios y guiones'),

];

module.exports = { validarJobPeticiones };