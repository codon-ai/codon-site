import { BrowserRouter, Route, Routes } from "react-router";

import OverviewPage from "./OverviewPage.tsx";
import DocumentationPage from "./DocumentationPage";
import Navbar from "./Navbar";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
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
      <Navbar />
        <Routes>
          <Route path="/" element={<div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            <OverviewPage />
          </div>} />
          <Route path="/docs" element={<DocumentationPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
