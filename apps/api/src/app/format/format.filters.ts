export const FORMAT_FILTERING = (search: string) => [
    {
        name: {
            contains: search,
        },
    },
];
