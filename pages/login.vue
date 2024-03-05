<template>
  <div class="h-screen">
    <div class="flex h-screen">
      <div class="flex-1">
        <div class="img-left__background z-40"></div>
        <div class="img-left__overlay"></div>
        <h1
          class="relative text-white text-6xl opacity-100 z-50 title-left p-6 font-extrabold"
        >
          Build and Share your base
        </h1>
      </div>
      <div
        class="flex-1 flex flex-col justify-center px-5"
        style="padding: 0 5rem 0 15rem"
      >
        <div class="pb-9">
          <h3 class="text-5xl capitalize bold">welcome back</h3>
        </div>

        <div class="pb-5">
          <form @submit="onSubmit">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem class="pb-5">
                <FormLabel class="text-gray-400 extrabold">Email</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>

                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="password">
              <FormItem class="pb-8">
                <FormLabel class="text-gray-400 extrabold">Password</FormLabel>
                <FormControl>
                  <Input type="password" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <Button type="submit" class="w-full"> Login </Button>
          </form>
        </div>
        <p class="text-center text-gray-400">
          Not again an account ?
          <span class="text-black bold">Sign up</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { Button } from "@/components/ui/button";
import { ref } from "vue";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const formSchema = toTypedSchema(
  z.object({
    email: z.string().email({ message: "The email format is wrong !" }),
    password: z.string().min(8),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

function onSubmit(values: any) {
  console.log("Form submitted!", values);
  setShowPassword();
}

let showPassword = ref(false);

function setShowPassword() {
  showPassword.value = !showPassword.value;
}
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
