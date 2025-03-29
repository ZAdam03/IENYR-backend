import { t } from 'elysia'

const InputBody = t.Object({
    parentItemId: t.String(),
    childItemId: t.String(),
    isActive: t.Optional(t.Boolean()),
    createdById: t.String(),
    deactivatedAt: t.Optional(t.Date()),
    deactivatedById: t.Optional(t.String()),
});

type Body = typeof InputBody.static;

export { InputBody as StructureMappingInputBody, Body as StructureMappingBody }