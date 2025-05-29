const { Router } = require('express');
const { empoyeesGet, employeeGet, employeePost, employeePut, employeeDelete,  } = require('../../controllers/controllersSQLserver/controllersSQLEmployee');
const { existeEmpIdEmployeeSqlServer, busquedaEmpidEmployeeSqlServer, verificacionDeFechaSqlServer, validarSoloNumeros, verificacionUsuarioPutNoIguales } = require('../../middlewares/middelewareSqlServer/verificacionDeDatosSqlServer');
const { validarCampos } = require('../../middlewares/validar-campos');
const { check } = require('express-validator');
const { validacionesEmpleadoPeticiones } = require('../../helpers/helpersSqlServer/cheksSQLServer/checksEmployee');



const routerEmployee = Router();

            routerEmployee.get('/', empoyeesGet)
          
            routerEmployee.get('/:id',[
                existeEmpIdEmployeeSqlServer
            ],employeeGet)

            routerEmployee.post('/',[
                    validarSoloNumeros,
                    validacionesEmpleadoPeticiones,
                    validarCampos,
                    busquedaEmpidEmployeeSqlServer,
                    verificacionDeFechaSqlServer,
            ] ,employeePost)

            routerEmployee.put('/:id', 
                [
                   validarSoloNumeros,
                   verificacionDeFechaSqlServer,
                   validacionesEmpleadoPeticiones,
                   validarCampos,
                ]
                ,employeePut )

            routerEmployee.delete('/:id', employeeDelete)

module.exports = routerEmployee;