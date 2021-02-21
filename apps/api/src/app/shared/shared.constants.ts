export const CODE_LABEL_FILTERING = (search: string) => [
  {
    code: {
      contains: search
    }
  },
  {
    label: {
      contains: search
    }
  }
];
