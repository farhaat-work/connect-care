import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { Menu, X, Heart } from "lucide-react";
import NotificationBell from "@/components/notifications/NotificationBell.jsx";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Appointments", href: "/appointments" },
  { name: "Video Consult", href: "/video-consultation" },
  { name: "Notifications", href: "/notifications/patient" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-soft group-hover:shadow-elevated transition-smooth">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Medi<span className="text-primary">Connect</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href || (link.href.startsWith("/#") && location.pathname === "/");
              const isHashLink = link.href.startsWith("/#");

              return isHashLink ? (
                <a
                  key={link.name}
                  href={link.href}
                  className={`font-medium transition-smooth relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-medium transition-smooth relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full ${
                    isActive ? "text-primary after:w-full" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <NotificationBell recipientType="patient" />
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button size="sm" asChild>
              <Link to="/appointments">Book Appointment</Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-smooth"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-slide-up">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isHashLink = link.href.startsWith("/#");
                return isHashLink ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-muted-foreground hover:text-primary font-medium transition-smooth px-2 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-muted-foreground hover:text-primary font-medium transition-smooth px-2 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                <div className="flex items-center justify-between px-2 py-2">
                  <span className="text-muted-foreground font-medium">Notifications</span>
                  <NotificationBell recipientType="patient" />
                </div>
                <Button variant="ghost" className="justify-start">Sign In</Button>
                <Button className="justify-start" asChild>
                  <Link to="/appointments">Book Appointment</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
