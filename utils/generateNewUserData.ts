import { NewUser } from "../types/newUser";

export function generateNewUserData(): NewUser {
  return {
    name: `User ${Date.now()}`,
    email: `user${Date.now()}@example.com`,
  };
}