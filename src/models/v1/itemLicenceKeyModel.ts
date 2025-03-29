import { t } from 'elysia'

const InputBody = t.Object({
    itemId: t.String(),
    key: t.String(),
    description: t.String(),
});

type Body = typeof InputBody.static;

export { InputBody as itemLicenceKeyInputBody, Body as itemLicenceKeyBody }