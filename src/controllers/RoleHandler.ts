import { Prisma, PrismaClient, Role } from "@prisma/client";
import { BaseHandler } from "./BaseHandler";
import { TObject, TString, TOptional, TArray } from "@sinclair/typebox";
import { RoleModel } from "../models/v1/Role.M";

const prisma = new PrismaClient();

export class RoleHandler extends BaseHandler<
    RoleModel.INestedRes, 
    RoleModel.ICreate, 
    RoleModel.IUpdate, 
    RoleModel.ISelfRes>{
    constructor() {
        super('role');
    }

    // async getAll(options?: any): Promise<RoleModel.INestedRes[]> {
    //     //@ts-ignore
    //     return await prisma.role.findMany({
    //         include: {
    //             permissions: true,
    //         }
    //     });
    // }

    // async getOne(id: string, options?: any): Promise<Role> {
    //     return await prisma.role.findUnique({
    //         where: {id},
    //     })
    // }
}