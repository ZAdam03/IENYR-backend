import { createRoutes } from "./crudRoutes";
import { Prisma } from '@prisma/client';
import { PermissionHandler } from "../../controllers/Permission.H";
import { PermissionModel } from "../../models/v1/Permission.M";

//routes/v1/role.ts

const queryOptions = Prisma.validator<Prisma.RoleDefaultArgs>()({
});
type Query = typeof queryOptions;

const handler = new PermissionHandler();

export const rolePermissionsRouter = createRoutes<PermissionModel.IRes, PermissionModel.ICreate, PermissionModel.ICreate, PermissionModel.IRes, Query>({
    prefix: '/rolepermissions',
    tag: 'RolePermissions',
    summary: 'Szerephez jogosultság rendelés',
    description: 'A szerepkörökhőz itt lehet jogosultságokat rendelni.',
    response:  PermissionModel.TRes,
    createReq: PermissionModel.TCreate,
    controller: {
        getOne: handler.getOne.bind(handler),//nem kell sztem, vagy át kell alakítani where-re
        create: handler.create.bind(handler),
        delete: handler.delete.bind(handler),
    }
});