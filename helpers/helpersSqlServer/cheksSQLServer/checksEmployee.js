

const { check } = require('express-validator');

const validacionesEmpleadoPeticiones = [
                    check('emp_id', 'El emp_id o Codigo es obligatorio').not().isEmpty(),
                    check('card_id', 'El card_id o ID usuario es obligatorio').not().isEmpty(),
                    check('id_card', 'El id_card o cedula es obligatorio').not().isEmpty(),
                    check('card_sn', 'El card_sn o Numero de Tarjeta es obligatorio').not().isEmpty(),
                    check('emp_name', 'El emp_name es obligatorio').not().isEmpty(),
                    check('depart_id', 'El depart_id es obligatorio').not().isEmpty(),
                    check('job_id', 'El job_id es obligatorio').not().isEmpty(),
                    check('edu_id', 'El edu_id es obligatorio').not().isEmpty(),
                    check('native_id', 'El native_id es obligatorio').not().isEmpty(),
                    check('nation_id', 'El nation_id es obligatorio').not().isEmpty(),
                    check('status_id', 'El status_id es obligatorio').not().isEmpty(),
                    check('polity_id', 'El polity_id es obligatorio').not().isEmpty(),
                    check('position_id', 'El position_id es obligatorio').not().isEmpty(),
                    check('gd_school', 'El gd_school es obligatorio').not().isEmpty(),
                    check('gd_date', 'El gd_date es obligatorio').not().isEmpty(),
                    check('speciality', 'El speciality es obligatorio').not().isEmpty(),
                    check('birth_date', 'El birth_date es obligatorio').not().isEmpty(),
                    check('hire_date', 'El hire_date es obligatorio').not().isEmpty(),
                    check('sex', 'El sex es obligatorio').not().isEmpty(),
                    check('marriage', 'El marriage es obligatorio').not().isEmpty(),
                    check('email', 'El email es obligatorio').not().isEmpty(),
                    check('email', 'El email no es válido').isEmail(),
                    check('phone_code', 'El phone_code es obligatorio').not().isEmpty(),
                    check('address', 'El address es obligatorio').not().isEmpty(),
                    check('post_code', 'El post_code es obligatorio').not().isEmpty(),
                    check('ClockMsg', 'El ClockMsg es obligatorio').not().isEmpty(),
                    check('memo', 'El memo es obligatorio').not().isEmpty(),
                    check('end_date', 'El end_date es obligatorio').not().isEmpty(),
                    check('f_name', 'El f_name es obligatorio').not().isEmpty(),


                   check('gd_date', 'La fecha gd_date debe tener el formato YYYY-MM-DD').matches(/^\d{4}-\d{2}-\d{2}$/),
                   check('birth_date', 'La fecha birth_date debe tener el formato YYYY-MM-DD').matches(/^\d{4}-\d{2}-\d{2}$/),
                   check('hire_date', 'La fecha hire_date debe tener el formato YYYY-MM-DD').matches(/^\d{4}-\d{2}-\d{2}$/),
                   check('end_date', 'La fecha end_date debe tener el formato YYYY-MM-DD').matches(/^\d{4}-\d{2}-\d{2}$/),

    // Validaciones de longitud y formato para campos como email, memo, etc.
   
        check('card_sn')
        .isNumeric().withMessage('El card_sn debe ser un número')
        .isLength({ min:10, max: 10 }).withMessage('El card_sn o tarjeta o tag debe ser de 10 caracteres'),
       
        check('emp_id')
        .isNumeric().withMessage('El emp_id debe ser un número')
        .isLength({ min:8, max: 8 }).withMessage('El emp_id o codigo de usuario debe ser de 8 caracteres'),

              
        check('card_id')
        .isNumeric().withMessage('El card_id debe ser un número')
        .isLength({ min: 10, max: 10 }).withMessage('El card_id o ID usuario debe ser de 10 caracteres'),
       
        check('id_card')
        .isNumeric().withMessage('El id_card debe ser un número')
        .isLength({ min: 10, max: 13 }).withMessage('El id_card cedula debe ser de 3 caracteres'),
   
   
    check('gd_school')
        .isLength({ max: 100 }).withMessage('El gd_school debe ser máximo de 100 caracteres'),

    check('email')
        .isEmail().withMessage('El email no es válido')
        .isLength({ max: 50 }).withMessage('El email debe ser máximo de 50 caracteres'),

    check('memo')
        .isLength({ max: 100 }).withMessage('El memo debe ser máximo de 100 caracteres'),

    check('f_name')
        .isLength({ max: 50 }).withMessage('El f_name debe ser máximo de 50 caracteres'),

    check('emp_name')
        .isLength({ max: 20 }).withMessage('El emp_name debe ser máximo de 20 caracteres'),

    check('address')
        .isLength({ max: 100 }).withMessage('El address debe ser máximo de 100 caracteres'),

    // Validaciones para 'sex' y 'marriage'
    check('sex').isIn(['0', '1']).withMessage('El campo sex debe ser 0 o 1'),
    check('marriage').isIn(['0', '1']).withMessage('El campo marriage debe ser 0 o 1'),

    // Validaciones para campos numéricos
    check('depart_id')
        .isNumeric().withMessage('El depart_id debe ser un número')
        .isLength({ min: 8, max: 8 }).withMessage('El depart_id debe ser de 8 caracteres'),

    check('job_id')
        .isNumeric().withMessage('El job_id debe ser un número')
        .isLength({ min: 3, max: 3 }).withMessage('El job_id debe ser de 3 caracteres'),

    check('edu_id')
        .isNumeric().withMessage('El edu_id debe ser un número')
        .isLength({ min: 3, max: 3 }).withMessage('El edu_id debe ser de 3 caracteres'),

    check('native_id')
        .isNumeric().withMessage('El native_id debe ser un número')
        .isLength({ min: 3, max: 3 }).withMessage('El native_id debe ser de 3 caracteres'),

    check('nation_id')
        .isNumeric().withMessage('El nation_id debe ser un número')
        .isLength({ min: 3, max: 3 }).withMessage('El nation_id debe ser de 3 caracteres'),

    check('status_id')
        .isNumeric().withMessage('El status_id debe ser un número')
        .isLength({ min: 3, max: 3 }).withMessage('El status_id debe ser de 3 caracteres'),

    check('polity_id')
        .isNumeric().withMessage('El polity_id debe ser un número')
        .isLength({ min: 3, max: 3 }).withMessage('El polity_id debe ser de 3 caracteres'),

    check('position_id')
        .isNumeric().withMessage('El position_id debe ser un número')
        .isLength({ min: 3, max: 3 }).withMessage('El position_id debe ser de 3 caracteres'),

    check('post_code')
        .isNumeric().withMessage('El post_code debe ser un número')
        .isLength({ max: 8 }).withMessage('El post_code debe ser de máximo 8 caracteres'),

    check('ClockMsg', 'El ClockMsg es obligatorio').not().isEmpty()
        .isNumeric().withMessage('El ClockMsg debe ser un número')
        .isLength({ min: 4, max: 4 }).withMessage('El ClockMsg debe ser de 4 caracteres')
];




module.exports = {
  validacionesEmpleadoPeticiones,
}
