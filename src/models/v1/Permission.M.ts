import { t } from "elysia";

export namespace PermissionModel {
    export const TRes = t.Object({
        id: t.String(),
        roleId: t.String(),
        permissionName: t.String(),
    });
    export type IRes = typeof TRes;

    export const TCreate = t.Object({
        roleId: t.String(),
        permissionName: t.String(),
    });
    export type ICreate = typeof TCreate;
};