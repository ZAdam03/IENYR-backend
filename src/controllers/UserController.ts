import { User } from '@prisma/client';
import { BaseController } from './BaseController';
import { UserBody } from '../models/v1/userModel';

class Controller extends BaseController<User, UserBody, UserBody> {
    constructor() {
        super('User');
    }
}

export const userController = new Controller();