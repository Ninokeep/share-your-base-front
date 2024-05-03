export const pickProperties = (obj: Object, arr: string[]) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([k]) => arr.includes(k))
  );
};
