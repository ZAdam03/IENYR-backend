import { t } from 'elysia'

const InputBody = t.Object({
    toolbookId: t.String(),
    itemId: t.String(),
    createdById: t.String(),
    isActive: t.Optional(t.Boolean()),
    deactivatedAt: t.Optional(t.Date()),
    deactivatedById: t.Optional(t.String()),
});

type Body = typeof InputBody.static;

export { InputBody as toolbookItemInputBody, Body as ToolbookItemBody }