interface UserPayload {
  email: string;
  password: string;
}
interface UserCredentialPayload {
  token: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
    user: {
      username: "",
      email: "",
      role: "",
      password: "",
      id: undefined,
    },
  }),
  getters: {
    getAuthenticated: (state) => state.authenticated,
    userIsAdmin: (state) => (state.user.role === "admin" ? true : false),
  },

  actions: {
    async authenticatedUser({ email, password }: UserPayload) {
      const config = useRuntimeConfig();

      const { data, pending, error }: any = await useFetch(
        `http://${config.public.backendUrl}:${config.public.backendPort}/${config.public.apiPrefix}/${config.public.apiVersion}/auth/login`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: {
            email,
            password,
          },
        }
      );
      this.loading = pending;
      if (error.value) return true;
      if (data.value) {
        const token = useCookie("token", { maxAge: 14400 });
        token.value = data?.value?.access_token;
        this.authenticated = true;
        this.user.email = "jean";
        return false;
      }
    },

    async getUserCredentials({ token }: UserCredentialPayload) {
      const { data, pending, error } = await useAsyncData(
        "userCredentials",
        () => {
          return $fetch(`http://localhost:8888/api/v1/users/token/${token}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        }
      );
      return { data, pending, error };
    },

    userLogOut() {
      const token = useCookie("token");
      this.authenticated = false;
      token.value = null;
    },
  },
});
