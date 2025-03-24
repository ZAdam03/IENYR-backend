import Elysia from "elysia";

const devGroup = new Elysia({
    prefix: '/dev',
    detail: {
        tags: ['dev'],
        security: [ { bearerAuth: [] } ]
    }
})


console.log('Swagger is running at /dev/swagger');
export default devGroup;