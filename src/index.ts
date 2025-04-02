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
            security: [
                {
                    bearerAuth: []
                }
            ],
            tags: [
                { name: 'Role', description: 'Szerepkörök' },
                { name: 'RolePermisison', description: 'Szerepkörök jogosultságokhoz kapcsolva' }, //rolesWithPermissions
                { name: 'User', description: 'Felhasználók' },
                { name: 'Toolbook', description: 'Szerszámkönyvek' },
                { name: 'ToolbookDocs', description: 'Szerszámkönyv dokumentumok' },
                { name: 'Item', description: 'Eszközök' },
                { name: 'ItemDocs', description: 'Eszköz dokumentumok' },
                { name: 'LicenceKey', description: 'Licenc kulcsok' },
                { name: 'ItemPlace', description: 'Eszköz helyek' },
                { name: 'Cart', description: 'Kosár' },
                { name: 'View', description: 'Nézetek' },
                { name: 'Companie', description: 'Vállaltok' },
                { name: 'Site', description: 'Telephelyek' },
                { name: 'Building', description: 'Épületek' },
                { name: 'Floor', description: 'Egy épület szintjei' },
                { name: 'Room', description: 'Szobák egy épületben és szinten' },
                { name: 'Cabinet', description: 'Szekrények a szobában' },
                { name: 'FloorBlueprint', description: 'A szintek SVG eléréséhez' },
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
