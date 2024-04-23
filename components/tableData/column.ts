import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "amount",
    header: () => h("div", { class: "text-right" }, "Amount"),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return h("div", { class: "text-right font-medium" }, formatted);
    },
  },
  {
    accessorKey: "id",
    header: () => h("div", { class: "text-right" }, "Id"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, row.getValue("id"));
    },
  },
];

export const generateColumns = (
  arrayOfKeys: string[],
  ommitProperties: string[]
) => {
  return arrayOfKeys
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
};
