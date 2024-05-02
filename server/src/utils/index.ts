export const utils = {
  not_null_undef_empty: (data: any): boolean => {
    if (data !== undefined && data !== null && data !== "") {
      return true;
    } else {
      return false;
    }
  },
};
