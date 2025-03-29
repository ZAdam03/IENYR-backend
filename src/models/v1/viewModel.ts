import { t } from 'elysia'

const InputBody = t.Object({
    description: t.String(),
    createdById: t.String(),
    lastModifiedAt: t.Optional(t.Date()),
    lastModifiedById: t.Optional(t.String()),
});

type Body = typeof InputBody.static;

export { InputBody as viewInputBody, Body as ViewBody }