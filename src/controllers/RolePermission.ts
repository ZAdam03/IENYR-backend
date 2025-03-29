import { RolePermission } from '@prisma/client';
import { BaseController } from './BaseController';
import { RolePermissionBody } from '../models/v1/rolePermissionModel';

class Controller extends BaseController<RolePermission, RolePermissionBody, RolePermissionBody> {
    constructor() {
        super('RolePermission');
    }
}

export const rolePermissionController = new Controller();