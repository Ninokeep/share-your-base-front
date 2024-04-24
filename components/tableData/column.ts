import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import DropdownAction from "@/components/tableData/table-data-dropdown.vue";
import { ArrowUpDown, ChevronDown } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

export const generateColumns = (
  arrayOfKeys: string[],
  ommitProperties: string[],
  data: any
) => {
  const columnHeader = arrayOfKeys
    .map((key: string, index: number, row: string[]) => {
      return {
        accessorKey: key,
        header: ({ column }: { column: any }) => {
          return h(
            Button,
            {
              variant: "ghost",
              onClick: () =>
                column.toggleSorting(column.getIsSorted() === "asc"),
            },
            () => [key, h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
          );
        },
        cell: ({ row }: { row: any }) => {
          return h("div", { class: " font-medium" }, row.getValue(key));
        },
      };
    })
    .filter((data) => !ommitProperties.includes(data.accessorKey));

  console.log(columnHeader);
  return columnHeader;
};
