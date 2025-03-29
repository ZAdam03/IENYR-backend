import Elysia, { t } from "elysia";
import { rolesRoute } from "../routes/v1/roles";
import { rolePermissionRoute } from "../routes/v1/rolesPermission";
import { userController } from "../controllers/UserController";
import { userRoute } from "../routes/v1/user";
import { toolbookRoute } from "../routes/v1/toolbook";

const apiGroup = new Elysia({
    prefix: '/api/v1',
    detail: {
        security: [ { bearerAuth: [] } ]
    }
})
    //ha nincsen headers-ben authorization fejléc elutasítunk [validáció/guard előtt]
    .derive( async ({ headers, error }) => { 
        try {
            const auth = headers.authorization;
            // Ellenőrizzük a formátumot a reguláris kifejezéssel
            const bearerPattern = /^Bearer .+$/;
            if (!auth || !bearerPattern.test(auth)) {
                return error(400, { message: 'Authorization header format is invalid' });
            }
            // Levágjuk a "Bearer " részt és elmentjük a bearer változóba
            const token = auth.slice(7); // Levágjuk a "Bearer " szót

            // Visszatérünk a kontextussal, amely tartalmazza a bearer változót
            return {
                token // A bearer változó hozzáadása a kontextushoz
            };
        } catch (err) {
            return error(400, { message: 'Authorization header is missing' });
        }
        const auth = headers.authorization;
        console.log(headers.authorization);
    })
    //valudáljuk a kérést, hogy formailag megfelel-e a követelményeinknek
    .guard({
		headers: t.Object({
			token: t.Optional(
                t.String({
                 //   pattern: '^Bearer .+$'
                })
            )
		})
	})
    //validáció után kiolvassuk a tokent és bearer változóként adjuk a kontextushoz
    // új terv: csak kiolvassuk a payload-ból a group id-kat. Megkeressük a hozzá tartozó role-t és roles tömböt adunk hozzá a kontextushoz!!
	.resolve(({ headers, token }) => {
        try {
            // verifyMicrosoftToken(token)
            //     .then(payload => console.log("✅ Valid token, payload:", payload))
            //     .catch(err => console.error("❌ Token verification failed:", err.message));

            // const { kid, alg } = jwt.decode(token, { complete: true })?.header as JwtHeader;
            // console.log(`a kid: ${ kid }`);
            // if (!kid) throw new Error("No 'kid' found in token header");
            // const jwksUri = 'https://login.microsoftonline.com/common/discovery/v2.0/keys';
            // const client = new JwksClient({ jwksUri });
            // const key = await client.getSigningKey(kid);

        } catch (error) {
            console.log("valami gebasz van");
            console.log(error);
        }
        const roles = [ "Admin", "User" ];

		return {
			roles
		};
	})
    .use(rolesRoute)
    .use(rolePermissionRoute)
    .use(userRoute)
    .use(toolbookRoute)
   
export default apiGroup;