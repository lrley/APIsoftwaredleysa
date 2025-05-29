const { check } = require('express-validator');

const validarUsuarios = [

  
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),

  check('cedula', 'La cédula es obligatoria').not().isEmpty(),
  check('cedula', 'La cédula debe tener al menos 10 dígitos').isLength({ min: 10 , max:13 }),

  check('email', 'El correo es obligatorio').not().isEmpty(),
  check('email', 'El correo no es válido').isEmail(),

  check('clave', 'La clave es obligatoria').not().isEmpty(),
  check('clave', 'La clave debe tener al menos 6 caracteres').isLength({ min: 6, max:20 }),

  check('rol', 'El rol es obligatorio').not().isEmpty(),
  check('rol', 'El rol no es válido').isIn(['ADMIN_ROL', 'USER_ROL']),
];

module.exports = { validarUsuarios };