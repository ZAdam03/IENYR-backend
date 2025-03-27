import { PrismaClient, Role } from '@prisma/client';
import { RoleBody } from '../models/roleModel';

const prisma = new PrismaClient();

async function getAllHandler(): Promise<Role[]> {
    try {
        return await prisma.role.findMany();
    } catch (error) {
        console.error(error);
        throw new Error(`Database query failed: ${error}`);
        throw new CustomError(ErrorCodes.DB_QUERY_ERROR);
    }
}

async function getOneHandler(id: string): Promise<Role> {
    try {
        const role = await prisma.role.findUnique({
            where: {
                id
            }
        })
        if (!role) {
            throw new Error(`Data not found in the database.`);
        }
        return role;
    } catch (error) {
        console.error(error);
        throw new Error(`Database query failed: ${error}`);
        throw new CustomError(ErrorCodes.DB_QUERY_ERROR);
    }
}

async function createHandler(role: RoleBody): Promise<Role> {
    try {
        return await prisma.role.create({
            data: {
                name: role.name,
                description: role.description,
                azureGroupId: role.azureGroupId,
            }
        });
    }
    catch (error) {
        console.error(error);
        throw new Error(`Error in database insertion: ${error}`);
    }
}

async function updateHandler(id: string, role: RoleBody): Promise<Role> {
    try {
        
        return await prisma.role.update({
            where: {
                id
            },
            data: {
                name: role.name,
                description: role.description,
                azureGroupId: role.azureGroupId
            }
        });
    } catch (error) {
        console.error(error);
        throw new Error(`Error when updating the database: ${error}`);
    }
 }

async function deleteHandler(id: string): Promise<Role> {
    try {
        return await prisma.role.delete({
            where: {
                id
            }
        });
    } catch (error) {
        console.error(error);
        throw new Error(`Error when deleting from database: ${error}`);
    }
}
export { getAllHandler, getOneHandler, createHandler, updateHandler, deleteHandler };