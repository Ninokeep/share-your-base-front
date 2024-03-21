<template>
  <DashboardLayout>
    <h1 class="text-2xl font-bold px-4 py-2">Bases</h1>
    <p class="text-muted-foreground px-4">List of the bases.</p>
    <Separator class="mt-4" />
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
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
        <TableRow v-for="row in data">
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

const bases = reactive([]);

const { data, pending, error, refresh } = await useAsyncData<Bases[]>(
  "bases",
  () => {
    return $fetch("http://localhost:8888/api/v1/bases/");
  }
);
</script>

<style scoped></style>
