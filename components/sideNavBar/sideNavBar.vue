<script lang="ts" setup>
import Button from "../ui/button/Button.vue";
import { Icon } from "#components";

interface Item {
  title: string;
  href: string;
  icon: string;
}

const sidebarNavItems: Item[] = [
  {
    title: "Bases",
    href: "/bases",
    icon: "tdesign:architecture-hui-style",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "iconamoon:settings-bold",
  },
];
</script>

<template>
  <nav class="h-screen border-r border-r-gray-200 py-8 px-3">
    <div class="flex flex-col gap-2">
      <Button
        v-for="item in sidebarNavItems"
        variant="ghost"
        :href="item.href"
        as="a"
        class="flex justify-start opacity-75 hover:opacity-100 hover:text-white hover:bg-gray-800"
      >
        <Icon :name="item.icon" class="mr-2" size="16" />
        {{ item.title }}</Button
      >
    </div>
  </nav>
</template>
