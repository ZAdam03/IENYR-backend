import Elysia, { t } from "elysia";

interface CrudController<Input, Output> {
    prefix: string;
    tag: string;
    summary?: string;
    description?: string;
    model: any;
    controller: {
        getAll: () => Promise<Output[]>;
        getOne?: (id: string) => Promise<Output | null>; //nem lehet null
        create: (body: Input) => Promise<Output>;
        update: (id: string, body: Input) => Promise<Output>;
        delete?: (id: string) => Promise<Output>;
    }
};

//ha a modellhez nem kell az egyik route, le kell kezelni, hogy ne csatolódjon fel!!!
export const createRoutes = <I,O>(c: CrudController<I,O>) => {
    return new Elysia({
        prefix: `/v1${c.prefix}`,
        name: `route-v1${c.tag}`, // Egyedi név a deduplikációhoz
        seed: c.tag, // Seed a deduplikációhoz
        detail: {
            tags: [c.tag],
            summary: c.summary,
            description: c.description,
            //requestBody: config.model,
            security: [ { bearerAuth: [] } ],
            responses: {
                200: {
                    description: 'OK',
                    headers: {
                    }
                }
            }
            /* responses:
                "200":
                    description: OK
                "400":
                    description: Bad request. User ID must be an integer and larger than 0.
                "401":
                    description: Authorization information is missing or invalid.
                "404":
                    description: A user with the specified ID was not found.
                "5XX":
                    description: Unexpected error.
             */
        }
    })
    .model({
        'id': t.Object({
            id: t.String()
        }),
        'body': c.model,
        // response: {
        //     '200': t.Object({
        //     }),
        //     '404': t.Object({
        //     }),
        // }
    })
    
    .get('/', async () => c.controller.getAll())
    
    .get('/:id', async ({ params, error }) => {
        if (!c.controller.getOne) {
            return error(404, { success: false, message: 'Not Found' });
        }
        console.log("úgy tűnik mégis van");
        return c.controller.getOne(params.id);
    }, {
        params: 'id'
    })
    
    .post('/', async ({ body, error }) => {
        try {
            const result = c.controller.create(body as I)
            if (!result) 
                return error(400, { 
                    error: 'Something went wrong',
                    success: false, 
                    message: 'Unauthorized'
                }) 
            return { success: true, result };
        } catch (error) {
            
        }
    }, {
        body: 'body'
    })
    
    .put('/:id', async ({ params, body }) => c.controller.update(params.id, body as I), {
        params: 'id',
        body: 'body'
    })
    
    .delete('/:id', async ({ params, error }) => {
        if (!c.controller.delete) {
            return error(404, { success: false, message: 'Not Found' });
        }
        console.log("úgy tűnik mégis van");
        return c.controller.delete(params.id);
    }, {
        params: 'id'
    })
};