import { createRoutes } from "../../routeConfig";
import { getRoles, getRole, createRole, updateRole, deleteRole } from '../../controllers/rolesController';
import { RoleBody, roleInputBody, roleModel } from '../../models/roleModel';
import { Role } from '@prisma/client';
import Elysia from "elysia";

//routes/v1/roles.ts

export const rolesRoute = createRoutes<RoleBody, Role>({
    prefix: '/roles',
    tag: 'Roles',
    summary: 'Szerepkörök',
    description: 'A fő szerepkörök melyek az Entra ID csoporthoz vannak kötve és Permission van hozzájuk rendelve.',
    model: roleInputBody,
    controller: {
        getAll: getRoles,
        getOne: getRole,
        create: createRole,
        update: updateRole,
        delete: deleteRole,
    },
});
console.log("rolesRoute-ok");
console.log(rolesRoute instanceof Elysia); // true-nak kell lennie

//export { rolesRoute };

// const test2 = new Elysia()
//     .use(
//         plugin({
//             prefix: '/v1/roles2',
//             tag: 'Roles2',
//             model: roleInputBody,
//             controller: {
//                 getAll: getRoles,
//                 getOne: getRole,
//                 create: createRole,
//                 update: updateRole,
//                 delete: deleteRole,
//             }
//         })
//     );
// export { test2 as rolesRoute2 };