import { t } from 'elysia'
import { UserModel } from './User.M';
import { Prisma } from '@prisma/client';
import { ToolbookItemModel } from './ToolbookItem.M.';

export namespace ToolbookModel {
    // A beérkező body szerkezet létrehozáskor
    export const TCreate = t.Object({
        userId: t.String(),
    });
    export type ICreate = typeof TCreate;

    // A beérkező body szerkezet frissítéskor
    export const TUpdate = t.Object({
        isActive: t.Boolean(), //csak false lehet
        deactivatedAt: t.Date(),
        deactivatedById: t.String(),
    });
    export type IUpdate = typeof TUpdate;

    // Prisma modellel megegyező séma
    export const TSelfRes = t.Object({
        id: t.String(),
        userId: t.String(),
        createdAt: t.Date(),
        isActive: t.Boolean(),
        deactivatedAt: t.Optional(t.Date()),
        deactivatedById: t.Optional(t.String()),
    });
    export type ISelfRes = typeof TSelfRes; 

    // A válasz BEÁGYAZOTT séma definíciója
    export const TNestedRes = t.Object({
        id: t.String(),
        userId: t.String(),
        user: t.Array(UserModel.TSelfRes),
        createdAt: t.Date(),
        isActive: t.Boolean(),
        deactivatedAt: t.Optional(t.Date()),
        deactivatedById: t.Optional(t.String()),
        deactivatedBy: t.Optional(t.Array(UserModel.TSelfRes)),
        toolbookItems: t.Array(ToolbookItemModel.TSelfRes),
    });
    export type INestedRes = typeof TNestedRes; 
    export const queryOptions = Prisma.validator<Prisma.ToolbookDefaultArgs>()({
        include: { 
            user: true, 
            deactivatedBy: true, 
            toolbookItems: true 
        },
    });
    export type Query = typeof queryOptions;
};