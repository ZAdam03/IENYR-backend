import { BaseController } from './BaseController';
import { Role } from '@prisma/client';
import { RoleBody } from '../models/v1/roleModel';

class Controller extends BaseController<Role, RoleBody, RoleBody> {
    constructor() {
        super('Role');
    }
}

export const roleController = new Controller();