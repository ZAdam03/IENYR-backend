import { createRoutes } from "./crudRoutes";
import { RoleBody, roleInputBody } from '../../models/v1/roleModel';
import { Role } from '@prisma/client';
import { roleController } from "../../controllers/RoleController";

//routes/v1/role.ts

export const rolesRoute = createRoutes<RoleBody, Role>({
    prefix: '/role',
    tag: 'Role',
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