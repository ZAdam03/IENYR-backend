import { t } from 'elysia'
import { ToolbookModel } from './Toolbook.M';
import { Prisma } from '@prisma/client';

export namespace ItemModel {
    // A beérkező body szerkezet létrehozáskor
    export const TCreate = t.Object({
        id: t.String(),
        eid: t.Optional(t.String()),
        description: t.Optional(t.String()),
        type: t.String(),
        brand: t.String(),
        model: t.String(),
        serialNumber: t.Object(t.String()),
        status: t.String(),
    });
    export type ICreate = typeof TCreate;

    // A beérkező body szerkezet frissítéskor
    export const TUpdate = t.Object({
        eid: t.Optional(t.String()),
        description: t.Optional(t.String()),
        type: t.Optional(t.String()),
        brand: t.Optional(t.String()),
        model: t.Optional(t.String()),
        serialNumber: t.Object(t.String()),
        status: t.Optional(t.String()),
    });
    export type IUpdate = typeof TUpdate;

    // Prisma modellel megegyező séma
    export const TSelfRes = t.Object({
        id: t.String(),
        eid: t.Optional(t.String()),
        description: t.Optional(t.String()),
        type: t.String(),
        brand: t.String(),
        model: t.String(),
        serialNumber: t.Object(t.String()),
        status: t.String(),
    });
    export type ISelfRes = typeof TSelfRes; 

    // A válasz BEÁGYAZOTT séma definíciója
    export const TNestedRes = t.Object({
        id: t.String(),
        eid: t.Optional(t.String()),
        description: t.Optional(t.String()),
        type: t.String(),
        brand: t.String(),
        model: t.String(),
        serialNumber: t.Object(t.String()),
        status: t.String(),
        toolbookItem: t.Array(ToolbookModel.TSelfRes),
        mateData: t.Array(ItemMetaDataModel.TSelfRes),
        docs: t.Array(ItemDocsModel.TSelfRes),
        place: t.Array(ItemPlaceModel.TSelfRes),
        ParentItem: t.Array(StructureMappingModel.TSelfRes),
        ChildItems: t.Array(StructureMappingModel.TSelfRes),
        scrappages: t.Array(StrappageItemModel.TSelfRes),
        inventories: t.Array(InventoryItemModel.TSelfRes),
    });
    export type INestedRes = typeof TNestedRes; 
    export const queryOptions = Prisma.validator<Prisma.ItemDefaultArgs>()({
        include: {
            toolbookItem: true,
            metaData: true,
            docs: true,
            place: true,
            ParentItem: true,
            ChildItems: true,
            scrappages: true,
            inventories: true,
        },
    });
    export type Query = typeof queryOptions;
};