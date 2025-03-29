import { t } from 'elysia'

const InputBody = t.Object({
    userId: t.String(),
    isActive: t.Optional(t.Boolean()),
    deactivatedAt: t.Optional(t.String()),
    deactivatedById: t.Optional(t.String()),
});

type Body = typeof InputBody.static;

export { InputBody as toolbookInputBody, Body as ToolbookBody }