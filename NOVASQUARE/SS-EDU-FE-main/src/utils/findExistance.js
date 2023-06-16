export const findExistance = (arr, value) => {
  if (arr && arr.length > 0) {
    const foundedItem = arr.find((item) => item === value);
    if (foundedItem) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
