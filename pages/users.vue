<template>
  <DashboardLayout>
    <h1 class="text-2xl font-bold px-4 py-2">Users</h1>
    <p class="text-muted-foreground px-4">List of the users.</p>
    <Separator class="mt-4" />
    <TableData
      :columns="generateColumns(getUserColumnHeader, ['bases', 'password'])"
      :data="dataTable"
    />
  </DashboardLayout>
</template>

<script lang="ts" setup>
import { generateColumns } from "@/components/tableData/column";

interface Users {
  id: number;

  email: string;

  username: string;

  draftBase: number;

  role: string;

  disabled: boolean;
}

interface ResponseAPI {
  data: Users[];
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
import { useToast } from "@/components/ui/toast/use-toast";
import { ToastAction, Toaster } from "@/components/ui/toast";
import { computed, ref } from "vue";
import TableData from "../components/tableData/table-data.vue";

const dataTable = ref<any[]>([]);
const config = useRuntimeConfig();

// async function getData() {
//   const response = await $fetch(
//     `http://${config.public.backendUrl}:${config.public.backendPort}/${config.public.apiPrefix}/${config.public.apiVersion}/users`
//   );
//   return response;
// }

const dataUser = await useFetch(
  `http://${config.public.backendUrl}:${config.public.backendPort}/${config.public.apiPrefix}/${config.public.apiVersion}/users`
);

dataTable.value = dataUser.data.value;

const authStore = useAuthStore();
const { toast } = useToast();

const currentPage = ref(1);
const updateSucessful = () => {
  return toast({
    title: "Update data !",
    description: "sucessful",
    action: h(
      ToastAction,
      {
        altText: "Ok",
      },
      {
        default: () => "Ok",
      }
    ),
  });
};

const updateFailed = () => {
  return toast({
    title: "Update failed !",
    description: "Retry please",
    variant: "destructive",
    action: h(
      ToastAction,
      {
        altText: "Try again",
      },
      {
        default: () => "Try again",
      }
    ),
  });
};
const { data, pending } = await useAsyncData<ResponseAPI>("users", () => {
  return $fetch(
    `http://${config.public.backendUrl}:${config.public.backendPort}/${config.public.apiPrefix}/${config.public.apiVersion}/users`
  );
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
}
function updateBase(base: Bases) {
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
  return authStore.user.role === "admin" ? true : false;
});

const getUserColumnHeader = computed(() =>
  Object.keys(dataTable.value[0] ?? ["id"])
);
</script>

<style scoped></style>
