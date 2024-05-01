<template>
  <DashboardLayout>
    <h1 class="text-2xl font-bold px-4 py-2">Bases</h1>
    <p class="text-muted-foreground px-4">List of the bases.</p>
    <div class="flex">
      <Search @change="(data) => filterBase(data)" placeholder="Search name" />
      <InputSearchType
        :items="BASE_TYPES"
        placeholder="Select a type"
        :is-rating="false"
        label="Type"
      />
      <InputSearchType
        :items="RATINGS"
        placeholder="Select a rating"
        :is-rating="true"
        label="Rating"
      />
    </div>
    <Separator class="mt-4" />
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]"> Name </TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Cost HQ (Hour)</TableHead>
          <TableHead> Cost metal (Hour) </TableHead>
          <TableHead> Cost wood (Hour) </TableHead>
          <TableHead> Cost stone (Hour) </TableHead>

          <TableHead>Cost HQ </TableHead>
          <TableHead>Cost metal </TableHead>
          <TableHead>Cost wood </TableHead>
          <TableHead>Cost stone </TableHead>
          <TableHead>Rating </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="row in data?.data" v-if="data?.data.length > 0">
          <TableCell> {{ row.name }} </TableCell>
          <TableCell>{{ row.type }}</TableCell>
          <TableCell>{{ row.costHQPerHour }}</TableCell>
          <TableCell>{{ row.costMetalPerHour }} </TableCell>
          <TableCell class="font-medium">
            {{ row.costWoodPerHour }}
          </TableCell>
          <TableCell>{{ row.costStonePerHour }}</TableCell>
          <TableCell>{{ row.costHQ }}</TableCell>
          <TableCell> {{ row.costMetal }} </TableCell>
          <TableCell class="font-medium"> {{ row.costWood }} </TableCell>
          <TableCell>{{ row.costStone }}</TableCell>
          <TableCell>{{ row.rating }}</TableCell>
          <TableCell v-if="userIsAdmin || baseBelongsUser(row)">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" size="sm">
                  <Icon name="tabler:dots"></Icon>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="mr-2">
                <DropdownMenuLabel>
                  <Dialog>
                    <DialogTrigger class="w-full" as-child>
                      <Button
                        size="sm"
                        variant="outline"
                        class="w-full justify-start"
                        ><Icon Remove name="mdi:pen" class="mr-2" />Edit</Button
                      >
                    </DialogTrigger>
                    <EditForm
                      v-bind="row"
                      :id="row.id"
                      :key="row.id"
                      @submit="(e) => updateBase(e)"
                      @update-failed="
                        showToast(
                          'Updated Failed',
                          'Try again please',
                          'destructive'
                        )
                      "
                      @update-successful="showToast('Updated', 'Sucessful')"
                    />
                  </Dialog>
                </DropdownMenuLabel>
                <DropdownMenuLabel>
                  <AlertDialog>
                    <AlertDialogTrigger class="w-full"
                      ><Button
                        variant="destructive"
                        class="w-full justify-start"
                        size="sm"
                      >
                        <Icon name="mdi:trash" class="mr-2" />Remove
                      </Button></AlertDialogTrigger
                    >
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle
                          >Are you absolutely sure?</AlertDialogTitle
                        >
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your database from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <p v-if="data?.data.length === 0" class="text-center mt-4">
      Resultat not found
    </p>

    <Pagination
      v-slot="{ page }"
      class="mt-3 ml-3"
      :total="paginationState.itemCount"
      :sibling-count="paginationState.page"
      show-edges
      :default-page="paginationState.page"
      :items-per-page="paginationState.take"
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst />
        <PaginationPrev />

        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            as-child
          >
            <Button
              class="w-10 h-10 p-0"
              :variant="item.value === page ? 'default' : 'outline'"
              @click="changePage(item.value)"
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext />
        <PaginationLast />
      </PaginationList>
    </Pagination>
    <Toaster />
  </DashboardLayout>
</template>

<script lang="ts" setup>
import type { Base } from "@/types/base";
import type { ResponseApi } from "@/types/response-api";
import { BASE_TYPES } from "@/utils/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DashboardLayout from "@/layouts/dashboardLayout.vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";
import { useToastAction } from "#imports";
import { useUrlSearchParams } from "@vueuse/core";

const { showToast } = useToastAction();
const authStore = useAuthStore();
const config = useRuntimeConfig();
const filterStore = useFilterStore();
const route = useRoute();
const router = useRouter();

const currentPage = ref(1);
const queryParams = ref(route.query.page);

let paginationState = reactive<MetaInformations>({
  page: 1,
  hasNextPage: false,
  hasPreviousPage: false,
  itemCount: 0,
  pageCount: 0,
  take: 0,
});

const { data, pending } = await useAsyncData<ResponseApi<Base>>("bases", () => {
  return $fetch(
    `http://${config.public.backendUrl}:${config.public.backendPort}/${
      config.public.apiPrefix
    }/${config.public.apiVersion}/bases?take=${8}`
  );
});

paginationState = data?.value?.meta;
// filterStore.setRouteParams(paginationState);

watchEffect(() => {
  if (
    route.query.page !== undefined &&
    Number(route.query.page) <= paginationState.pageCount &&
    Number(route.query.page) > 0
  ) {
    router.push({
      path: route.path,
      query: {
        ...route.query,
        page: route.query.page,
      },
    });
    paginationState.page = Number(route.query.page);
  } else {
    router.push({
      path: route.path,
      query: {
        ...route.query,
        page: 1,
      },
    });
    paginationState.page = 1;
  }
});
const responseUserBaseApi = await useAsyncData("userBases", () => {
  return $fetch(
    `http://${config.public.backendUrl}:${config.public.backendPort}/${config.public.apiPrefix}/${config.public.apiVersion}/bases/users/${authStore.user.id}`
  );
});

async function changePage(numberPage: number) {
  currentPage.value = numberPage;
  data.value = await $fetch(
    `http://${config.public.backendUrl}:${config.public.backendPort}/${
      config.public.apiPrefix
    }/${config.public.apiVersion}/bases?take=${8}&page=${currentPage.value}`
  );

  paginationState = data?.value?.meta;
  filterStore.setRouteParams(paginationState);
}
function updateBase(base: Base) {
  data.value?.data.forEach((item, index) => {
    if (item.id === base.id) {
      data.value.data[index] = { ...item, ...base };
    }
  });
}

const baseBelongsUser = ({ id }: number) => {
  if (responseUserBaseApi.data.value) {
    return responseUserBaseApi.data.value[0].bases.some((i) => i.id === id);
  }

  return false;
};

const userIsAdmin = computed(() => {
  return authStore.userIsAdmin;
});

async function filterBase(inputValue: string) {
  if (inputValue !== "") {
    data.value = await $fetch(
      `http://${config.public.backendUrl}:${config.public.backendPort}/${
        config.public.apiPrefix
      }/${config.public.apiVersion}/bases?take=${8}&page=${
        currentPage.value
      }&name=${inputValue}`
    );
    paginationState = data.value?.meta;
  } else {
    data.value = await $fetch(
      `http://${config.public.backendUrl}:${config.public.backendPort}/${
        config.public.apiPrefix
      }/${config.public.apiVersion}/bases?take=${8}&page=${currentPage.value}`
    );
    paginationState = data.value?.meta;
  }
}
</script>

<style scoped></style>
