import { createRoutes } from "./crudRoutes";
import { getAllHandler, getOneHandler, createHandler, updateHandler, deleteHandler } from '../../controllers/rolesController';
import { RoleBody, roleInputBody, roleModel } from '../../models/roleModel';
import { Role } from '@prisma/client';
import { roleController } from "../../controllers/RoleController";

//routes/v1/roles.ts

export const rolesRoute = createRoutes<RoleBody, Role>({
    prefix: '/roles',
    tag: 'Roles',
    summary: 'Szerepkörök',
    description: 'A fő szerepkörök melyek az Entra ID csoporthoz vannak kötve és Permission van hozzájuk rendelve.',
    model: roleInputBody,
    controller: {
        getAll: roleController.getAll.bind(roleController),
        getOne: roleController.getOne.bind(roleController),
        create: roleController.create.bind(roleController),
        update: roleController.update.bind(roleController),
        delete: roleController.delete.bind(roleController),
    },
});