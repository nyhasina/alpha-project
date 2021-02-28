export const TOURNAMENT_REWARD_FILTERING = (search: string) => [
    {
        name: {
            contains: search,
        },
    },
];
