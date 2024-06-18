const msOfOneDay = 1000 * 60 * 60 * 24;

export const getDateIndex = (date: Date = new Date()) =>
  Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / msOfOneDay,
  );
