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
        const auth = headers['bearer']

        if(!auth) return error(400)
    })
    //valudáljuk a kérést, hogy formailag megfelel-e a követelményeinknek
    .guard({
		headers: t.Object({
			bearer: t.String({
				pattern: '^Bearer .+$'
			})
		})
	})
    //validáció után kiolvassuk a tokent és bearer változóként adjuk a kontextushoz
	.resolve(({ headers }) => {
		return {
			bearer: headers.bearer.slice(7)
		}
	})
    .use(rolesRoute)
   
export default apiGroup;