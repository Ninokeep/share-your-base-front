export interface User {
  id: number;
  email: string;
  username: string;
  draftBase: string;
  role: "admin" | "user";
  disabled: boolean;
}
