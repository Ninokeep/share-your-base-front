<template>
  <DashboardLayout>
    <h1 class="text-2xl font-bold px-4 py-2">Bases</h1>
    <p class="text-muted-foreground px-4">List of the bases.</p>
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]"> Invoice </TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead class="text-right"> Amount </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell class="font-medium"> INV001 </TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell class="text-right"> $250.00 </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </DashboardLayout>
</template>

<script lang="ts" setup>
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
</script>

<style scoped></style>
