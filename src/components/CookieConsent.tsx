import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "hezo_cookie_consent";

export type ConsentValue = "accepted" | "declined" | null;

export const getConsent = (): ConsentValue => {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    if (v === "accepted" || v === "declined") return v;
  } catch {}
  return null;
};

const setConsent = (value: "accepted" | "declined") => {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {}
  window.dispatchEvent(new Event("cookie-consent-change"));
};

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsent() === null) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const handleAccept = () => {
    setConsent("accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    setConsent("declined");
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-card border-t border-border shadow-lg">
      <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-muted-foreground flex-1">
          Wij gebruiken analytische cookies (Google Analytics) om onze website te
          verbeteren. Functionele cookies zijn altijd actief.{" "}
          <Link to="/cookies/" className="text-secondary underline hover:no-underline">
            Lees ons cookiebeleid
          </Link>
          .
        </p>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={handleDecline}>
            Weigeren
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Accepteren
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
