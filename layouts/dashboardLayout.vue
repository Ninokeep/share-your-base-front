<template>
  <div class="flex flex-col lg:flex-row lg:space-y-0 h-screen">
    <aside class="lg:w-1/5">
      <SideNavBar />
    </aside>
    <div class="flex-1 bg-primary">
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SideNavBar from "@/components/sideNavBar/sideNavBar.vue";
</script>
