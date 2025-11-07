import React from "react";
import "./LayoutSplit.css";
export default function LayoutSplit({ left, right }) {
  return (
    <div className="layout-split-container">
      <div className="split-panel left-panel">{left}</div>
      <div className="split-panel right-panel">{right}</div>
    </div>
  );
}
