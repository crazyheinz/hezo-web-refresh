import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import hezoLogo from "@/assets/hezo-logo.png";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Wat we doen", href: "/wat-we-doen/" },
    { 
      label: "Voor verpleegkundigen",
      dropdown: [
        { label: "Zelfstandig worden", href: "/zelfstandig-worden/" },
        { label: "Opleidingen", href: "/opleidingen/" },
        { label: "Blog", href: "/blog/" },
      ]
    },
    { label: "Vacatures", href: "/vacatures/" },
    { label: "Contact", href: "/contact/" },
  ];

  const isActiveLink = (href: string) => {
    return location.pathname === href || location.pathname + "/" === href;
  };

  const isDropdownActive = (dropdown: DropdownItem[]) => {
    return dropdown.some(item => isActiveLink(item.href));
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="flex items-center">
            <img src={hezoLogo} alt="Hezo" className="h-20 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" ref={dropdownRef}>
            {navItems.map((item) => (
              item.dropdown ? (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className={`flex items-center gap-1 text-base font-medium transition-colors hover:text-secondary ${
                      isDropdownActive(item.dropdown) ? "text-secondary" : "text-foreground"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                  </button>
                  
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-background rounded-lg shadow-lg border border-border py-2">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.href}
                          to={dropdownItem.href}
                          className={`block px-4 py-2.5 text-base font-medium transition-colors hover:bg-muted hover:text-secondary ${
                            isActiveLink(dropdownItem.href) ? "text-secondary bg-muted/50" : "text-foreground"
                          }`}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  to={item.href!}
                  className={`text-base font-medium transition-colors hover:text-secondary ${
                    isActiveLink(item.href!) ? "text-secondary" : "text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              item.dropdown ? (
                <div key={item.label} className="py-2">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className={`flex items-center justify-between w-full text-base font-medium transition-colors hover:text-secondary ${
                      isDropdownActive(item.dropdown) ? "text-secondary" : "text-foreground"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                  </button>
                  
                  {openDropdown === item.label && (
                    <div className="mt-2 ml-4 space-y-1 border-l-2 border-muted pl-4">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.href}
                          to={dropdownItem.href}
                          className={`block py-2 text-base font-medium transition-colors hover:text-secondary ${
                            isActiveLink(dropdownItem.href) ? "text-secondary" : "text-muted-foreground"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  to={item.href!}
                  className={`block py-2 text-base font-medium transition-colors hover:text-secondary ${
                    isActiveLink(item.href!) ? "text-secondary" : "text-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
