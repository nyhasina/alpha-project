export const MATCH_FILTERING = (search: string) => [
    {
        name: {
            contains: search,
        },
    },
];
