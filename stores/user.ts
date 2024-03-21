interface UserPayload {
  email: string;
  password: string;
}
interface UserCredentialPayload {
  email: string;
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
    },
  }),
  getters: {
    getAuthenticated: (state) => state.authenticated,
  },

  actions: {
    async authenticatedUser({ email, password }: UserPayload) {
      const { data, pending, error }: any = await useFetch(
        "http://localhost:8888/api/v1/auth/login",
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
        const token = useCookie("token");
        token.value = data?.value?.access_token;
        this.authenticated = true;
        return false;
      }
    },

    async getUserCredentials({ email, token }: UserCredentialPayload) {
      const { data, pending, error } = await useAsyncData(
        "userCredentials",
        () => {
          return $fetch("http://localhost:8888/api/v1/user", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: {
              email,
              token,
            },
          });
        }
      );
    },

    userLogOut() {
      const token = useCookie("token");
      this.authenticated = false;
      token.value = null;
    },
  },
});
