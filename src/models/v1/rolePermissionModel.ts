import { t } from 'elysia'

const InputBody = t.Object({
    name: t.String(),
    description: t.Optional(t.String()),
    azureGroupId: t.String(),
});

type Body = typeof InputBody.static;

export { InputBody as rolePermissionInputBody, Body as RolePermissionBody }