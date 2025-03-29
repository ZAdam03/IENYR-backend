import { t } from 'elysia'

const InputBody = t.Object({
    cartId: t.String(),
    itemId: t.String(),
});

type Body = typeof InputBody.static;

export { InputBody as cartItemInputBody, Body as CartItemBody }