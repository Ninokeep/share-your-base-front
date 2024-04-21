<template>
  <DashboardLayout>
    <h1 class="text-2xl font-bold px-4 py-2">Users</h1>
    <p class="text-muted-foreground px-4">List of the users.</p>
    <Separator class="mt-4" />

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[200px]"> Email </TableHead>
          <TableHead>Username</TableHead>
          <TableHead>DraftBase</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status Account</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="row in data">
          <TableCell> {{ row.email }} </TableCell>
          <TableCell class="font-medium"> {{ row.username }} </TableCell>
          <TableCell>{{ row.draftBase }}</TableCell>
          <TableCell>{{ row.role }}</TableCell>
          <TableCell>{{ row.disabled }}</TableCell>
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
                      @update-failed="updateFailed"
                      @update-successful="updateSucessful"
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
    <Toaster />
  </DashboardLayout>
</template>

<script lang="ts" setup>
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
import { computed } from "vue";

const authStore = useAuthStore();
const { toast } = useToast();
const config = useRuntimeConfig();

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
</script>

<style scoped></style>
