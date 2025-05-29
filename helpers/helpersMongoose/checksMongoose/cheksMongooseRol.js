const { check } = require('express-validator');

const validarRol = [

  check('rol', 'El rol es obligatorio').not().isEmpty()
  .isLength({ max:20 })
  .matches(/^[a-zA-Z0-9\s\-_áéíóúÁÉÍÓÚñÑ]+$/).withMessage('El job_name solo puede contener letras, números, espacios y guiones'),

];

module.exports = { validarRol };