export const convertToInt = (item: any, fallback = 0): number => {
  const parsedInt = parseInt(item, 10);

  return Number.isNaN(parsedInt) ? fallback : parsedInt;
};
