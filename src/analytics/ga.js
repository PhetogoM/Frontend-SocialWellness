// src/analytics/ga.js
const MEASUREMENT_ID = "G-XSRSD1XWPW";

let loaded = false;

export function initGA() {
  if (loaded) return;
  // load gtag.js
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(s);

  // init gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(){ window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  // We'll manually send page views from React Router (so disable the auto one)
  window.gtag("config", MEASUREMENT_ID, { send_page_view: false });

  loaded = true;
}

export function trackPageView(pathname) {
  if (!window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: pathname,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(name, params = {}) {
  if (!window.gtag) return;
  window.gtag("event", name, params);
}
