"use client";

import { useEffect } from "react";
import { showToast } from "@/components/Toast";

interface ToastTriggerProps {
  message: string;
}

export function ToastTrigger({ message }: ToastTriggerProps) {
  useEffect(() => {
    // 1. Checks if it's imported as a standard module function
    if (typeof showToast === "function") {
      showToast(message);
    } 
    // 2. Checks if it's attached globally to the window object
    else if (typeof window !== "undefined" && (window as any).showToast) {
      (window as any).showToast(message);
    } 
    // 3. Fallback log if the import path needs adjustment
    else {
      console.warn("showToast function not found. Message was:", message);
    }
  }, [message]);

  return null; // Keeps the DOM perfectly clean
}
