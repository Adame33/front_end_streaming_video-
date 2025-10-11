import { apiFetch } from "./httpClient";

export function getWebinars() {
  return apiFetch("/webinars");
}

export function getWebinarById(webinarId) {
  return apiFetch(`/webinars/${webinarId}`);
}

export function searchWebinars(query) {
  const searchParam = encodeURIComponent(query);
  return apiFetch(`/webinars/search?q=${searchParam}`);
}

export function getWebinarsByCategory(categoryId) {
  return apiFetch(`/webinars/category/${categoryId}`);
}
