const { Router } = require('express');
const { validarCampos } = require('../../../middlewares/validar-campos');
const { validarJobPeticionesStatus } = require('../../../helpers/helpersSqlServer/cheksSQLServer/checksStatus');
const { StatussGet, StatusGet, StatusPost, StatusPut, StatusDelete } =  require('../../../controllers/controllersSQLserver/ParametrosSQLServer/controllersSqlStatus');


const routerStatus = Router();

            routerStatus.get('/', StatussGet)

            routerStatus.get('/:id',StatusGet)

            routerStatus.post('/',[
                    validarJobPeticionesStatus,
                    validarCampos
            ], StatusPost)

            routerStatus.put('/:id',[
                 validarJobPeticionesStatus,
                    validarCampos
            ],StatusPut )

            routerStatus.delete('/:id', StatusDelete)

module.exports = routerStatus;