import { useEffect, useState } from "react";
import { getConsent } from "./CookieConsent";

const GTM_ID = "GTM-TL7D2WTX";

const loadGTM = () => {
  if (document.getElementById("gtm-script")) return;

  // GTM head script
  const script = document.createElement("script");
  script.id = "gtm-script";
  script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;
  document.head.appendChild(script);

  // GTM noscript fallback
  const noscript = document.createElement("noscript");
  noscript.id = "gtm-noscript";
  noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
  document.body.insertBefore(noscript, document.body.firstChild);
};

const GoogleAnalytics = () => {
  const [consent, setConsent] = useState(getConsent);

  useEffect(() => {
    const handler = () => setConsent(getConsent());
    window.addEventListener("cookie-consent-change", handler);
    return () => window.removeEventListener("cookie-consent-change", handler);
  }, []);

  useEffect(() => {
    if (consent === "accepted") {
      loadGTM();
    }
  }, [consent]);

  return null;
};

export default GoogleAnalytics;
