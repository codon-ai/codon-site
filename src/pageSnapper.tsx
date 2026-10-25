import { useEffect } from "react";
import { useScroll } from "@react-three/drei";
import { maxScroll, pageFromScroll, scrollTopForPage } from "./scrollUtils";

export function PageSnapper() {
  const scroll = useScroll();

  useEffect(() => {
    const el = scroll.el;
    if (!el) return;

    const pages = scroll.pages;
    let animating = false;
    let lastWheel = 0;
    let touchStartY = 0;

    // Disables native free-scrolling; programmatic scrollTo still works
    el.style.overflow = "hidden";

    const currentPage = () => pageFromScroll(el, pages);

    const goTo = (index: number) => {
      const target = Math.max(0, Math.min(pages - 1, index));
      animating = true;
      el.scrollTo({
        top: scrollTopForPage(el, pages, target),
        behavior: "smooth",
      });
      window.setTimeout(() => (animating = false), 900);
    };

    const step = (dir: number) => {
      if (animating) return;
      goTo(currentPage() + dir);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = performance.now();
      const fresh = now - lastWheel > 120; // Ignore trackpad momentum
      lastWheel = now;
      if (animating || !fresh || Math.abs(e.deltaY) < 4) return;
      step(e.deltaY > 0 ? 1 : -1);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => e.preventDefault();
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) step(dy > 0 ? 1 : -1);
    };

    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        step(1);
      }
      if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        step(-1);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    window.addEventListener("keydown", onKey);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [scroll]);

  return null;
}