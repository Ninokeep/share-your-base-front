export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useAuthStore());
  const token = useCookie("token");

  if (token.value) {
    authenticated.value = true;
  }

  if (!token.value && (to?.name === "login" || to?.name === "register")) return;

  if ((token.value && to?.name === "login") || to?.name === "register") {
    return navigateTo("/bases");
  }

  if (!token.value && to?.name !== "login") {
    abortNavigation();
    return navigateTo("/login");
  }
});
