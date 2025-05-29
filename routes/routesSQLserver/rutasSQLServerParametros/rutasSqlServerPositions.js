const { Router } = require('express');
const { validarCampos } = require('../../../middlewares/validar-campos');
const { validarPositionsPeticionesStatus } = require('../../../helpers/helpersSqlServer/cheksSQLServer/cheksPositions');
const { positionssGet,positionsGet,positionsPost,positionsPut,positionsDelete, } = require('../../../controllers/controllersSQLserver/ParametrosSQLServer/controllesSQLServerPositions');



const routerPositions = Router();

            routerPositions.get('/', positionssGet)

            routerPositions.get('/:id',positionsGet)

            routerPositions.post('/',[validarPositionsPeticionesStatus,validarCampos], positionsPost)

            routerPositions.put('/:id',[validarPositionsPeticionesStatus,validarCampos],positionsPut )

            routerPositions.delete('/:id', positionsDelete)

module.exports = routerPositions;