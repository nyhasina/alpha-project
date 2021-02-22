export const TAG_FILTERING = (search: string) => [
    {
        name: {
            contains: search,
        },
    },
];
