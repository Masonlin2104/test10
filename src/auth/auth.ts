import { verifyLogin, type StoredUser } from "./userStore";

export type Role = "admin" | "user";
export type User = { id: string; email: string; name: string; role: Role; token: string; };

export async function loginAPI(email: string, password: string): Promise<User> {
  await new Promise(r => setTimeout(r, 150));
  const u: StoredUser | null = await verifyLogin(email, password);
  if (!u) throw new Error("Invalid email or password");
  return { id: u.id, email: u.email, name: u.name, role: u.role, token: "fake-jwt" };
}
