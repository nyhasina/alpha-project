import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const emptyObjectMiddleware: FieldMiddleware = async (ctx: MiddlewareContext, next: NextFn) => {
    const value = await next();
    if (!value) {
        return {};
    }
    return value;
};
