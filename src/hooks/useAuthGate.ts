import { createContext, useContext } from "react";

export type AuthGateContextValue = {
  requireAuth: (action?: string) => boolean;
};

export const AuthGateContext = createContext<AuthGateContextValue | null>(null);

export function useAuthGate(): AuthGateContextValue {
  const ctx = useContext(AuthGateContext);
  if (!ctx) {
    throw new Error("useAuthGate must be used within an AuthGateProvider");
  }
  return ctx;
}
