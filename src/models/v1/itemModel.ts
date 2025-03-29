import { t } from 'elysia'

const InputBody = t.Object({
    id: t.String(),
    eid: t.Optional(t.String()),
    description: t.Optional(t.String()),
    type: t.String(),
    brand: t.String(),
    model: t.String(),
    serialNumber: t.Object(t.String()),
    status: t.String(),
});

type Body = typeof InputBody.static;

export { InputBody as itemInputBody, Body as ItemBody }