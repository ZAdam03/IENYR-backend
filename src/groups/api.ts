import Elysia, { t } from "elysia";
import { rolesRoute } from "../routes/v1/roles";

const apiGroup = new Elysia({
    prefix: '/api',
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
            const bearer = auth.slice(7); // Levágjuk a "Bearer " szót

            // Visszatérünk a kontextussal, amely tartalmazza a bearer változót
            return {
                bearer // A bearer változó hozzáadása a kontextushoz
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
			bearer: t.Optional(
                t.String({
                 //   pattern: '^Bearer .+$'
                })
            )
		})
	})
    //validáció után kiolvassuk a tokent és bearer változóként adjuk a kontextushoz
	.resolve(({ headers, bearer }) => {
        console.log(`a bearer: ${bearer}`);
        
		// return {
		// 	groupIds:
		// }
	})
    .use(rolesRoute)
   
export default apiGroup;