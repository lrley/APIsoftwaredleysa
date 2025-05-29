const { Router } = require('express');
const { validarCampos } = require('../../../middlewares/validar-campos');
const { politysGet,polityGet,polityPost,polityPut,polityDelete, } = require('../../../controllers/controllersSQLserver/ParametrosSQLServer/controllersSQLServerPolity');
const { validarPolityPeticionesStatus } = require('../../../helpers/helpersSqlServer/cheksSQLServer/checksPolity');





const routerPolity = Router();

            routerPolity.get('/', politysGet)

            routerPolity.get('/:id',polityGet)

            routerPolity.post('/',[validarPolityPeticionesStatus,validarCampos], polityPost)

            routerPolity.put('/:id',[validarPolityPeticionesStatus,validarCampos],polityPut )

            routerPolity.delete('/:id', polityDelete)

module.exports = routerPolity;