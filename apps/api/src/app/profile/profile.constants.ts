import { CODE_LABEL_FILTERING } from '../shared/shared.constants';

export const PROFILE_FILTERING = (search: string) => [
  {
    firstname: {
      contains: search
    }
  },
  {
    lastname: {
      contains: search
    }
  },
  {
    username: {
      contains: search
    }
  },
  {
    username: {
      contains: search
    }
  },
  {
    language: {
      OR: [...CODE_LABEL_FILTERING(search)]
    }
  },
  {
    currency: {
      OR: [...CODE_LABEL_FILTERING(search)]
    }
  }
];
