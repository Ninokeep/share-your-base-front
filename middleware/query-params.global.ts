export default defineNuxtRouteMiddleware(async (to, from) => {
  const filterStore = useFilterStore();

  filterStore.initialize;

  return true;
});
