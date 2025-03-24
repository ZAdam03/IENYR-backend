console.log("🟢 Szerver indítása...");
import { Elysia } from "elysia";
import apiGroup from "./groups/api";
import devGroup from "./groups/dev";
import { swagger } from '@elysiajs/swagger';
import { rolesRoute } from "./routes/v1/roles";

//const setup = (app: Elysia) => app.decorate("db", new PrismaClient());

console.log(rolesRoute instanceof Elysia); // true-nak kell lennie

const app = new Elysia()
    app
    //.use(setup)
    .use(apiGroup)
    .use(devGroup)
    

    .use(swagger({
        path: '/dev/swagger',
        documentation: {
            info: {
                title: 'IENYR API dokumentáció',
                version: '1.0.0',
                description: 'Informatikai eszköz nyilvántatási rendszer back-end API dokumentációja. Technológiák: Bun + Elysia + Prisma',
                //termsOfService
                contact: {
                    name: "Zámbó Ádám",
                    //url:
                    //email:
                },
                license: {
                    name: "MIT",
                    //url:
                }
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT'
                    }
                }
            },
            tags: [
                { name: 'Roles', description: 'Szerepkörök' },
                { name: 'Permissions', description: 'Jogosultságok' },
                { name: 'Users', description: 'Felhasználók' },
                { name: 'Toolbooks', description: 'Szerszámkönyvek' },
                { name: 'ToolbookDocs', description: 'Szerszámkönyv dokumentumok' },
                { name: 'Items', description: 'Eszközök' },
                { name: 'ItemDocs', description: 'Eszköz dokumentumok' },
                { name: 'LicenceKeys', description: 'Licenc kulcsok' },
                { name: 'ItemPlaces', description: 'Eszköz helyek' },
                { name: 'Cart', description: 'Kosár' },
                { name: 'View', description: 'Nézetek' },
                { name: 'Companies', description: 'Vállaltok' },
                { name: 'Sites', description: 'Telephelyek' },
                { name: 'Buildings', description: 'Épületek' },
                { name: 'Floors', description: 'Egy épület szintjei' },
                { name: 'Rooms', description: 'Szobák egy épületben és szinten' },
                { name: 'Cabinets', description: 'Szekrények a szobában' },
                { name: 'FloorBlueprints', description: 'A szintek SVG eléréséhez' },
                { name: 'SearchPlace', description: 'Hely keresése egyedi UUID alapján' }
            ]
        }
    }))
  
    .onError(({ error, code }) => {
        if (code === 'NOT_FOUND') return 'Not Found :('

        console.error(error)
    })
    .listen(process.env.PORT || 3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
