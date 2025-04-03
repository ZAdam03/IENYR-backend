import { ToolbookModel } from "../../models/v1/Toolbook.M";
import { createRoutes } from "./crudRoutes";
import { BaseHandler } from "../../handlers/BaseHandler";

//routes/v1/role.ts

const handler = new BaseHandler<
    ToolbookModel.INestedRes, 
    ToolbookModel.ICreate, 
    ToolbookModel.IUpdate, 
    ToolbookModel.ISelfRes 
    >('toolbook');

export const toolbookRouter = createRoutes<
    ToolbookModel.INestedRes, 
    ToolbookModel.ICreate, 
    ToolbookModel.IUpdate, 
    ToolbookModel.ISelfRes, 
    ToolbookModel.Query>({
    prefix: '/toolbook',
    tag: 'Toolbook',
    summary: 'Szerszámkönyvek',
    description: 'A szerszámkönyvek, ezek tartalmazzák a felhasználókhoz rendelt eszközöket.',
    response:  ToolbookModel.TNestedRes,
    createReq: ToolbookModel.TCreate,
    updateReq: ToolbookModel.TUpdate,
    controller: {
        getAll: handler.getAll.bind(handler),
        getOne: handler.getOne.bind(handler),
        create: handler.create.bind(handler),
        update: handler.update.bind(handler),
        //delete: handler.delete.bind(handler),
    },
    options: ToolbookModel.queryOptions,
});