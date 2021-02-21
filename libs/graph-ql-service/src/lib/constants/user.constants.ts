import { User } from '../interfaces/user.interface';

export const EMPTY_USER: User = {
    id: null,
    email: null,
    password: null,
    profile: {
        id: null,
        currency: {
            id: null,
            code: null,
            label: null,
        },
        language: {
            id: null,
            code: null,
            label: null,
        },
        username: null,
        firstname: null,
        lastname: null,
    },
};
