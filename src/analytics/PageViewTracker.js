// src/analytics/PageViewTracker.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "./ga";

export default function PageViewTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
