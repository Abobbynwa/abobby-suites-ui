import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Our Rooms", href: "/rooms" },
  { name: "Book Now", href: "/booking" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const services = [
  "24/7 Room Service",
  "Free WiFi",
  "Swimming Pool",
  "Restaurant & Bar",
  "Conference Rooms",
  "Airport Pickup",
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold">ABOBBY</span>
              <span className="font-serif text-lg text-accent ml-2">NWA & SUITE</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Experience luxury accommodation with world-class amenities and exceptional service. 
              Your comfort is our priority.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-primary-foreground/80 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  123 Victoria Island, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <a href="tel:+2348012345678" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  +234 801 234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <a href="mailto:info@abobbynwa.com" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  info@abobbynwa.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>&copy; {new Date().getFullYear()} ABOBBY NWA AND SUITE. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
