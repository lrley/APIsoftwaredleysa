const { Router } = require('express');
const { validarCampos } = require('../../../middlewares/validar-campos');
const { educationsDelete, educationsPut, educationsPost, educationssGet, educationsGet } = require('../../../controllers/controllersSQLserver/ParametrosSQLServer/controllersSqlServerEducation');
const { validarEducationPeticionesStatus } = require('../../../helpers/helpersSqlServer/cheksSQLServer/checksEducation');


const routerEducation = Router();

            routerEducation.get('/', educationssGet)

            routerEducation.get('/:id',educationsGet)

            routerEducation.post('/',[
                    validarEducationPeticionesStatus,
                    validarCampos
            ], educationsPost)

            routerEducation.put('/:id',[
                 validarEducationPeticionesStatus,
                    validarCampos
            ],educationsPut )

            routerEducation.delete('/:id', educationsDelete)

module.exports = routerEducation;