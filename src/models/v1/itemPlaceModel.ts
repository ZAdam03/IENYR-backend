import { t } from 'elysia'

const InputBody = t.Object({
    itemId: t.String(),
    placeId: t.String(),
    isActive: t.Optional(t.Boolean()),
    createdById: t.String(),
    deactivatedAt: t.Optional(t.Date()),
    deactivatedById: t.Optional(t.String()),
});

type Body = typeof InputBody.static;

export { InputBody as itemPlaceInputBody, Body as ItemPlaceBody }