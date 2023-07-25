'use client'
import App from "./components/App";
import React, { useEffect } from "react";

let isOfficeInitialized = false;
const title = "Ask Word Add-in";

export default function TaskPane() {
  useEffect(() => {
    Office.onReady(() => {
      isOfficeInitialized = true;
    });
  }, []);
  return (
    <App title={title} isOfficeInitialized={isOfficeInitialized} />
  )
}
