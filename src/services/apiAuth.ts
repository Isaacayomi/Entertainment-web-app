import { auth } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import type { AuthProps } from "types";

export async function loginApi({ email, password }: AuthProps) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function signUpApi({ email, password }: AuthProps) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return credential.user;
}

export async function getCurrentUser() {
  return auth.currentUser;
}

export async function logoutApi() {
  await signOut(auth);
}

// Popup errors that mean "this environment can't do a popup" — the only
// cases where falling back to a full-page redirect is the right move. A user
// who deliberately closes the popup ("auth/popup-closed-by-user") is NOT here,
// so we don't yank them into a redirect against their will.
const POPUP_UNSUPPORTED_CODES = new Set([
  "auth/popup-blocked",
  "auth/cancelled-popup-request",
  "auth/operation-not-supported-in-this-environment",
]);

// Popup-first with an automatic redirect fallback.
//
// Popup is the reliable path on modern desktop AND mobile browsers, and it is
// unaffected by third-party-storage blocking (Safari ITP, in-app webviews,
// incognito) that silently breaks signInWithRedirect. We only fall back to
// redirect when the browser genuinely refuses the popup. The redirect result
// is picked up on return by handleRedirectResult() in Login/SignUp.
export async function googleLoginApi() {
  const provider = new GoogleAuthProvider();

  try {
    return await signInWithPopup(auth, provider);
  } catch (error) {
    const code = (error as { code?: string })?.code;
    if (code && POPUP_UNSUPPORTED_CODES.has(code)) {
      // Redirect navigates away; the returned promise never resolves to a
      // credential here — the result is read on the next page load.
      return signInWithRedirect(auth, provider);
    }
    throw error;
  }
}

export async function handleRedirectResult() {
  const result = await getRedirectResult(auth);
  return result;
}
