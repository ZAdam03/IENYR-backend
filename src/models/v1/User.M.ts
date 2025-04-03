import { t } from 'elysia'
import { ToolbookModel } from './Toolbook.M';

export namespace UserModel {
    // A beérkező body szerkezet létrehozáskor
    export const TCreate = t.Object({
        email: t.String(),
        name: t.String(),
    });
    export type ICreate = typeof TCreate;

    // A beérkező body szerkezet frissítéskor
    export const TUpdate = t.Object({
        email: t.Optional(t.String()),
        name: t.Optional(t.String()),
        azureId: t.Optional(t.String()),
        azEmail: t.Optional(t.String()),
    });
    export type IUpdate = typeof TUpdate;

    // Prisma modellel megegyező séma
    export const TSelfRes = t.Object({
        id: t.String(),
        email: t.String(),
        name: t.String(),
        createdAt: t.Date(),
        azureId: t.Optional(t.String()),
        azEmail: t.Optional(t.String()),
        lastLogin: t.Optional(t.String()),
    });
    export type ISelfRes = typeof TSelfRes; 

    // A válasz BEÁGYAZOTT séma definíciója
    export const TNestedRes = t.Object({
        id: t.String(),
        email: t.String(),
        name: t.String(),
        createdAt: t.Date(),
        azureId: t.Optional(t.String()),
        azEmail: t.Optional(t.String()),
        lastLogin: t.Optional(t.String()),
        toolbook: t.Array(ToolbookModel.TSelfRes),
    });
    export type INestedRes = typeof TNestedRes; 
};