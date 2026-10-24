import React from "react";

export default function DocumentationPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Sidebar Nav */}
      <aside
        style={{
          width: "clamp(200px, 20vw, 300px)",
          padding: "40px 20px",
          borderRight: "1px solid #eaeaea",
          background: "#fafafa",
          fontFamily: "Geist Mono, monospace",
        }}
      >
        <h4
          style={{
            fontSize: "14px",
            textTransform: "uppercase",
            color: "#888",
            marginBottom: "20px",
            letterSpacing: "1px",
          }}
        >
          Getting Started
        </h4>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "0 0 40px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <li
            style={{ color: "#254988", fontWeight: "bold", cursor: "pointer" }}
          >
            Installation
          </li>
          <li style={{ color: "#555", cursor: "pointer" }}>
            Quick Start Guide
          </li>
          <li style={{ color: "#555", cursor: "pointer" }}>Configuration</li>
        </ul>

        <h4
          style={{
            fontSize: "14px",
            textTransform: "uppercase",
            color: "#888",
            marginBottom: "20px",
            letterSpacing: "1px",
          }}
        >
          API Reference
        </h4>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <li style={{ color: "#555", cursor: "pointer" }}>Core Modules</li>
          <li style={{ color: "#555", cursor: "pointer" }}>
            Types & Interfaces
          </li>
          <li style={{ color: "#555", cursor: "pointer" }}>Error Handling</li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: "40px 6vw", maxWidth: "900px" }}>
        <h1
          style={{
            fontSize: "48px",
            fontFamily: "Instrument Serif, serif",
            marginBottom: "16px",
          }}
        >
          Installation
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#444",
            marginBottom: "30px",
            lineHeight: 1.6,
            fontFamily: "Host Grotesk, sans-serif",
          }}
        >
          Installing Codon is simple. We provide pre-compiled binaries for
          macOS, Linux, and Windows, as well as a native package manager
          integration.
        </p>

        <h3
          style={{
            fontSize: "24px",
            fontFamily: "Host Grotesk, sans-serif",
            marginBottom: "16px",
            marginTop: "40px",
          }}
        >
          Using NPM or Yarn
        </h3>
        <div
          style={{
            background: "#111",
            color: "#0f0",
            padding: "20px",
            borderRadius: "8px",
            fontFamily: "Geist Mono, monospace",
            fontSize: "14px",
            marginBottom: "30px",
            overflowX: "auto",
          }}
        >
          <code>npm install @codon/core --save</code>
          <br />
          <code style={{ color: "#888" }}># or using yarn</code>
          <br />
          <code>yarn add @codon/core</code>
        </div>
      </main>
    </div>
  );
}
