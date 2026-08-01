import { useCallback, useMemo, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import AuthModal from "./AuthModal";
import { setAuthReturnTo } from "../services/authReturn";
import { AuthGateContext } from "../hooks/useAuthGate";

export function AuthGateProvider({ children }: { children: ReactNode }) {
  const [promptOpen, setPromptOpen] = useState(false);
  const [action, setAction] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const requireAuth = useCallback((action?: string) => {
    if (auth.currentUser) return true;
    setAction(action ?? null);
    setPromptOpen(true);
    return false;
  }, []);

  const close = useCallback(() => setPromptOpen(false), []);

  const goToLogin = useCallback(() => {
    setAuthReturnTo(location.pathname + location.search);
    setPromptOpen(false);
    navigate("/login");
  }, [location, navigate]);

  const value = useMemo(() => ({ requireAuth }), [requireAuth]);

  return (
    <AuthGateContext.Provider value={value}>
      {children}
      <AuthModal open={promptOpen} action={action} onClose={close} onLogin={goToLogin} />
    </AuthGateContext.Provider>
  );
}
