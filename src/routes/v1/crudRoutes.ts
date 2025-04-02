import Elysia, { error, t } from "elysia";

interface CrudControllerBase<NestedRes, CreateInput, UpdateInput, SelfRes, Query> {
    prefix: string;
    tag: string;
    summary?: string;
    description?: string;
    response: NestedRes; //sima Prisma model
    createReq?: CreateInput;
    updateReq?: UpdateInput;
    options?: Query;
    controller: {
        getAll?: (options?: Query) => Promise<NestedRes[]>;
        getOne?: (id: string, options?: Query, ) => Promise<NestedRes>;
        create?: (body: CreateInput) => Promise<SelfRes>;
        update?: (id: string, body: UpdateInput) => Promise<SelfRes>;
        delete?: (id: string) => Promise<SelfRes>;
    }
};

// interface - a controller és a Res/Req közötti kapcsolat kialakításáért kell
type CrudController<T, C, U, S, Q = any> = CrudControllerBase<T, C, U, S, Q> &
    // @ts-ignore
    (Required<Pick<CrudControllerBase<T, C, U, S, Q>, 'create'>> extends { controller: { create: unknown } } 
        ? { createReq: C }
        : {}) &
    // @ts-ignore
    (Required<Pick<CrudControllerBase<T, C, U, S, Q>, 'update'>> extends { controller: { update: unknown } } 
        ? { updateReq: U }
        : {});

//ha a modellhez nem kell az egyik route, le kell kezelni, hogy ne csatolódjon fel!!!
export const createRoutes = <T, C, U, S, Q>(c: CrudController<T, C, U, S, Q>) => {
    const app = new Elysia({
        prefix: `${c.prefix}`,
        name: `route-v1${c.prefix}`, // Egyedi név a deduplikációhoz
        seed: c.prefix, // Seed a deduplikációhoz
        detail: {
            tags: [c.tag],
            summary: c.summary,
            description: c.description,
            security: [ { bearerAuth: [] } ],
            responses: {
                200: {
                    description: 'OK',
                    content: {
                        'application/json': {
                            //@ts-ignore
                            schema: c.response,
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
        }
    })
    .model({
        'id': t.Object({
            id: t.String()
        })
    })
    
    if (c.controller.getAll) {
        // @ts-ignore
        app.get('/', async ({ error, roles }) => {
            const requiredPermission = `${c.tag}.ReadAll`;
            console.log(roles);
            const options = {
                permissions: true,
              };
            if (c.controller.getAll) {
                try {
                    return await c.controller.getAll(c.options);
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
                    return await c.controller.getOne(params.id, c.options);
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
                    type Body = typeof c.createReq;
                    return await c.controller.create(body as C);
                } catch (err) {
                    return error(500, { message: `Error in database insertion: ${err}` });
                }
            }
            return error(404, { message: 'Not Found' });
        }, {
            //@ts-ignore
            body: c.createReq, detail: { requestBody: c.createReq }
        })
    }
    
    if (c.controller.update) {
        // @ts-ignore
        app.put('/:id', async ({ params, body, roles }) => {
            if (c.controller.update) {
                try {
                    type Body = typeof c.updateReq;
                    return await c.controller.update(params.id, body as U);
                } catch (err) {
                    return error(500, { message: `Error when updating the database: ${err}` });
                }
            }
            return error(404, { message: 'Not Found' });
        }, {
            params: 'id',
            //@ts-ignore
            body: c.updateReq,
            detail: {
                //@ts-ignore
                requestBody: c.updateReq //?????? ez kell?
            }
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