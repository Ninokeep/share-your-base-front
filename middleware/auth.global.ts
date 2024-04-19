export default defineNuxtRouteMiddleware(async (to, from) => {
  const { authenticated, user } = storeToRefs(useAuthStore());
  const authStore = useAuthStore();
  const token = useCookie("token");

  if (token.value) {
    authenticated.value = true;
    const { data } = await authStore.getUserCredentials({ token: token.value });
    user.value.email = data?.value?.email;
    user.value.role = data?.value?.role;
    user.value.username = data?.value?.username;
    user.value.id = data?.value?.id;
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
