import { Elysia, t } from 'elysia'

// Define the role input body
export const roleInputBody = t.Object({
    name: t.String(),
    description: t.Optional(t.String()),
    azureGroupId: t.String(),
});

// Create the role model
export const roleModel = new Elysia()
    .model({
        'body': roleInputBody
    });

// Create the interface
export type RoleBody = typeof roleInputBody.static;

//export default roleModel;

//export type RoleOutput = Role; // Minden adatbázisban lévő mezőt tartalmaz