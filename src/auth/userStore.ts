export type Role = "admin" | "user"; // add more if you need

export type StoredUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  passwordHash: string; // SHA-256
};

const KEY = "users-db";

function readAll(): StoredUser[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
function writeAll(users: StoredUser[]) { localStorage.setItem(KEY, JSON.stringify(users)); }

export async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function createUser(input: { email: string; name: string; role: Role; password: string; }) {
  const users = readAll();
  if (users.some(u => u.email.toLowerCase() === input.email.toLowerCase())) {
    throw new Error("An account with this email already exists.");
  }
  const user: StoredUser = {
    id: crypto.randomUUID(),
    email: input.email,
    name: input.name,
    role: input.role,
    passwordHash: await sha256(input.password),
  };
  writeAll([...users, user]);
  return user;
}

export async function verifyLogin(email: string, password: string) {
  const users = readAll();
  const u = users.find(x => x.email.toLowerCase() === email.toLowerCase());
  if (!u) return null;
  return (await sha256(password)) === u.passwordHash ? u : null;
}
