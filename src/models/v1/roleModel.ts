import { t } from 'elysia'

// Define the role input body
const InputBody = t.Object({
    name: t.String(),
    description: t.Optional(t.String()),
    azureGroupId: t.String(),
});

// Define the role output body
// export const roleOutputBody = t.Object({
//     id: t.String(),
//     name: t.String(),
//     description: t.Optional(t.String()),
//     azureGroupId: t.String(),
// });

// Create the interface
export type Body = typeof InputBody.static;

export { InputBody as roleInputBody, Body as RoleBody }