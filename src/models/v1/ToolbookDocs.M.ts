import { t } from 'elysia'
import { UserModel } from './User.M';
import { Prisma } from '@prisma/client';
import { ToolbookItemModel } from './ToolbookItem.M.';

export namespace ToolbookDocsModel {
    // A beérkező body szerkezet létrehozáskor
    export const TCreate = t.Object({
        toolbookItemId: t.String(),
        path: t.String(),
        fileName: t.String(),
        fileType: t.String(),
        createdById: t.String(),
    });
    export type ICreate = typeof TCreate;

    // A beérkező body szerkezet frissítéskor
    // export const TUpdate = t.Object({
    // });
    // export type IUpdate = typeof TUpdate;

    // Prisma modellel megegyező séma
    export const TSelfRes = t.Object({
        id: t.String(),
        toolbookItemId: t.String(),
        path: t.String(),
        fileName: t.String(),
        fileType: t.String(),
        createdAt: t.Date(),
        createdById: t.String(),
    });
    export type ISelfRes = typeof TSelfRes; 

    // A válasz BEÁGYAZOTT séma definíciója
    export const TNestedRes = t.Object({
        id: t.String(),
        toolbookItemId: t.String(),
        toolbookItem: t.Array(ToolbookItemModel.TSelfRes),
        path: t.String(),
        fileName: t.String(),
        fileType: t.String(),
        createdAt: t.Date(),
        createdById: t.String(),
        createdBy: t.Array(UserModel.TSelfRes),
    });
    export type INestedRes = typeof TNestedRes; 
    export const queryOptions = Prisma.validator<Prisma.ToolbookDocsDefaultArgs>()({
        include: {
            toolbookItem: true,
            createdBy: true,
        },
    });
    export type Query = typeof queryOptions;
};