import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getConsent } from "./CookieConsent";

const GA_ID = "G-XXXXXXXXXX"; // TODO: vervang door je echte GA4 Measurement ID

const loadGA = () => {
  if (document.getElementById("ga-script")) return;

  const script = document.createElement("script");
  script.id = "ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  const inline = document.createElement("script");
  inline.id = "ga-inline";
  inline.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}', { anonymize_ip: true });
  `;
  document.head.appendChild(inline);
};

const GoogleAnalytics = () => {
  const [consent, setConsent] = useState(getConsent);
  const location = useLocation();

  // Listen for consent changes
  useEffect(() => {
    const handler = () => setConsent(getConsent());
    window.addEventListener("cookie-consent-change", handler);
    return () => window.removeEventListener("cookie-consent-change", handler);
  }, []);

  // Load GA only after acceptance
  useEffect(() => {
    if (consent === "accepted") {
      loadGA();
    }
  }, [consent]);

  // Track page views
  useEffect(() => {
    if (consent === "accepted" && (window as any).gtag) {
      (window as any).gtag("config", GA_ID, {
        page_path: location.pathname,
      });
    }
  }, [location.pathname, consent]);

  return null;
};

export default GoogleAnalytics;
