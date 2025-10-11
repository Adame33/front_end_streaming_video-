import { apiFetch } from "./httpClient";

export function getCategories() {
  return apiFetch("/categories");
}

export function getCategoryById(categoryId) {
  return apiFetch(`/categories/${categoryId}`);
}
