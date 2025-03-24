import Elysia from "elysia";
import { t } from "elysia";

console.log('I előtt');
interface RouteConfig<Input, Output> { //más a bejövő és kimenő adat
    prefix: string;
    tag: string;
    summary: string;
    description: string;
    model: any;
    controller: {
        getAll: () => Promise<Output[]>;
        getOne: (id: string) => Promise<Output | null>;
        create: (body: Input) => Promise<Output>;
        update: (id: string, body: Input) => Promise<Output>;
        delete: (id: string) => Promise<Output>;
    }
};

export const createRoutes = <I,O>(c: RouteConfig<I,O>) => {
    console.log("bent vagyunk");
    return new Elysia({
        prefix: `/v1${c.prefix}`,
        name: `route-v1${c.tag}`, // Egyedi név a deduplikációhoz
        seed: c.tag, // Seed a deduplikációhoz
        detail: {
            tags: [c.tag],
            summary: c.summary,
            description: c.description,
            //consumes:
            //requestBody: config.model,
            
            security: [ { bearerAuth: [] } ]
        }
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
    .model({
        'id': t.Object({
            id: t.String()
        }),
        'body': c.model
    })
    
    .get('/', async () => c.controller.getAll())
    
    .get('/:id', async ({ params }) => c.controller.getOne(params.id), {
        params: 'id'
    })
    
    .post('/', async ({ body }) => {
        try {
            const result = c.controller.create(body as I)
            return result;
        } catch (error) {
            
        }
    }, {
        body: 'body'
    })
    
    .put('/:id', async ({ params, body }) => c.controller.update(params.id, body as I), {
        params: 'id',
        body: 'body'
    })
    
    .delete('/:id', async ({ params }) => c.controller.delete(params.id), {
        params: 'id'
    })
};