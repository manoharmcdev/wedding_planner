export type UserRole = "USER" | "VENDOR" | "ADMIN";

export interface User {
  id: number | string ;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
}