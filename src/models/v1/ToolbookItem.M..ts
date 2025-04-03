import { t } from 'elysia'
import { UserModel } from './User.M';
import { Prisma } from '@prisma/client';
import { ToolbookModel } from './Toolbook.M';
import { ToolbookDocsModel } from './ToolbookDocs.M';
import { ItemModel } from './item.M';

export namespace ToolbookItemModel {
    // A beérkező body szerkezet létrehozáskor
    export const TCreate = t.Object({
        toolbookId: t.String(),
        itemId: t.String(),
        createdById: t.String(),
    });
    export type ICreate = typeof TCreate;

    // A beérkező body szerkezet frissítéskor
    export const TUpdate = t.Object({
        isActive: t.Boolean(),
        deactivatedAt: t.Date(),
        deactivatedById: t.String(),
    });
    export type IUpdate = typeof TUpdate;

    // Prisma modellel megegyező séma
    export const TSelfRes = t.Object({
        id: t.String(),
        toolbookId: t.String(),
        itemId: t.String(),
        isActive: t.Boolean(),
        createdAt: t.Date(),
        createdById: t.String(),
        deactivatedAt: t.Optional(t.Date()),
        deactivatedById: t.Optional(t.String()),
    });
    export type ISelfRes = typeof TSelfRes; 

    // A válasz BEÁGYAZOTT séma definíciója
    export const TNestedRes = t.Object({
        id: t.String(),
        toolbookId: t.String(),
        toolbook: t.Array(ToolbookModel.TSelfRes),
        itemId: t.String(),
        item: t.Array(ItemModel.TSelfRes),
        isActive: t.Boolean(),
        createdAt: t.Date(),
        createdById: t.String(),
        createdBy: t.Array(UserModel.TSelfRes),
        deactivatedAt: t.Optional(t.Date()),
        deactivatedById: t.Optional(t.String()),
        deactivatedBy: t.Optional(t.Array(UserModel.TSelfRes)),
        docs: t.Array(ToolbookDocsModel.TSelfRes),
    });
    export type INestedRes = typeof TNestedRes; 
    export const queryOptions = Prisma.validator<Prisma.ToolbookItemDefaultArgs>()({
        include: {
            toolbook: true,
            item: true,
            createdBy: true,
            deactivedBy: true,
            docs: true,
        },
    });
    export type Query = typeof queryOptions;
};