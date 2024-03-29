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

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
function logout() {
  authStore.userLogOut();
  router.push({ path: "/login" });
}
</script>

<template>
  <nav
    class="border-r border-r-gray-200 py-8 px-3 h-full flex flex-col justify-between"
  >
    <div class="flex flex-col gap-2">
      <Button
        v-for="item in sidebarNavItems"
        variant="ghost"
        :href="item.href"
        :as="route.path === item.href ? 'button' : 'a'"
        :class="
          route.path === item.href
            ? 'flex justify-start opacity-75 opacity-100 text-white bg-gray-800 hover:bg-gray-800 hover:text-white'
            : 'flex justify-start opacity-75 hover:opacity-100 hover:text-white hover:bg-gray-800'
        "
      >
        <Icon :name="item.icon" class="mr-2" size="16" />
        {{ item.title }}</Button
      >
    </div>

    <div class="flex flex-col gap-2">
      <Button @click="logout"
        ><Icon name="material-symbols:logout" class="mr-2" size="16" />
        Logout</Button
      >
    </div>
  </nav>
</template>
<style scoped>
html {
  height: 100vh;
}
</style>
