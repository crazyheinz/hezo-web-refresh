import { Link } from "react-router-dom";
import hezoLogo from "@/assets/hezo-logo.png";
const Footer = () => {
  return <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img src={hezoLogo} alt="Hezo" className="h-12 w-auto mb-4" />
            <p className="text-sm opacity-90">
              Samen sterk in zelfstandige thuisverpleging.
            </p>
            <p className="text-sm opacity-75 mt-2">
          </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Snelle links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/wat-we-doen" className="text-sm hover:text-secondary transition-colors">
                  Wat we doen
                </Link>
              </li>
              <li>
                <Link to="/opleidingen" className="text-sm hover:text-secondary transition-colors">
                  Opleidingen
                </Link>
              </li>
              <li>
                <Link to="/vacatures" className="text-sm hover:text-secondary transition-colors">
                  Vacatures
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@Hezo.be" className="hover:text-secondary transition-colors">E-mail: info@hezo.be</a>
              </li>
              <li>
                <a href="tel:+3292651720" className="hover:text-secondary transition-colors">
                  Tel: +32 9 265 17 20
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-75">
          <p>© 2025 Hezo. Alle rechten voorbehouden.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-secondary transition-colors">
              Privacy
            </Link>
            <Link to="/algemene-voorwaarden" className="hover:text-secondary transition-colors">
              Algemene voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;