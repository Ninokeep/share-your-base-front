<script lang="ts" setup>
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as yup from "yup";

const props = defineProps<{
  baseName: string;
  type: string;
}>();

const formSchema = toTypedSchema(
  yup.object({
    name: yup.string().default(props.baseName),
    type: yup.string().min(8),
  })
);

const {
  handleSubmit,
  isSubmitting,
  resetForm,
  values,
  isFieldDirty,
  errors,
  isFieldValid,
} = useForm({
  validationSchema: formSchema,
});

const baseName = ref(props.baseName);
console.log(baseName.value);
</script>

<template>
  <DialogContent class="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit the base</DialogTitle>
      <DialogDescription>
        Make changes to your base here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <form class="flex flex-col gap-4 py-4">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem class="gap-4 flex items-center">
          <FormLabel class="text-sm font-medium text-end flex-1"
            >Name
          </FormLabel>
          <div class="flex flex-col flex-2">
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="type">
        <FormItem class="flex gap-4 items-center">
          <FormLabel class="text-sm font-medium text-end flex-1"
            >Type
          </FormLabel>
          <div class="flex flex-col flex-2">
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
    </form>
    <DialogFooter> Save changes </DialogFooter>
  </DialogContent>
</template>
