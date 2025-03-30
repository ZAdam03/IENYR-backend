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
    const app = new Elysia({
        prefix: `${c.prefix}`,
        name: `route-v1${c.prefix}`, // Egyedi név a deduplikációhoz
        seed: c.prefix, // Seed a deduplikációhoz
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
                401: {
                    description: 'Authorization header is missing or invalid.',
                    content: {
                        'application/json': {
                            schema: t.Object({
                                message: t.String(),
                            })
                        }
                    }
                },
                404: {
                    description: 'NOT_FOUND',
                    content: {
                        'application/json': {
                            schema: t.Object({
                                message: t.String(),
                            })
                        }
                    }
                },
                500: {
                    description: 'DATABASE_ERROR',
                    content: {
                        'application/json': {
                            schema: t.Object({
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
        //'body': c.model,
        // response: {
        //     '200': t.Object({
        //     }),
        //     '404': t.Object({
        //     }),
        // }
    })
    
    if (c.controller.getAll) {
        // @ts-ignore
        app.get('/', async ({ error, roles }) => {
            const requiredPermission = `${c.tag}.ReadAll`;
            console.log(roles);
            if (c.controller.getAll) {
                try {
                    return await c.controller.getAll();
                } catch (err) {
                    return error(500, { message: `Database query failed: ${err}` });
                    // if (err instanceof CustomError) {
                    //     return error(err.status, { errorCode: err.code, message: err.message });
                    // } else {
                    //     console.error('An unexpected error occurred:', err);
                    //     return error(500, { errorCode: 'INTERNAL_ERROR', message: 'An unexpected error occurred' });
                    // }
                }
            }
            return error(404, { message: 'Not Found' });
        })
    }

    if (c.controller.getOne) {
        // @ts-ignore
        app.get('/:id', async ({ params, error, roles }) => {
            if (c.controller.getOne) {
                try {
                    return await c.controller.getOne(params.id);
                } catch (err) {
                    return error(500, { message: `Database query failed: ${err}` });
                }
            }
            return error(404, { message: 'Not Found' });
        }, {
            params: 'id'
        })
    }
    
    if (c.controller.create) {
        // @ts-ignore
        app.post('/', async ({ body, error, roles }) => {
            if (c.controller.create) {
                try {
                    return await c.controller.create(body as I);
                } catch (err) {
                    return error(500, { message: `Error in database insertion: ${err}` });
                }
            }
            return error(404, { message: 'Not Found' });
        }, {
            body: c.model
        })
    }
    
    if (c.controller.update) {
        // @ts-ignore
        app.put('/:id', async ({ params, body, roles }) => {
            if (c.controller.update) {
                try {
                    return await c.controller.update(params.id, body as I);
                } catch (err) {
                    return error(500, { message: `Error when updating the database: ${err}` });
                }
            }
            return error(404, { message: 'Not Found' });
        }, {
            params: 'id',
            body: c.model
        })
    }
    
    if (c.controller.delete) {
        // @ts-ignore
        app.delete('/:id', async ({ params, error, roles }) => {
            if (c.controller.delete) {
                try {
                    return c.controller.delete(params.id);
                } catch (err) {
                    return error(500, { message: `Error when deleting from database: ${err}` });
                }
            }
            return error(404, { message: 'Not Found' });
        }, {
            params: 'id'
        })
    }

    return app;
};