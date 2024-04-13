<script lang="ts" setup>
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as yup from "yup";
import { useToast } from "@/components/ui/toast/use-toast";
import { ToastAction, Toaster } from "@/components/ui/toast";
import { reactive } from "vue";

const openDialogClosed = ref(false);

const config = useRuntimeConfig();
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
  id: number;
}>();

const base = reactive(props);

const formSchema = toTypedSchema(
  yup.object({
    name: yup.string().min(1).default(base.name),
    type: yup.string().min(1).default(base.type),
    costHQPerHour: yup.number().positive().default(base.costHQPerHour),
    costMetalPerHour: yup.number().positive().default(base.costMetalPerHour),
    costWoodPerHour: yup.number().positive().default(base.costWoodPerHour),
    costStonePerHour: yup.number().positive().default(base.costStonePerHour),
    costStone: yup.number().positive().default(base.costStone),
    costWood: yup.number().positive().default(base.costWood),
    costHQ: yup.number().positive().default(base.costHQ),
    costMetal: yup.number().positive().default(base.costMetal),
  })
);

const { handleSubmit, isSubmitting, values, errors } = useForm({
  validationSchema: formSchema,
});

const emit = defineEmits({
  submit(payload: {
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
    id: number;
  }) {
    return true;
  },
  updateFailed() {
    return false;
  },
  updateSuccessful() {
    return true;
  },
});

const onSubmit = handleSubmit(async (formValues) => {
  let formData = {};

  for (const [key] of Object.entries(base)) {
    if (base[key] !== formValues[key]) {
      formData = { ...formData, [key]: formValues[key] };
    }
  }
  const { data, error } = await useFetch(
    `http://${config.public.backendUrl}:${config.public.backendPort}/${config.public.apiPrefix}/${config.public.apiVersion}/bases/${props.id}`,
    {
      method: "PUT",
      body: formData,
    }
  );
  if (error.value) {
    emit("updateFailed");
  } else if (data.value) {
    openDialogClosed.value = true;
    emit("submit", data.value);
    emit("updateSuccessful");
  }
});

const formHasChanges = computed(() => {
  return compareTwoObjects(base, values);
});
</script>

<template>
  <DialogContent class="sm:max-w-[850px]">
    <DialogHeader>
      <DialogTitle>Edit the base</DialogTitle>
      <DialogDescription>
        Make changes to your base here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <form class="flex flex-col gap-4 py-4" @submit="onSubmit">
      <div class="flex gap-4">
        <FormField v-slot="{ componentField }" name="name" :model-value="name">
          <FormItem class="flex flex-col">
            <FormLabel class="text-sm font-medium">Name </FormLabel>
            <div class="flex flex-col flex-2">
              <FormControl>
                <Input type="text" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="type" :model-value="type">
          <FormItem class="flex flex-col">
            <FormLabel class="text-sm font-medium">Type </FormLabel>
            <div class="flex flex-col flex-2">
              <FormControl>
                <Input type="text" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        </FormField>
      </div>

      <div class="flex gap-2">
        <FormField
          v-slot="{ componentField }"
          name="costHQPerHour"
          :model-value="costHQPerHour"
        >
          <FormItem class="flex flex-col">
            <FormLabel class="text-sm font-medium">Cost HQ (Hourly)</FormLabel>
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
          <FormItem class="flex flex-col">
            <FormLabel class="text-sm font-medium"
              >Cost Metal (Hourly)
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
          <FormItem class="flex flex-col">
            <FormLabel class="text-sm font-medium"
              >Cost Wood (Hourly)
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
          <FormItem class="flex flex-col">
            <FormLabel class="text-sm font-medium"
              >Cost Stone (Hourly)
            </FormLabel>
            <div class="flex flex-col flex-2">
              <FormControl>
                <Input type="number" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        </FormField>
      </div>

      <div class="flex gap-2">
        <FormField
          v-slot="{ componentField }"
          name="costHQ"
          :model-value="costHQ"
        >
          <FormItem class="flex flex-col">
            <FormLabel class="text-sm font-medium">Cost HQ </FormLabel>
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
          <FormItem class="flex flex-col">
            <FormLabel class="text-sm font-medium">Cost Stone </FormLabel>
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
          <FormItem class="flex flex-col">
            <FormLabel class="text-sm font-medium">Cost Metal </FormLabel>
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
          <FormItem class="flex flex-col">
            <FormLabel class="text-sm font-medium">CostWood </FormLabel>
            <div class="flex flex-col flex-2">
              <FormControl>
                <Input type="number" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        </FormField>
      </div>

      <DialogFooter>
        <DialogClose>
          <Button
            variant="default"
            type="submit"
            :disabled="
              isSubmitting || formHasChanges || Object.keys(errors).length
            "
          >
            <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isSubmitting" />
            Save changes</Button
          >
        </DialogClose>
      </DialogFooter>
    </form>
  </DialogContent>
</template>
