export interface User {
  id: number;
  email: string;
  username: string;
  draftBase: number;
  role: "admin" | "user";
  disabled: boolean;
}
