<template>
  <DashboardLayout>
    <h1 class="text-2xl font-bold px-4 py-2">Bases</h1>
    <p class="text-muted-foreground px-4">List of the bases.</p>
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
        <TableRow v-for="row in data?.data">
          <TableCell class="font-medium"> {{ row.name }} </TableCell>
          <TableCell>{{ row.type }}</TableCell>
          <TableCell>{{ row.costHQPerHour }}</TableCell>
          <TableCell>{{ row.costMetalPerHour }} </TableCell>
          <TableCell class="font-medium"> {{ row.costWoodPerHour }} </TableCell>
          <TableCell>{{ row.costStonePerHour }}</TableCell>
          <TableCell>{{ row.costHQ }}</TableCell>
          <TableCell> {{ row.costMetal }} </TableCell>
          <TableCell class="font-medium"> {{ row.costWood }} </TableCell>
          <TableCell>{{ row.costStone }}</TableCell>
          <TableCell>{{ row.rating }}</TableCell>
        </TableRow>
      </TableBody>
      <Pagination
        v-slot="{ page }"
        class="mt-3 ml-3"
        :total="data?.meta?.itemCount"
        :sibling-count="1"
        show-edges
        :default-page="1"
        :items-per-page="data?.meta?.take"
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
    </Table>
  </DashboardLayout>
</template>

<script lang="ts" setup>
interface Bases {
  id: number;

  costWood: number;

  costStone: number;

  costMetal: number;

  costHQ: number;
  costWoodPerHour: number;

  costStonePerHour: number;

  costMetalPerHour: number;

  costHQPerHour: number;

  type: string;

  name: string;

  rating: number;
}

interface ResponseAPI {
  data: Bases[];
  meta: MetaInformations;
}

interface MetaInformations {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
import DashboardLayout from "@/layouts/dashboardLayout.vue";
import {
  Table,
  TableBody,
  TableCaption,
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

const currentPage = ref(1);

const { data } = await useAsyncData<ResponseAPI>("bases", () => {
  return $fetch(`http://localhost:8888/api/v1/bases?take=${10}`);
});

async function changePage(numberPage: number) {
  currentPage.value = numberPage;
  data.value = await $fetch(
    `http://localhost:8888/api/v1/bases?take=${10}&page=${currentPage.value}`
  );
}
</script>

<style scoped></style>
