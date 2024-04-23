<script setup lang="ts">
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

defineProps<{
  payment: {
    id: string;
  };
}>();
</script>

<template>
  <ClientOnly>
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
              <Button size="sm" variant="outline" class="w-full justify-start"
                ><Icon Remove name="mdi:pen" class="mr-2" />Edit</Button
              >
            </DialogTrigger>
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
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your database from our servers.
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
  </ClientOnly>
</template>
