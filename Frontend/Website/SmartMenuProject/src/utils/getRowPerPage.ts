export const getOptions = (total: number): number[] => {
  if (total > 50) return [5, 10, 20, 50, 100];
  if (total > 20) return [5, 10, 20, 50];
  if (total > 10) return [5, 10, 20];
  if (total > 5) return [5, 10];
  return [5];
};

export const getBrandOptions = (total: number): number[] => {
  if (total > 50) return [6, 10, 20, 50, 100];
  if (total > 20) return [6, 10, 20, 50];
  if (total > 10) return [6, 10, 20];
  if (total > 6) return [6, 10];
  return [6];
};
