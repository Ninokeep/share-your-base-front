<template>
  <div
    class="container-home h-screen flex flex-col items-center justify-center"
  >
    <h1 class="text-white font-extrabold text-8xl">
      Build and Share your base
    </h1>
    <p class="text-white text-3xl px-56 pb-10 pt-2">
      This platform unites Rust enthusiasts, providing a space to exchange
      strategic insights and creative ideas, promoting collaboration and
      enriching the gaming journey.
    </p>
    <div>
      <NuxtLink to="/login" class="px-10 py-6 rounded-xl bg-white"
        >Already member</NuxtLink
      >
      <NuxtLink
        class="px-10 py-6 mx-4 rounded-xl text-white"
        to="/register"
        style="background-color: #001026"
        >I'm new</NuxtLink
      >
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style>
.container-home {
  background-image: linear-gradient(
    to bottom,
    #001026,
    #0a1f38,
    #172d4a,
    #233c5e,
    #2f4c72
  );
}
</style>
