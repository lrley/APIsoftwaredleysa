const { check } = require('express-validator');

const validarDepartamentosPeticiones = [
    // Validación de depart_id
    check('depart_id', 'El código del departamento es obligatorio').not().isEmpty().withMessage('El depart_id del departamento no puede estar vacío')
        .isNumeric().withMessage('El depart_id debe ser un número')
        .isLength({ min: 8, max: 8 })
        .withMessage('El depart_id del departamento debe tener exactamente 8 caracteres')
        .isNumeric()
        .withMessage('El depart_id del departamento debe ser numérico')
        .custom((depart_id) => {
            if (depart_id === '00000001') {
                throw new Error('El depart_id 00000001 está reservado y no se puede usar pertenece al departamento principal');
            }
            return true;
        }),

    // Validación de upper_depart_id (opcional para departamento raíz)
    check('upper_depart_id')
        .isNumeric().withMessage('El upper_depart_id debe ser un número')
        .isLength({ min: 8, max: 8 })
        .withMessage('El upper_depart_id del departamento superior debe tener exactamente 8 caracteres')
        .isNumeric()
        .withMessage('El upper_depart_id del departamento superior debe ser numérico'),

    // Validación de depart_name
    check('depart_name', 'El nombre del departamento es obligatorio')
        .not().isEmpty()
        .withMessage('El depart_name del departamento no puede estar vacío')
        .isLength({ min: 1, max: 50 })
        .withMessage('El depart_name del departamento debe tener entre 1 y 50 caracteres')
        .matches(/^[a-zA-Z0-9\s\-_áéíóúÁÉÍÓÚñÑ]+$/)
        .withMessage('El depart_name del departamento solo puede contener letras, números, espacios y guiones'),

    // Validación de principal (completamente opcional)
    check('principal')
        .optional({ nullable: true, checkFalsy: true })
        .isLength({ max: 20 })
        .withMessage('El detalle principal no puede exceder 20 caracteres'),

    // Validación personalizada para evitar auto-referencia
    check('depart_id').custom((depart_id, { req }) => {
        if (req.body.upper_depart_id && depart_id === req.body.upper_depart_id) {
            throw new Error('Un departamento no puede ser superior de si mismo cambie el departamento superior');
        }
        return true;
    })
];

module.exports = { validarDepartamentosPeticiones };