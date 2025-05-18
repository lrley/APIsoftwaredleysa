const { Router } = require('express');
const { empoyeesGet, employeeGet, employeePost, employeePut, employeeDelete } = require('../../controllers/controllersSQLserver/controllersSQLEmployee');


const routerEmployee = Router();

            routerEmployee.get('/', empoyeesGet)

            routerEmployee.get('/:id',employeeGet)

            routerEmployee.post('/', employeePost)

            routerEmployee.put('/:id', employeePut )

            routerEmployee.delete('/:id', employeeDelete)

module.exports = routerEmployee;