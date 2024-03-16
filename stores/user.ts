interface UserPayload {
  email: string;
  password: string;
}
export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
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

    userLogOut() {
      const token = useCookie("token");
      this.authenticated = false;
      token.value = null;
    },
  },
});
