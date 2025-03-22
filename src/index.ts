import { Elysia } from "elysia";
import apiGroup from "./groups/api";

const app = new Elysia()
  app
  .use(apiGroup)
  
  .onError(({ code }) => {
    if (code === 'NOT_FOUND') {
        return 'Route not found :('
    }
  })
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
