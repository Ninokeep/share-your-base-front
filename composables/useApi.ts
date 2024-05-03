export async function useFetchBase(page?: number, queryParams?: QueryParams) {
  const route = useRoute();

  const url = `http://localhost:8888/api/v1${route.fullPath}`;

  return await $fetch(url, { method: "GET" });
}
