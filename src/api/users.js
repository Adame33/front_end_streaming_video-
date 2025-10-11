import { apiFetch } from "./httpClient";

export function registerUser(userData) {
  return apiFetch("/users/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export function loginUser(credentials) {
  return apiFetch("/users/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function getUsers() {
  return apiFetch("/users");
}

export function getUserById(userId) {
  return apiFetch(`/users/${userId}`);
}
