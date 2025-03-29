import { createRoutes } from "./crudRoutes";
import { RolePermission } from '@prisma/client';
import { rolePermissionController } from "../../controllers/RolePermission";
import { RolePermissionBody, rolePermissionInputBody } from "../../models/v1/rolePermissionModel";

//routes/v1/rolesPermission.ts

export const rolePermissionRoute = createRoutes<RolePermissionBody, RolePermission>({
    prefix: '/rolePermission',
    tag: 'RolePermisison',
    summary: 'Szerepkörök a jogosultsághoz csatolva',
    description: 'Itt tudunk a szerepkörökhöz jogosultságot rendelni.',
    model: rolePermissionInputBody,
    controller: {
        getAll: rolePermissionController.getAll.bind(rolePermissionController),
        create: rolePermissionController.create.bind(rolePermissionController),
        delete: rolePermissionController.delete.bind(rolePermissionController),
    },
});