const { Router } = require('express');
const { validarCampos } = require('../../../middlewares/validar-campos');
const { validarJobPeticiones } = require('../../../helpers/helpersSqlServer/cheksSQLServer/checksJob');
const { jobGet, jobsGet, jobPost, jobPut, jobDelete } = require('../../../controllers/controllersSQLserver/ParametrosSQLServer/controllersSQLJob');





const routerJob = Router();

            routerJob.get('/', jobsGet)

            routerJob.get('/:id',jobGet)

            routerJob.post('/',[
                    validarJobPeticiones,
                    validarCampos
            ], jobPost)

            routerJob.put('/:id',[
                 validarJobPeticiones,
                    validarCampos
            ],jobPut )

            routerJob.delete('/:id', jobDelete)

module.exports = routerJob;