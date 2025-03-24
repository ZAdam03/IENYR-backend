import { PrismaClient, Role } from '@prisma/client';
import { RoleBody } from '../models/roleModel';
import { t } from 'elysia';

const prisma = new PrismaClient();

async function getAll(): Promise<Role[]> {
    try {
        return await prisma.role.findMany();
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch roles");
    }
}

async function getOne(id: string): Promise<Role | null> { //nem lehet null
    try {
        const role = await prisma.role.findUnique({
            where: {
                id
            }
        })
        return role;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch role");
    }
}

async function create(role: RoleBody): Promise<Role> {
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
        throw new Error("Failed to create role");
    }
}

async function update(id: string, role: RoleBody): Promise<Role> {
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
        throw new Error("Failed to update role");
    }
 }

async function del(id: string): Promise<Role> {
    try {
        return await prisma.role.delete({
            where: {
                id
            }
        });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete role");
    }
}
export { getAll as getRoles, getOne as getRole, create as createRole, 
    update as updateRole, del as deleteRole };