<script lang="ts" setup>
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as yup from "yup";

import { ref } from "vue";

const name = ref("");
const type = ref("");
const costHQPerHour = ref(0);
const costMetalPerHour = ref(0);
const costWoodPerHour = ref(0);
const costStonePerHour = ref(0);
const costStone = ref(0);
const costWood = ref(0);
const costHQ = ref(0);
const costMetal = ref(0);

const formSchema = toTypedSchema(
  yup.object({
    name: yup.string().min(1),
    type: yup.string().min(1),
    costHQPerHour: yup.number().positive(),
    costMetalPerHour: yup.number().positive(),
    costWoodPerHour: yup.number().positive(),
    costStonePerHour: yup.number().positive(),
    costStone: yup.number().positive(),
    costWood: yup.number().positive(),
    costHQ: yup.number().positive(),
    costMetal: yup.number().positive(),
  })
);

const { handleSubmit, isSubmitting, values, errors } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (formValue) => {
  console.log(formValue);
});
</script>

<template>
  <DialogContent class="sm:max-w-[850px]">
    <DialogHeader>
      <DialogTitle>Create a Base</DialogTitle>
      <DialogDescription class="py-1"> Configure your base </DialogDescription>
    </DialogHeader>
    <form class="flex flex-col gap-4" @submit="onSubmit">
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
          <FormItem class="flex flex-col w-48">
            <FormLabel class="text-sm font-medium">Type </FormLabel>
            <div class="flex flex-col flex-2">
              <FormControl>
                <Select v-bind="componentField">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="attack"> Attack </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectItem value="hybrid"> Hybrid </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectItem value="defensive"> Defensive </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
            <FormLabel class="text-sm font-medium">Cost Wood</FormLabel>
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
            Create</Button
          >
        </DialogClose>
      </DialogFooter>
    </form>
  </DialogContent>
</template>
