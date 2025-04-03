import { t } from 'elysia';
import { PermissionModel } from './Permission.M';

/**
 * Szükség van: 
 *  - TCreate típusra - ez a POST kérés sémája;
 *  - TUpdate - ez a PUT kérés sémája;
 *  - TSelfRes - ez megegyezik a prisma modellel.
 * Ha a kiküldött séma bővítve van még más táblákkal, akkor kell:
 *  - TNestedRes - ez a GETone és GETall művelethez szükséges
 * 
 * mindegyikhez kell definiálni egy interface-t is!!
 */
export namespace RoleModel {
    // A beérkező body szerkezet létrehozáskor
    export const TCreate = t.Object({
        name: t.String(),
        description: t.Optional(t.String()),
        azureGroupId: t.String(),
    });
    export type ICreate = typeof TCreate;

    // A beérkező body szerkezet frissítéskor
    export const TUpdate = t.Object({
        name: t.Optional(t.String()),
        description: t.Optional(t.String()),
        azureGroupId: t.Optional(t.String()),
    });
    export type IUpdate = typeof TUpdate;

    // Prisma modellel megegyező séma
    export const TSelfRes = t.Object({
        id: t.String(),
        name: t.String(),
        description: t.Optional(t.String()),
        azureGroupId: t.String()
    });
    export type ISelfRes = typeof TSelfRes; 

    // A válasz BEÁGYAZOTT séma definíciója
    export const TNestedRes = t.Object({
        id: t.String(),
        name: t.String(),
        description: t.Optional(t.String()),
        azureGroupId: t.String(),
        permissions: t.Array(PermissionModel.TRes),
    });
    export type INestedRes = typeof TNestedRes; 
};


// namespace RoleWithPermissions {
    
// }



// export type RoleNestedType = typeof responseSchema;
// const nestedResSchema = Prisma.validator<Prisma.RoleDefaultArgs>()({
//     include: { permissions: true },
// })
// export type RoleWithPermissionsQuery = Prisma.RoleGetPayload<typeof nestedResSchema>;


// export const RoleSchemas = {
//     [`response`]: responseSchema,
//     [`post`]: createSchema,
//     [`put`]: updateSchema,
// };



// // Create the interface
// export type RoleUpdateType = typeof updateSchema.static;
// export type RoleCreateType = typeof createSchema.static;


// // export const IRole = {
// //     Create: {} as RoleCreateType,
// //     Update: {} as RoleUpdateType,
// //     Prisma: {} as Role
// // };

// export { createSchema as roleInputBody, responseSchema as roleResSchema, RoleCreateType as RoleBody }