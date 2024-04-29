import type { QueryParams } from "@/types/query-params";
import type { Pagination } from "@/types/pagination";

export const useFilterStore = defineStore("filters", () => {
  const currentRoute = ref("");
  const queryParams = reactive({});

  const page = ref(1);
  const hasNextPage = ref(false);
  const hasPreviousPage = ref(false);
  const itemCount = ref(0);
  const pageCount = ref(0);
  const take = ref(0);
  const query = ref("");
  const router = useRouter();
  const route = useRoute();

  const getQueryParams = () => {
    //after we need to make a filter for other params

    const query = {
      page: page.value,
      hasNextPage: hasNextPage.value,
      hasPreviousPage: hasPreviousPage.value,
      itemCount: itemCount.value,
      pageCount: pageCount.value,
      take: take.value,
    };

    return query;
  };
  const getQuery = () => {
    return currentRoute;
  };

  function setPage(value: number) {
    page.value = value;
  }
  const initialize = () => {
    const route = useRoute();
    currentRoute.value = route.path;
    console.log(currentRoute);
  };
  const setRouteParams = (
    meta: MetaInformations,
    queryParams?: QueryParams
  ) => {
    page.value = meta.page;
    hasNextPage.value = meta.hasNextPage;
    hasPreviousPage.value = meta.hasPreviousPage;
    itemCount.value = meta.itemCount;
    pageCount.value = meta.pageCount;
    take.value = meta.take;
    if (queryParams) {
      console.log(Object.keys(queryParams));
    }
    router.push({
      path: route.path,
      query: {
        ...route.query,
        page: page.value,
      },
    });
  };
  const initializePagination = () => {
    page.value = 0;
    hasNextPage.value = false;
    hasPreviousPage.value = false;
    itemCount.value = 0;
    pageCount.value = 0;
    take.value = 0;
  };

  function getPage() {
    return page;
  }

  return {
    query,
    page,
    hasNextPage,
    hasPreviousPage,
    itemCount,
    pageCount,
    take,
    getPage,
    setPage,
    initialize,
    setRouteParams,
  };
});
