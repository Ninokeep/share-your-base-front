<template>
  <div class="h-screen">
    <div class="flex h-screen">
      <div class="flex-1 lg:block hidden">
        <div class="img-left__background z-40"></div>
        <div class="img-left__overlay"></div>
        <h1
          class="relative text-white text-6xl opacity-100 z-50 title-left p-6 font-extrabold"
        >
          Build and Share your base
        </h1>
      </div>
      <div class="flex-1 flex flex-col justify-center items-center">
        <div class="pb-9 w-4/5">
          <h3 class="text-5xl capitalize bold">Get started</h3>
          <p class="text-gray-400 bold pt-2">Create your account now</p>
        </div>

        <div class="pb-5 w-4/5">
          <form @submit="onSubmit">
            <FormField v-slot="{ componentField }" name="username">
              <FormItem class="pb-3">
                <FormLabel class="text-gray-400 extrabold">Username</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="email">
              <FormItem class="pb-3">
                <FormLabel class="text-gray-400 extrabold">Email</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="password">
              <FormItem class="pb-3">
                <FormLabel class="text-gray-400 extrabold">Password</FormLabel>
                <FormControl>
                  <Input type="password" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="confirmPassword">
              <FormItem class="pb-8">
                <FormLabel class="text-gray-400 extrabold"
                  >Confirm password</FormLabel
                >
                <FormControl>
                  <Input type="password" v-bind="componentField" />
                </FormControl>
                <FormMessage />
                <span v-if="errors.confirmPassword === 'passwordMatch'"
                  >Passwords do not match</span
                >
              </FormItem>
            </FormField>

            <Button
              type="submit"
              class="w-full"
              :disabled="
                isSubmitting ||
                !(isFieldDirty('email') && isFieldDirty('password'))
              "
            >
              <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isSubmitting" />
              <template v-else>Sign up</template>
            </Button>
          </form>
        </div>
        <p class="text-center text-gray-400">
          Have an account ?
          <span class="text-black bold"
            ><NuxtLink to="/login">Login</NuxtLink></span
          >
        </p>
      </div>
    </div>
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/yup";

import { useForm } from "vee-validate";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-vue-next";
import { useToast } from "@/components/ui/toast/use-toast";
import { ToastAction, Toaster } from "@/components/ui/toast";
import { h } from "vue";

import * as yup from "yup";
const { toast } = useToast();

const formSchema = toTypedSchema(
  yup.object({
    email: yup.string().required().email("The email format is wrong !"),
    password: yup
      .string()
      .required()
      .min(8)
      .oneOf([yup.ref("confirmPassword")], "Passwords must match"),
    username: yup.string().required().min(1).trim(),
    confirmPassword: yup
      .string()
      .required()
      .min(8)
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
);

const { handleSubmit, isSubmitting, resetForm, values, isFieldDirty, errors } =
  useForm({
    validationSchema: formSchema,
  });

const onSubmit = handleSubmit(
  async (values) => {
    const { data, error } = await useFetch(
      "http://localhost:8888/api/v1/auth/register",
      {
        method: "POST",
        body: {
          email: values.email,
          username: values.username,
          passwordConfirm: values.confirmPassword,
          password: values.password,
        },
      }
    );
    if (error.value !== null) {
      if (error.value?.statusCode === 409) {
        toast({
          title: "This Email is already taken",
          description: "Retry again please",
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
      } else if (error.value?.statusCode === 400) {
        toast({
          title: "Something is wrong",
          description: "Retry again please",
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
      } else {
        toast({
          title: "Something is wrong",
          description: "Retry again please",
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
      }
    }

    if (data.value) {
      toast({
        title: "Account created successfull",
        description: "Your account is created, login you please",
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

    resetForm();
  },
  async (err) => {}
);
</script>

<style>
.img-left__background {
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(img/plan.png);
  background-repeat: no-repeat;
  opacity: 0.15;
  width: 50vw;
  height: 100%;
  background-position: center;
  background-size: cover;
}

.img-left__container {
  position: relative;
}

.img-left__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 50vw;
  height: 100%;
  background: linear-gradient(
    to bottom,
    #001026,
    #0a1f38,
    #172d4a,
    #233c5e,
    #2f4c72
  );
}

.title-left {
}

.title-left::after {
  content: "";
  display: inline-block;
  width: 15px;
  height: 15px;
  background-color: white;
  border-radius: 20px;
}
</style>
