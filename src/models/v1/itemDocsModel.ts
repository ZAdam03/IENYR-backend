import { t } from 'elysia'

const InputBody = t.Object({
    itemId: t.String(),
    path: t.String(),
    fileName: t.String(),
    fileType: t.String(),
    createdById: t.String(),
});

type Body = typeof InputBody.static;

export { InputBody as itemDocsInputBody, Body as ItemDocsBody }