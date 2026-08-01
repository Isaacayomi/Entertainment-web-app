const KEY = "authReturnTo";

export function setAuthReturnTo(path: string): void {
  if (path && path !== "/login" && path !== "/sign-up") {
    sessionStorage.setItem(KEY, path);
  }
}

export function getAuthReturnTo(): string | null {
  return sessionStorage.getItem(KEY);
}

export function clearAuthReturnTo(): void {
  sessionStorage.removeItem(KEY);
}
