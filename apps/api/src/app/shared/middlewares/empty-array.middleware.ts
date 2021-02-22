import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const emptyArrayMiddleware: FieldMiddleware = async (ctx: MiddlewareContext, next: NextFn) => {
    const value = await next();
    if (!value) {
        return [];
    }
    return value;
};
