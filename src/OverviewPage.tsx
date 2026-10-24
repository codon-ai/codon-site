import React, { useState, useEffect, useRef } from "react";

export default function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const cards = ["HOW IT WORKS", "WHAT IT IS", "IMPACT"];

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current)
        setContainerWidth(containerRef.current.offsetWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardWidth = Math.min(containerWidth * 0.7, 678);
  const gap = Math.min(containerWidth * 0.04, 40);
  const baseOffset = (containerWidth - cardWidth) / 2;
  const currentTranslateX =
    containerWidth === 0
      ? 0
      : baseOffset - activeIndex * (cardWidth + gap) + dragX;

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startX.current = e.clientX;
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) setDragX(e.clientX - startX.current);
  };
  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const dragThreshold = 75;
    if (dragX > dragThreshold && activeIndex > 0)
      setActiveIndex((prev) => prev - 1);
    else if (dragX < -dragThreshold && activeIndex < cards.length - 1)
      setActiveIndex((prev) => prev + 1);
    setDragX(0);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{ width: "100%", padding: "4vh 20px 0", textAlign: "center" }}
      >
        <div style={{ fontSize: "clamp(48px, 6vw, 96px)", lineHeight: 1.1 }}>
          <span
            style={{
              fontFamily: "Host Grotesk, sans-serif",
              textShadow: "0px 4px 4px rgba(106, 206, 246, 1.00)",
            }}
          >
            Introducing
          </span>
          <span
            style={{
              color: "#000",
              textAlign: "center",
              textShadow: "0 4px 4px #6ACEF6",
              fontFamily: "Host Grotesk",
              fontSize: "96px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",
            }}
          >
            {" "}
            Codon
          </span>
        </div>
      </div>

      <div
        ref={containerRef}
        style={{
          flex: 1,
          width: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          touchAction: "none",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div
          style={{
            transform: `translateX(${currentTranslateX}px)`,
            transition: isDragging
              ? "none"
              : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
            display: "flex",
            gap: `${gap}px`,
            alignItems: "center",
            willChange: "transform",
          }}
        >
          {cards.map((title, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={index}
                style={{
                  flex: "0 0 auto",
                  width: `${cardWidth}px`,
                  height: "clamp(250px, 45vh, 492px)",
                  opacity: isActive ? 1 : 0.5,
                  background: "linear-gradient(180deg, white 0%, #254988 100%)",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  transition: "all 0.5s ease",
                  boxSizing: "border-box",
                  userSelect: "none",
                  cursor: isDragging ? "grabbing" : "grab",
                  borderRadius: "16px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    color: isActive ? "white" : "black",
                    fontSize: "clamp(40px, 5vw, 96px)",
                    fontFamily: "Instrument Serif, serif",
                    padding: "20px",
                  }}
                >
                  {title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
