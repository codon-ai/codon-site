import React, { useState } from "react";
import OverviewPage from "./OverviewPage";
import DocumentationPage from "./DocumentationPage";

import "./App.css";

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

      {/* Container for the active page to take up remaining height */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <OverviewPage />
      </div>
    </div>
  );
}
