import { createRoutes } from "./crudRoutes";
import { getAll, getOne, create, update, del } from '../../controllers/rolesController';
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
        getAll: getAll,
        getOne: getOne,
        create: create,
        update: update,
        delete: del,
    },
});