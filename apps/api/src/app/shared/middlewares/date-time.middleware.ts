import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const dateTimeConverterMiddleware: FieldMiddleware = async (ctx: MiddlewareContext, nextFn: NextFn) => {
    const value = await nextFn();
    const parsedDate = new Date(value).toISOString().split('T')[0];
    return parsedDate;
};
