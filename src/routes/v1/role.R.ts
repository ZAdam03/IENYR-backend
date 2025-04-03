import { createRoutes } from "./crudRoutes";
import { Role, Prisma } from '@prisma/client';
//import { roleController as controller } from "../../controllers/RoleController";
import { BaseHandler } from "../../controllers/BaseHandler";
//import { BaseController } from "../../controllers/BaseController";
import { RoleHandler } from "../../controllers/RoleHandler";
import { RoleModel } from "../../models/v1/Role.M";

const queryOptions = Prisma.validator<Prisma.RoleDefaultArgs>()({
    include: { permissions: true },
});
type Query = typeof queryOptions;

const handler = new RoleHandler();

export const roleRouter = createRoutes<
    RoleModel.INestedRes, 
    RoleModel.ICreate, 
    RoleModel.IUpdate, 
    RoleModel.ISelfRes, 
    Query>({
    prefix: '/role',
    tag: 'Role',
    summary: 'Szerepkörök és jogok',
    description: 'A fő szerepkörök melyek az Entra ID csoporthoz vannak kötve és Permission van hozzájuk rendelve. Lekérésnél a jogokat is visszadja.',
    response:  RoleModel.TNestedRes,
    createReq: RoleModel.TCreate,
    updateReq: RoleModel.TUpdate,
    controller: {
        getAll: handler.getAll.bind(handler),
        getOne: handler.getOne.bind(handler),
        create: handler.create.bind(handler),
        update: handler.update.bind(handler),
        delete: handler.delete.bind(handler),
    },
    options: queryOptions,
});