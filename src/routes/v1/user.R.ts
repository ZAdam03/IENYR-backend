import { createRoutes } from "./crudRoutes";
import { Prisma } from '@prisma/client';
import { BaseHandler } from "../../handlers/BaseHandler";
import { UserModel } from "../../models/v1/User.M";

//user/v1/user.ts

const queryOptions = Prisma.validator<Prisma.UserDefaultArgs>()({
    include: { toolbook: true },
});
type Query = typeof queryOptions;

const handler = new BaseHandler<
    UserModel.INestedRes, 
    UserModel.ICreate, 
    UserModel.IUpdate, 
    UserModel.ISelfRes
    >('user');

export const roleRouter = createRoutes<
    UserModel.INestedRes, 
    UserModel.ICreate, 
    UserModel.IUpdate, 
    UserModel.ISelfRes, 
    Query>({
    prefix: '/user',
    tag: 'User',
    summary: 'Felhasználók',
    description: 'A felhasználók. A megadott mezők létrehozhatók az adminisztrátor által, ha a felhasználó belép az alkalmazás frissíti az adatokat, --> ezért nagyon fontos, hogy pontosan töltsük ki az email-cím mezőt, mert ez alapján azonosítja az Azure-os felhasználók közül.',
    response:  UserModel.TNestedRes,
    createReq: UserModel.TCreate,
    updateReq: UserModel.TUpdate,
    controller: {
        getAll: handler.getAll.bind(handler),
        getOne: handler.getOne.bind(handler),
        create: handler.create.bind(handler),
        update: handler.update.bind(handler),
        //delete: handler.delete.bind(handler),
    },
    options: queryOptions,
});