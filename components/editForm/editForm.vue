<script lang="ts" setup>
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as yup from "yup";

const props = defineProps<{
  name: string;
  type: string;
  costHQPerHour: number;
  costMetalPerHour: number;
  costWoodPerHour: number;
  costStonePerHour: number;
  costStone: number;
  costWood: number;
  costHQ: number;
  costMetal: number;
}>();

const base = ref(props);

const formSchema = toTypedSchema(
  yup.object({
    name: yup.string().default(base.value.name),
    type: yup.string().min(1).default(props.type),
    costHQPerHour: yup.number().positive().default(props.costHQPerHour),
    costMetalPerHour: yup.number().positive().default(props.costMetalPerHour),
    costWoodPerHour: yup.number().positive().default(props.costWoodPerHour),
    costStonePerHour: yup.number().positive().default(props.costStonePerHour),
    costStone: yup.number().positive().default(props.costStone),
    costWood: yup.number().positive().default(props.costWood),
    costHQ: yup.number().positive().default(props.costHQ),
    costMetal: yup.number().positive().default(props.costMetal),
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

function getBase() {
  console.log(base.value);
}
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
      <FormField v-slot="{ componentField }" name="name" :model-value="name">
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

      <FormField v-slot="{ componentField }" name="type" :model-value="type">
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

      <FormField
        v-slot="{ componentField }"
        name="costHQPerHour"
        :model-value="costHQPerHour"
      >
        <FormItem class="flex gap-4 items-center">
          <FormLabel class="text-sm font-medium text-end flex-1"
            >Cost HQ Per Hour
          </FormLabel>
          <div class="flex flex-col flex-2">
            <FormControl>
              <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="costMetalPerHour"
        :model-value="costMetalPerHour"
      >
        <FormItem class="flex gap-4 items-center">
          <FormLabel class="text-sm font-medium text-end flex-1"
            >Cost Metal Per Hour
          </FormLabel>
          <div class="flex flex-col flex-2">
            <FormControl>
              <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="costWoodPerHour"
        :model-value="costWoodPerHour"
      >
        <FormItem class="flex gap-4 items-center">
          <FormLabel class="text-sm font-medium text-end flex-1"
            >Cost Wood Per Hour
          </FormLabel>
          <div class="flex flex-col flex-2">
            <FormControl>
              <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="costStonePerHour"
        :model-value="costStonePerHour"
      >
        <FormItem class="flex gap-4 items-center">
          <FormLabel class="text-sm font-medium text-end flex-1"
            >Cost Stone Per Hour
          </FormLabel>
          <div class="flex flex-col flex-2">
            <FormControl>
              <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="costHQ"
        :model-value="costHQ"
      >
        <FormItem class="flex gap-4 items-center">
          <FormLabel class="text-sm font-medium text-end flex-1"
            >Cost HQ
          </FormLabel>
          <div class="flex flex-col flex-2">
            <FormControl>
              <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="costStone"
        :model-value="costStone"
      >
        <FormItem class="flex gap-4 items-center">
          <FormLabel class="text-sm font-medium text-end flex-1"
            >Cost Stone
          </FormLabel>
          <div class="flex flex-col flex-2">
            <FormControl>
              <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="costMetal"
        :model-value="costMetal"
      >
        <FormItem class="flex gap-4 items-center">
          <FormLabel class="text-sm font-medium text-end flex-1"
            >Cost Metal
          </FormLabel>
          <div class="flex flex-col flex-2">
            <FormControl>
              <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="costWood"
        :model-value="costWood"
      >
        <FormItem class="flex gap-4 items-center">
          <FormLabel class="text-sm font-medium text-end flex-1"
            >CostWood
          </FormLabel>
          <div class="flex flex-col flex-2">
            <FormControl>
              <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
    </form>
    <DialogFooter>
      <Button variant="default" @click="getBase">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</template>
