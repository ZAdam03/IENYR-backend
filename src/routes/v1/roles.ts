import { createRoutes } from "./crudRoutes";
import { getAllHandler, getOneHandler, createHandler, updateHandler, deleteHandler } from '../../controllers/rolesController';
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
        getAll: getAllHandler,
        getOne: getOneHandler,
        create: createHandler,
        update: updateHandler,
        delete: deleteHandler,
    },
});