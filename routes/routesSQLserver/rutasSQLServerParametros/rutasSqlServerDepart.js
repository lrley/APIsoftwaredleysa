const { Router } = require('express');
const { check } = require('express-validator');
const { departsGet, departGet, departPost, departPut, departDelete } = require('../../../controllers/controllersSQLserver/ParametrosSQLServer/controllersSQLDepart');
const { validarCampos } = require('../../../middlewares/validar-campos');
const { validarDepartamentosPeticiones } = require('../../../helpers/helpersSqlServer/cheksSQLServer/checksDepart');
 




const routerDepart = Router();

            routerDepart.get('/', departsGet)

            routerDepart.get('/:id',departGet)

            routerDepart.post('/',[
            validarDepartamentosPeticiones,
                    validarCampos
            ], departPost)

            routerDepart.put('/:id',[
                 validarDepartamentosPeticiones,
                    validarCampos
            ],departPut )

            routerDepart.delete('/:id', departDelete)

module.exports = routerDepart;