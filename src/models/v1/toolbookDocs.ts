import { t } from 'elysia'

const InputBody = t.Object({
    toolbookItemId: t.String(),
    path: t.String(),
    fileName: t.String(),
    fileType: t.String(),
    createdById: t.String(),
});

type Body = typeof InputBody.static;

export { InputBody as toolbookDocsInputBody, Body as ToolbookDocsBody }