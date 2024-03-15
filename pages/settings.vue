<template>
  <DashboardLayout>
    <h1 class="text-white text-2xl font-bold px-4 py-2">Settings</h1>
    <p class="text-muted-foreground px-4">
      Manage your account settings and set e-mail preferences.
    </p>
    <Separator class="bg-gray-800 mt-4" />

    <form class="pb-5 px-5 w-2/4 space-y-3 mt-4" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel class="text-sm text-white font-medium">Username</FormLabel>
          <FormControl>
            <Input
              type="text"
              v-bind="componentField"
              class="focus-visible:border-[#38bdf8] focus-visible:ring-offset-0 bg-primary focus-visible:border-2 text-white"
            />
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
          <FormLabel class="text-sm text-white font-medium">Password</FormLabel>
          <FormControl>
            <Input
              type="text"
              v-bind="componentField"
              class="focus-visible:border-[#38bdf8] focus-visible:ring-offset-0 bg-primary focus-visible:border-2 text-white"
            />
          </FormControl>
          <FormDescription> You can manage your password. </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel class="text-sm text-white font-medium">Email</FormLabel>
          <FormControl>
            <Input
              type="text"
              v-bind="componentField"
              class="focus-visible:border-[#38bdf8] focus-visible:ring-offset-0 bg-primary focus-visible:border-2 text-white"
            />
          </FormControl>
          <FormDescription
            >You can manage verified email addresses in your email settings.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button variant="secondary" type="submit"> Update profile</Button>
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
const formSchema = toTypedSchema(
  yup.object({
    email: yup.string().required().email("The email format is wrong"),
    password: yup.string().required().min(8),
    username: yup.string().required().min(1).trim(),
  })
);

const { handleSubmit, isSubmitting, resetForm, values, isFieldDirty, errors } =
  useForm({
    validationSchema: formSchema,
  });

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});
</script>

<style scoped></style>
