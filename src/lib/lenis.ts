import Lenis from "lenis";
import "lenis/dist/lenis.css";

let instance: Lenis | null = null;
let lockCount = 0;

export function mountLenis(
  wrapper?: HTMLElement | null,
  content?: HTMLElement | null,
): Lenis | null {
  instance?.destroy();
  instance =
    wrapper && content
      ? new Lenis({ autoRaf: true, wrapper, content })
      : new Lenis({ autoRaf: true });
  lockCount = 0;
  return instance;
}

export function unmountLenis() {
  instance?.destroy();
  instance = null;
  lockCount = 0;
}

export function getLenis() {
  return instance;
}

export function scrollToTop(immediate = false) {
  instance?.scrollTo(0, { immediate, force: true });
}

export function lockScroll() {
  if (!instance) return;
  lockCount += 1;
  if (lockCount === 1) instance.stop();
}

export function unlockScroll() {
  if (!instance) return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) instance.start();
}
