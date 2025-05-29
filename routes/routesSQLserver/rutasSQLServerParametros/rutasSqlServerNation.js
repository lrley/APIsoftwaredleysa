const { Router } = require('express');
const { validarCampos } = require('../../../middlewares/validar-campos');
const { validarNationPeticionesStatus } = require('../../../helpers/helpersSqlServer/cheksSQLServer/cheksNation');
const { nationsGet, nationGet, nationPost, nationPut, nationDelete } = require('../../../controllers/controllersSQLserver/ParametrosSQLServer/controllesSQLServerNation');



const routerNation = Router();

            routerNation.get('/', nationsGet)

            routerNation.get('/:id',nationGet)

            routerNation.post('/',[
                    validarNationPeticionesStatus,
                    validarCampos
            ], nationPost)

            routerNation.put('/:id',[
                 validarNationPeticionesStatus,
                    validarCampos
            ],nationPut )

            routerNation.delete('/:id', nationDelete)

module.exports = routerNation;