import { Toolbook } from '@prisma/client';
import { BaseController } from './BaseController';
import { ToolbookBody } from '../models/v1/toolbook';

class Controller extends BaseController<Toolbook, ToolbookBody, ToolbookBody> {
    constructor() {
        super('Toolbook');
    }
}

export const toolbookController = new Controller();