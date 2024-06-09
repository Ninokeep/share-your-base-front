<template>
  <DashboardLayout>
    <h1 class="text-2xl font-bold px-4 py-2">Settings</h1>
    <p class="text-muted-foreground px-4">
      Manage your account settings and set e-mail preferences.
    </p>
    <Separator class="mt-4" />
    <form class="pb-5 px-5 w-2/4 space-y-3 mt-4" @submit="onSubmit">
      <FormField
        v-slot="{ componentField }"
        name="username"
        :model-value="user.username"
      >
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

      <FormField
        v-slot="{ componentField }"
        name="password"
        :model-value="user.password"
      >
        <FormItem>
          <FormLabel class="text-sm font-medium">Password</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormDescription> You can manage your password. </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="email"
        :model-value="user.email"
      >
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

      <Button
        type="submit"
        :disabled="isSubmitting || formHasChanges || formErrors"
      >
        Update
      </Button>
    </form>
    <Toaster />
  </DashboardLayout>
</template>

<script lang="ts" setup>
import DashboardLayout from "@/layouts/dashboardLayout.vue";
import { Separator } from "@/components/ui/separator";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useToast } from "@/components/ui/toast/use-toast";
import { ToastAction, Toaster } from "@/components/ui/toast";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

const authStore = useAuthStore();
const { toast } = useToast();

const formSchema = toTypedSchema(
  yup.object({
    email: yup
      .string()
      .email("The email format is wrong")
      .default(authStore.user.email),
    password: yup
      .string()
      .notRequired()
      .transform((curr, obj) => (obj === "" ? null : curr))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    username: yup.string().trim().default(authStore.user.username),
  })
);

const { handleSubmit, isSubmitting, values, errors } = useForm({
  validationSchema: formSchema,
});

const formErrors = computed(() =>
  Object.keys(errors.value).length > 0 ? true : false
);
const config = useRuntimeConfig();
const user = omitProperties(authStore.user, ["role", "id"]);
const userId = omitProperties(authStore.user, ["role"]);
const cookie = useCookie("token");

const onSubmit = handleSubmit(async (formValues) => {
  // Object.values(formValues).filter((e) => !Object.values(user).includes(e));

  let formData = {};
  for (const [key] of Object.entries(user)) {
    if (user[key] !== formValues[key] && formValues[key] !== null) {
      formData = { ...formData, [key]: formValues[key] };
    }
  }

  const { data, error } = await useFetch(
    `http://${config.public.backendUrl}:${config.public.backendPort}/${config.public.apiPrefix}/${config.public.apiVersion}/users/${userId.id}`,
    {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${cookie.value}`,
      },
    }
  );
  if (error.value) {
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
  } else if (data.value) {
    return toast({
      title: "Informations account updated",
      description: "Success",
      variant: "default",
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
  }
});

const formHasChanges = computed(() => {
  const user = omitProperties(authStore.user, ["role", "id"]);
  user.password = "";

  return compareTwoObjects(user, values);
});
</script>

<style scoped></style>
