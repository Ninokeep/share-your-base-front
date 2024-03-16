export default defineNuxtRouteMiddleware((to, from) => {
  console.log("the middleware auth running...");

  const { authenticated } = storeToRefs(useAuthStore());
  const token = useCookie("token");

  if (token.value) {
    authenticated.value = true;
  }

  if (!token.value && (to?.name === "login" || to?.name === "register")) {
    return;
  }

  if ((token.value && to?.name === "login") || to?.name === "register") {
    return navigateTo("/bases");
  }

  if (!token.value && to?.name !== "login") {
    abortNavigation();
    return navigateTo("/login");
  }
});
