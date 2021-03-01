export const TOURNAMENT_TYPE_FILTERING = (search: string) => [
    {
        name: {
            contains: search,
        },
    },
];
