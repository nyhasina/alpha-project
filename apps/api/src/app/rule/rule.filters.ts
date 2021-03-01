export const RULE_FILTERING = (search: string) => [
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
