import { t } from 'elysia'

const InputBody = t.Object({
    viewId: t.String(),
    tableName: t.String(),
    columnName: t.String(),
});

type Body = typeof InputBody.static;

export { InputBody as viewColumnInputBody, Body as ViewColumnBody }