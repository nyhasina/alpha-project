import { TEAM_FILTERING } from '../team/team.filters';
import { USER_FILTERING } from '../user/user.filters';

export const INVITATION_FILTERING = (search: string) => [
    {
        sender: {
            OR: [...USER_FILTERING(search)],
        },
        receiver: {
            OR: [...USER_FILTERING(search)],
        },
        team: {
            OR: [...TEAM_FILTERING(search)],
        },
        date: {
            in: search,
        },
        status: {
            contains: search,
        },
    },
];
