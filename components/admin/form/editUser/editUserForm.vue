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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as yup from "yup";
import { reactive } from "vue";

import type { User } from "@/types/user";

const openDialogClosed = ref(false);

const config = useRuntimeConfig();
const props = defineProps<User>();

const user = reactive(props);

const formSchema = toTypedSchema(
  yup.object({
    username: yup.string().min(1).default(user.username),
    email: yup.string().min(1).default(user.email),
    role: yup.string().default(user.role),
    disabled: yup.boolean().default(user.disabled),
    draftBase: yup.number().positive().default(user.draftBase),
  })
);

const { handleSubmit, isSubmitting, values, errors } = useForm({
  validationSchema: formSchema,
});

const emit = defineEmits({
  submit(payload: User) {
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
  const cookie = useCookie("token");
  for (const [key] of Object.entries(user)) {
    if (user[key] !== formValues[key]) {
      formData = { ...formData, [key]: formValues[key] };
    }
  }

  console.log(formData);
  const { data, error } = await useFetch(
    `http://${config.public.backendUrl}:${config.public.backendPort}/${config.public.apiPrefix}/${config.public.apiVersion}/users/${props.id}`,
    {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${cookie.value}`,
      },
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
  const baseProps = omitProperties(user, ["id"]);
  return compareTwoObjects(baseProps, values);
});
</script>

<template>
  <DialogContent class="sm:max-w-[850px]">
    <DialogHeader>
      <DialogTitle>Edit the user account</DialogTitle>
      <DialogDescription>
        Make changes to the user account here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <form class="flex flex-col gap-4 py-4" @submit="onSubmit">
      <div class="flex gap-4">
        <FormField
          v-slot="{ componentField }"
          name="username"
          :model-value="username"
        >
          <FormItem class="flex flex-col w-48">
            <FormLabel class="text-sm font-medium">Username </FormLabel>
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
          name="email"
          :model-value="email"
        >
          <FormItem class="flex flex-col w-48">
            <FormLabel class="text-sm font-medium">Email </FormLabel>
            <div class="flex flex-col flex-2">
              <FormControl>
                <Input type="text" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        </FormField>
      </div>

      <div class="flex gap-4">
        <FormField
          v-slot="{ componentField }"
          name="disabled"
          :model-value="disabled"
        >
          <FormItem class="flex flex-col w-48">
            <FormLabel class="text-sm font-medium">Status Account</FormLabel>
            <div class="flex flex-col flex-2">
              <FormControl>
                <Select v-bind="componentField">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a value" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        :value="'false'"
                        :disabled="disabled === false"
                      >
                        enabled
                      </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectItem :value="'true'" :disabled="disabled === true">
                        disabled
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="role" :model-value="role">
          <FormItem class="flex flex-col w-48">
            <FormLabel class="text-sm font-medium">Role </FormLabel>
            <div class="flex flex-col flex-2">
              <FormControl>
                <Select v-bind="componentField">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup v-for="item in ['admin', 'user']">
                      <SelectItem :value="item" :disabled="item === role">
                        {{ item }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        </FormField>
      </div>

      <div class="flex">
        <FormField
          v-slot="{ componentField }"
          name="draftBase"
          :model-value="draftBase"
        >
          <FormItem class="flex flex-col w-48">
            <FormLabel class="text-sm font-medium">Bases Created </FormLabel>
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
