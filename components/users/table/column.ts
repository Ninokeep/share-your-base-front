import type { ColumnDef } from "@tanstack/vue-table";
import { User } from "./type-users";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: () => h("div", { class: "text-right" }, "Id"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, row.getValue("id"));
    },
  },
];
