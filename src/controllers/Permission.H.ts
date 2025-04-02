import { PermissionModel } from '../models/v1/Permission.M';
import { BaseHandler } from './BaseHandler';

export class PermissionHandler extends BaseHandler<
    PermissionModel.IRes, 
    PermissionModel.ICreate, 
    PermissionModel.ICreate, 
    PermissionModel.IRes> {
    constructor() {
        super('permission');
    }
};