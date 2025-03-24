import { PrismaClient, Role } from '@prisma/client';
import { RoleBody } from '../models/roleModel';
import { t } from 'elysia';

const prisma = new PrismaClient();

// export const typeRole = t.Object({
//     id: t.String(),
//     name: t.String(),
//     description: t.String(),
//     permissions: t.Array(t.String())
// });

//export type IRole = typeof typeRole.static;

export async function getRoles(): Promise<Role[]> {
    try {
        return await prisma.role.findMany();
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch roles");
    }
}

export async function getRole(id: string): Promise<Role | null> {
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

export async function createRole(role: RoleBody): Promise<Role> {
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

export async function updateRole(id: string, role: RoleBody): Promise<Role> {
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

 export async function deleteRole(id: string): Promise<Role> {
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