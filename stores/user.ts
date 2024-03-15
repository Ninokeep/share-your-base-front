export const useUserStore = defineStore("websiteStore", () => {
  const userInformations = reactive({
    username: "",
    email: "",
    rule: "",
    draftBase: 0,
  });

  function setUsername(username: string): void {
    userInformations.username = username;
  }

  function setEmail(email: string): void {
    userInformations.email = email;
  }

  function setRule(rule: string): void {
    userInformations.rule = rule;
  }

  function setDraftBase(draftBase: number) {
    userInformations.draftBase = draftBase;
  }

  return { userInformations, setUsername, setEmail, setRule, setDraftBase };
});
