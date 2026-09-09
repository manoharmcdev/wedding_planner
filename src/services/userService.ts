import type { User } from "@/types/user";

const demoUser: User = {
    id: "user-001",
    name: "Manohar",
    email: "user@wednest.com",
    phone: "+91 98765 43210",
    role: "USER"
};

const DEMO_EMAIL = "user@wednest.com";
const DEMO_PASSWORD = "User@123";

export async function signIn(
  email: string,
  password: string,
): Promise<User | null> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (
    email.trim().toLowerCase() === DEMO_EMAIL &&
    password === DEMO_PASSWORD
  ) {
    return demoUser;
  }

  return null;
}

export async function getDemoUser(): Promise<User> {
  return demoUser;
}