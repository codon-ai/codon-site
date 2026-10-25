import React from "react";
import { Scroll, useScroll } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { NAVBAR_HEIGHT } from "./Navbar";
import { scrollTopForPage } from "./scrollUtils";

export function HtmlPages() {
  const scroll = useScroll();
  const pageHeight = useThree((state) => state.size.height);

  const pageStyle: React.CSSProperties = {
    height: pageHeight,
    boxSizing: "border-box",
    paddingTop: NAVBAR_HEIGHT,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  };

  const cardStyle: React.CSSProperties = {
    pointerEvents: "auto",
    background: "rgba(255, 255, 255, 0.9)",
    padding: "2rem",
    borderRadius: "8px",
  };

  const scrollToPage = (pageIndex: number) => {
    if (scroll.el) {
      scroll.el.scrollTo({
        top: scrollTopForPage(scroll.el, scroll.pages, pageIndex),
        behavior: "smooth",
      });
    }
  };

  return (
    <Scroll html style={{ width: "100%" }}>
      {/* Page 1 */}
      <div style={pageStyle}>
        <div style={cardStyle}>
          <h2>Page 1: Introduction</h2>
          <button onClick={() => scrollToPage(1)}>
            Complete Action to Continue
          </button>
        </div>
      </div>

      {/* Page 2 */}
      <div style={pageStyle}>
        <div style={cardStyle}>
          <h2>Page 2: Traditional LLM</h2>
          <button onClick={() => scrollToPage(2)}>
            Run Analysis & Go to Next
          </button>
        </div>
      </div>

      {/* Page 3 */}
      <div style={pageStyle}>
        <div style={cardStyle}>
          <h2>Page 3: Codon Implementation</h2>
          <button onClick={() => scrollToPage(3)}>
            Compare Implementations
          </button>
        </div>
      </div>

      {/* Page 4 */}
      <div style={pageStyle}>
        <div style={cardStyle}>
          <h2>Page 4: Comparison & Finish</h2>
          <button onClick={() => scrollToPage(0)}>Back to Top</button>
        </div>
      </div>
    </Scroll>
  );
}