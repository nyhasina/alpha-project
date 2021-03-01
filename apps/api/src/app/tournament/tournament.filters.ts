export const TOURNAMENT_FILTERING = (search: string) => [
    {
        name: {
            contains: search,
        },
    },
];
