import Elysia, { error, t } from "elysia";

interface CrudController<Input, Output> {
    prefix: string;
    tag: string;
    summary?: string;
    description?: string;
    model: any;
    controller: {
        getAll?: () => Promise<Output[]>;
        getOne?: (id: string) => Promise<Output>;
        create?: (body: Input) => Promise<Output>;
        update?: (id: string, body: Input) => Promise<Output>;
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
                    content: {
                        'application/json': {
                            schema: c.model,
                        }
                    }
                },
                404: {
                    description: 'NOT_FOUND',
                    content: {
                        'application/json': {
                            schema: t.Object({
                                errorCode: t.Optional(t.String()),
                                success: t.Optional(t.Boolean()),
                                message: t.String(),
                            })
                        }
                    }
                }
            }
            // /* responses:
            //     "200":
            //         description: OK
            //     "400":
            //         description: Bad request. User ID must be an integer and larger than 0.
            //     "401":
            //         description: Authorization information is missing or invalid.
            //     "404":
            //         description: A user with the specified ID was not found.
            //     "5XX":
            //         description: Unexpected error.
            //  */
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
    
    .get('/', async ({error}) => {
        if (c.controller.getAll) {
            try {
                const result = await c.controller.getAll();
                return result;
            } catch (err) {
                if (err instanceof CustomError) {
                    return error(err.status, { errorCode: err.code, message: err.message });
                } else {
                    console.error('An unexpected error occurred:', err);
                    return error(500, { errorCode: 'INTERNAL_ERROR', message: 'An unexpected error occurred' });
                }
            }
        } else {
            return error(404, { success: false, message: 'Not Found' });
        }
    })
    
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
        if (c.controller.create) {
            try {
                const result = await c.controller.create(body as I);
                if (!result) 
                    return error(400, { 
                        error: 'Something went wrong',
                        success: false, 
                        message: 'Unauthorized'
                    }) 
                return { success: true, result };
            } catch (error) {
                
            }
        } else {
            
        }
    }, {
        body: 'body'
    })
    
    .put('/:id', async ({ params, body }) => {
        if (c.controller.update) {
            try {
                const result = await c.controller.update(params.id, body as I);
                if (!result)
                    return error
            } catch (error) {
                
            }
        } else {
            
        }
    }, {
        params: 'id',
        body: 'body'
    })
    
    .delete('/:id', async ({ params, error }) => {
        if (!c.controller.delete) {
            return error(404, { success: false, message: 'Not Found' });
        }
        return c.controller.delete(params.id);
    }, {
        params: 'id'
    })
};