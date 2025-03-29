import { t } from 'elysia'

const InputBody = t.Object({
    email: t.String(),
    name: t.String(),
});

type Body = typeof InputBody.static;

export { InputBody as userInputBody, Body as UserBody }