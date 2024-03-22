<template>
  <div class="flex flex-col lg:flex-row lg:space-y-0 h-screen">
    <aside class="w-[16rem]">
      <SideNavBar />
    </aside>
    <div class="w-[100%]">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SideNavBar from "@/components/sideNavBar/sideNavBar.vue";
</script>
