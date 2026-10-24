import React, { useState } from "react";
import Navbar from "./Navbar";
import LandingPage from "./LandingPage";
import OverviewPage from "./OverviewPage";
import DocumentationPage from "./DocumentationPage";

export default function App() {
  const [activePage, setActivePage] = useState("Overview");

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh" /* Locks the entire app to the viewport */,
        background: "white",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden" /* Disables global scrolling */,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Container for the active page to take up remaining height */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {activePage === "Demonstration" && <LandingPage />}
        {activePage === "Overview" && <OverviewPage />}
        {activePage === "Documentation" && <DocumentationPage />}
      </div>
    </div>
  );
}
