import React from "react";

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Navbar({ activePage, setActivePage }: NavbarProps) {
  const navItems = ["Overview", "Demonstration", "Documentation"];

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 4vw",
        flexWrap: "wrap",
        gap: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderBottom: "1px solid #eaeaea",
        zIndex: 100,
      }}
    >
      <div
        onClick={() => setActivePage("Demonstration")}
        style={{
          color: "black",
          fontSize: "clamp(28px, 4vw, 36px)",
          fontFamily: "Instrument Serif, serif",
          fontWeight: "400",
          cursor: "pointer",
        }}
      >
        Codon
      </div>

      <nav
        style={{
          display: "flex",
          gap: "clamp(10px, 2vw, 20px)",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {navItems.map((item) => {
          const isActive = activePage === item;
          return (
            <div
              key={item}
              onClick={() => setActivePage(item)}
              style={{
                padding: "10px 20px",
                boxShadow: isActive
                  ? "0px 4px 4px rgba(0, 0, 0, 0.25)"
                  : "none",
                borderRadius: "4px",
                cursor: "pointer",
                color: isActive ? "#254988" : "black",
                fontSize: "clamp(16px, 1.5vw, 24px)",
                fontFamily: "Geist Mono, monospace",
                transition: "all 0.3s ease",
                textShadow: isActive
                  ? "none"
                  : "0px 2px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              {item}
            </div>
          );
        })}
      </nav>

      <div
        style={{
          position: "relative",
          width: "clamp(160px, 15vw, 206px)",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            borderRadius: 41,
            objectFit: "cover",
          }}
          src="https://placehold.co/206x48/254988/ffffff"
          alt="Download Button Background"
          draggable="false"
        />
        <div
          style={{
            position: "relative",
            color: "white",
            fontSize: "clamp(14px, 1.5vw, 20px)",
            fontFamily: "Instrument Serif, serif",
            zIndex: 1,
          }}
        >
          Download Codon
        </div>
      </div>
    </header>
  );
}
