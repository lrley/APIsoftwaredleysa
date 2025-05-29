const { Router } = require('express');
const { validarCampos } = require('../../../middlewares/validar-campos');
const { validarNativePeticionesStatus } = require('../../../helpers/helpersSqlServer/cheksSQLServer/cheksNative');
const { nativesGet,nativeGet,nativePost,nativePut,nativeDelete, } = require('../../../controllers/controllersSQLserver/ParametrosSQLServer/controllesSQLServerNative');



const routerNative = Router();

            routerNative.get('/', nativesGet)

            routerNative.get('/:id',nativeGet)

            routerNative.post('/',[validarNativePeticionesStatus,validarCampos], nativePost)

            routerNative.put('/:id',[validarNativePeticionesStatus,validarCampos],nativePut )

            routerNative.delete('/:id', nativeDelete)

module.exports = routerNative;