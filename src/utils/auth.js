const STORAGE_KEYS = {
  user: "user",
  loggedIn: "isLoggedIn",
};

export function storeSession(userData) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(userData));
  window.localStorage.setItem(STORAGE_KEYS.loggedIn, "true");
}

export function clearSession() {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(STORAGE_KEYS.user);
  window.localStorage.removeItem(STORAGE_KEYS.loggedIn);
}

export function getStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }
  const stored = window.localStorage.getItem(STORAGE_KEYS.user);
  return stored ? JSON.parse(stored) : null;
}

export function isLoggedIn() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.localStorage.getItem(STORAGE_KEYS.loggedIn) === "true";
}
