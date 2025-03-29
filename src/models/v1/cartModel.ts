import { t } from 'elysia'

const InputBody = t.Object({
    description: t.String(),
    color: t.String(),
    isShared: t.Boolean(),
    createdById: t.String(),
    lastModifiedAt: t.Optional(t.Date()),
    lastModifiedById: t.Optional(t.String()),
});

type Body = typeof InputBody.static;

export { InputBody as cartInputBody, Body as CartBody }