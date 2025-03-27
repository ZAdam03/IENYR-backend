import { BaseController } from './BaseController';
import { Role, Prisma } from '@prisma/client';
import { RoleBody } from '../models/roleModel';

class RoleController extends BaseController<Role, RoleBody, RoleBody> {
    constructor() {
        super('Role');
    }
}

export const roleController = new RoleController();