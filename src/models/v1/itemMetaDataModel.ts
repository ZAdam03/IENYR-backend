import { t } from 'elysia'

const InputBody = t.Object({
    itemId: t.String(),
    description: t.String(),
    notes: t.String(),
    modifiedAt: t.Object(t.String()),
    modifiedById: t.Object(t.String()),
});

type Body = typeof InputBody.static;

export { InputBody as itemMetaDataInputBody, Body as ItemMetaDataBody }