import Elysia from "elysia";
import { rolesRoute } from "../routes/v1/roles";

const apiGroup = new Elysia({
    prefix: '/api',
    detail: {
        security: [ { bearerAuth: [] } ]
    }
})
    .use(rolesRoute)
   
export default apiGroup;