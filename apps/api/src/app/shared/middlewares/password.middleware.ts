import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const passwordMiddleware: FieldMiddleware = async (ctx: MiddlewareContext, next: NextFn) => {
    const value = await next();
    return '';
};
