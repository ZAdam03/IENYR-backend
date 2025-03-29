import { Toolbook } from "@prisma/client";
import { ToolbookBody, toolbookInputBody } from "../../models/v1/toolbook";
import { createRoutes } from "./crudRoutes";
import { toolbookController } from "../../controllers/ToolbookController";

//routes/v1/role.ts

export const toolbookRoute = createRoutes<ToolbookBody, Toolbook>({
    prefix: '/toolbook',
    tag: 'Toolbook',
    summary: 'Szerszámkönyvek',
    description: 'A szerszámkönyvek, ezek tartalmazzák a felhasználókhoz rendelt eszközöket.',
    model: toolbookInputBody,
    controller: {
        getAll: toolbookController.getAll.bind(toolbookController),
        getOne: toolbookController.getOne.bind(toolbookController),
        update: toolbookController.update.bind(toolbookController),
        create: toolbookController.create.bind(toolbookController),
    },
});