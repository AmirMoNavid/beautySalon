"use client";
import { useEffect } from "react";

export default function HandleNavBarBg() {
  useEffect(() => {
    const navbar = document.getElementById("header");
    const path = window.location.pathname;
    if (path !== "/") {
      navbar.style.background = "rgb(0 0 0 / 90%)";
      navbar.style.backdropFilter = "blur(2px)";
    }

    window.scrollTo(0, 0);
  }, []);

  return null;
}
