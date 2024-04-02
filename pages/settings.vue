<template>
  <DashboardLayout>
    <h1 class="text-2xl font-bold px-4 py-2">Settings</h1>
    <p class="text-muted-foreground px-4">
      Manage your account settings and set e-mail preferences.
    </p>
    <Separator class="mt-4" />
    <form class="pb-5 px-5 w-2/4 space-y-3 mt-4" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel class="text-sm font-medium">Username</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormDescription>
            This is your public display name. It can be your real name or a
            pseudonym.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel class="text-sm font-medium">Password</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormDescription> You can manage your password. </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel class="text-sm font-medium">Email</FormLabel>
          <FormControl>
            <Input
              type="text"
              v-bind="componentField"
              :placeholder="authStore.user.username"
            />
          </FormControl>
          <FormDescription
            >You can manage verified email addresses in your email settings.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" :disabled="isSubmitting || formHasChanges">
        Update
      </Button>
    </form>
  </DashboardLayout>
</template>

<script lang="ts" setup>
import DashboardLayout from "@/layouts/dashboardLayout.vue";
import { Separator } from "@/components/ui/separator";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { useForm } from "vee-validate";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
const authStore = useAuthStore();

const formSchema = toTypedSchema(
  yup.object({
    email: yup
      .string()
      .email("The email format is wrong")
      .default(authStore.user.email),
    password: yup.string().min(8).notRequired(),
    username: yup.string().min(1).trim().default(authStore.user.username),
  })
);

function fieldHasError() {
  return Object.values(errors.value).length > 0 ? true : false;
}

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

const onSubmit = handleSubmit(async (formValues) => {
  const user = omitProperties(authStore.user, ["role"]);
  user.password = undefined;
  Object.values(formValues).filter((e) => !Object.values(user).includes(e));

  let formData = {};
  for (const [key] of Object.entries(user)) {
    if (user[key] !== formValues[key]) {
      formData = { ...formData, [key]: formValues[key] };
    }
  }

  console.log(formData);
});

const formHasChanges = computed(() => {
  const user = omitProperties(authStore.user, ["role"]);
  user.password = undefined;
  return compareTwoObjects(user, values);
});
</script>

<style scoped></style>
