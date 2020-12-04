import React from "react";

export function Overlay({ active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`ditoko__overlay ${
        active ? "ditoko__block" : "ditoko__hidden"
      }`}
    ></div>
  );
}
