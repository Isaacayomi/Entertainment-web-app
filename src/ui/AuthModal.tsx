import { useEffect } from "react";

type AuthModalProps = {
  open: boolean;
  action?: string | null;
  onClose: () => void;
  onLogin: () => void;
};

function AuthModal({ open, action, onClose, onLogin }: AuthModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 mx-4 w-full max-w-sm rounded-2xl bg-semiDarkBlue p-6 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/40 transition-colors hover:text-white"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <h2 className="text-xl font-semibold">Sign in to continue</h2>
        <p className="mt-2 text-sm text-white/60">
          {action
            ? `You need to sign in or sign up to ${action}.`
            : "You need to sign in or sign up to continue."}
        </p>

        <button
          onClick={onLogin}
          className="mt-6 w-full rounded-full bg-red px-6 py-3 text-sm font-medium transition-colors hover:bg-red/80"
        >
          Sign In / Sign Up
        </button>
        <button
          onClick={onClose}
          className="mt-3 w-full text-center text-sm text-white/50 transition-colors hover:text-white"
        >
          Not now
        </button>
      </div>
    </div>
  );
}

export default AuthModal;
