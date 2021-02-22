import { USER_FILTERING } from '../user/user.filters';

export const TEAM_FILTERING = (search: string) => [
    {
        name: {
            contains: search,
        },
    },
    {
        tag: {
            contains: search,
        },
    },
    {
        owner: {
            OR: [...USER_FILTERING(search)],
        },
    },
];
