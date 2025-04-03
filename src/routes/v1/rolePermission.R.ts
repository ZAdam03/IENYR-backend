import { createRoutes } from "./crudRoutes";
import { Prisma } from '@prisma/client';
import { PermissionModel } from "../../models/v1/Permission.M";
import { BaseHandler } from "../../handlers/BaseHandler";

const handler = new BaseHandler<
    PermissionModel.IRes, 
    PermissionModel.ICreate, 
    PermissionModel.ICreate, 
    PermissionModel.IRes>('RolePermission');

export const rolePermissionRouter = createRoutes<
    PermissionModel.IRes, 
    PermissionModel.ICreate, 
    PermissionModel.ICreate, 
    PermissionModel.IRes>({
    prefix: '/rolepermission',
    tag: 'RolePermission',
    summary: 'Szerephez jogosultság rendelés',
    description: 'A szerepkörökhőz itt lehet jogosultságokat rendelni.',
    response:  PermissionModel.TRes,
    createReq: PermissionModel.TCreate,
    controller: {
        getAll: handler.getAll.bind(handler),//nem kell sztem, vagy át kell alakítani where-re
        create: handler.create.bind(handler),
        delete: handler.delete.bind(handler),
    }
});