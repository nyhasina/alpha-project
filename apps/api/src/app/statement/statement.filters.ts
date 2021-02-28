export const STATEMENT_FILTERING = (search: string) => [
    {
        name: {
            contains: search,
        },
    },
    {
        content: {
            contains: search,
        },
    },
];
