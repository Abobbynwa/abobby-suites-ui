import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Search } from "lucide-react";
import heroImage from "@/assets/hero-lobby.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="ABOBBY NWA AND SUITE luxury hotel lobby"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <span className="inline-block text-accent font-medium tracking-wider uppercase text-sm mb-4 animate-fade-in">
            Welcome to Luxury
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Experience Elegance at <span className="text-accent">ABOBBY NWA</span> & SUITE
          </h1>
          <p className="text-primary-foreground/90 text-lg md:text-xl mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Discover unparalleled comfort and world-class hospitality in the heart of the city. 
            Your perfect getaway awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/rooms">
              <Button variant="hero" size="xl">
                Explore Rooms
              </Button>
            </Link>
            <Link to="/booking">
              <Button variant="outline-light" size="xl">
                Book Your Stay
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Booking Widget */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-4 hidden lg:block">
        <div className="container mx-auto">
          <div className="bg-card rounded-xl shadow-luxury-lg p-6 max-w-4xl mx-auto">
            <form className="grid grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Check In</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Check Out</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <select className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent appearance-none">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4+ Guests</option>
                  </select>
                </div>
              </div>
              <div>
                <Button variant="gold" size="lg" className="w-full">
                  <Search className="h-5 w-5 mr-2" />
                  Check Availability
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
