import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import DropdownAction from "@/components/tableData/table-data-dropdown.vue";

export const generateColumns = (
  arrayOfKeys: string[],
  ommitProperties: string[]
) => {
  const columnHeader = arrayOfKeys
    .map((key: string) => {
      return {
        accessorKey: key,
        header: () => h("div", { class: "text-right" }, key.toLowerCase()),
        cell: ({ row }) => {
          return h(
            "div",
            { class: "text-right font-medium" },
            row.getValue(key)
          );
        },
      };
    })
    .filter((data) => !ommitProperties.includes(data.accessorKey));

  const actions = {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      return h(
        "div",
        { class: "relative" },
        h(DropdownAction, {
          payment,
        })
      );
    },
  };

  return [...columnHeader, ...[actions]];
};
