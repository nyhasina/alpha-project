import { PROFILE_FILTERING } from '../profile/profile.constants';

export const USER_FILTERING = (search: string) => [
  {
    email: {
      contains: search
    }
  },
  {
    profile: {
      OR: PROFILE_FILTERING(search)
    }
  }
];
