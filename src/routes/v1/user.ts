import { createRoutes } from "./crudRoutes";
import { User } from '@prisma/client';
import { UserBody, userInputBody } from "../../models/v1/userModel";
import { userController } from "../../controllers/UserController";

//user/v1/user.ts

export const userRoute = createRoutes<UserBody, User>({
    prefix: '/user',
    tag: 'User',
    summary: 'Felhasználók',
    description: 'A felhasználók. A megadott mezők létrehozhatók az adminisztrátor által, ha a felhasználó belép az alkalmazás frissíti az adatokat, --> ezért nagyon fontos, hogy pontosan töltsük ki az email-cím mezőt, mert ez alapján azonosítja az Azure-os felhasználók közül.',
    model: userInputBody,
    controller: {
        getAll: userController.getAll.bind(userController),
        getOne: userController.getOne.bind(userController),
        create: userController.create.bind(userController),
        update: userController.update.bind(userController),
    },
});