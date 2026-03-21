import { Link } from "react-router-dom";
import hezoLogo from "@/assets/hezo-logo-footer.png";
const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img src={hezoLogo} alt="Hezo" className="h-14 w-auto mb-4" />
            <p className="text-sm opacity-90">Samen sterk in zelfstandige thuisverpleging.</p>
            <p className="text-sm opacity-75 mt-2"></p>
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
                <Link to="/onze-diensten/" className="text-sm hover:text-secondary transition-colors">
                  Ons aanbod
                </Link>
              </li>
              <li>
                <Link to="/blog/zelfstandig-thuisverpleegkundige-worden/" className="text-sm hover:text-secondary transition-colors">
                  Zelfstandig worden
                </Link>
              </li>
              <li>
                <Link to="/opleidingen/" className="text-sm hover:text-secondary transition-colors">
                  Opleidingen
                </Link>
              </li>
              <li>
                <Link to="/vacatures/" className="text-sm hover:text-secondary transition-colors">
                  Vacatures
                </Link>
              </li>
              <li>
                <Link to="/blog/" className="text-sm hover:text-secondary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@Hezo.be" className="hover:text-secondary transition-colors">
                  E-mail: info@hezo.be
                </a>
              </li>
              <li>
                <a href="tel:+3292651720" className="hover:text-secondary transition-colors">
                  Tel: +32 9 265 17 20
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <a
                href="https://www.linkedin.com/company/hezo-thuisverpleging"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm hover:text-secondary transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col items-center text-sm opacity-75 gap-2">
          <div className="flex gap-4">
            <Link to="/privacy/" className="hover:text-secondary transition-colors">
              Privacy
            </Link>
            <Link to="/cookies/" className="hover:text-secondary transition-colors">
              Cookies
            </Link>
          </div>
          <p>© 2025 Hezo. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
