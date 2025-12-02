import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Search, Star, Award, Shield } from "lucide-react";
import heroImage from "@/assets/hero-lobby.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="ABOBBY NWA AND SUITE luxury hotel lobby"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-32 right-10 hidden xl:flex flex-col gap-4 animate-fade-in" style={{ animationDelay: "0.8s" }}>
        <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-luxury flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
            <Star className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="font-semibold text-foreground">4.9 Rating</p>
            <p className="text-sm text-muted-foreground">500+ Reviews</p>
          </div>
        </div>
        <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-luxury flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
            <Award className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Best Hotel 2024</p>
            <p className="text-sm text-muted-foreground">Luxury Awards</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 pt-32">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6 animate-fade-in">
            <Shield className="h-5 w-5 text-accent" />
            <span className="text-accent font-medium tracking-wider uppercase text-sm">
              Premium Luxury Experience
            </span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Experience <span className="text-accent">Elegance</span> at ABOBBY NWA & SUITE
          </h1>
          
          <p className="text-primary-foreground/90 text-lg md:text-xl mb-4 leading-relaxed animate-fade-in-up max-w-2xl" style={{ animationDelay: "0.2s" }}>
            Discover unparalleled comfort and world-class hospitality with 15 uniquely designed rooms. 
            Your perfect getaway awaits in the heart of the city.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6 mb-8 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-sm">15 Luxury Rooms</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-sm">24/7 Concierge</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-sm">Best Price Guarantee</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/rooms">
              <Button variant="hero" size="xl" className="group">
                Explore Our 15 Rooms
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Button>
            </Link>
            <Link to="/booking">
              <Button variant="outline-light" size="xl">
                Book Your Stay
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-primary-foreground/20 animate-fade-in-up max-w-xl" style={{ animationDelay: "0.4s" }}>
            <div>
              <p className="text-3xl font-bold text-accent">15+</p>
              <p className="text-primary-foreground/70 text-sm">Luxury Rooms</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent">500+</p>
              <p className="text-primary-foreground/70 text-sm">Happy Guests</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent">4.9</p>
              <p className="text-primary-foreground/70 text-sm">Star Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Widget */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-4 hidden lg:block">
        <div className="container mx-auto">
          <div className="bg-card rounded-2xl shadow-luxury-lg p-8 max-w-4xl mx-auto border border-border/50">
            <div className="flex items-center gap-2 mb-6">
              <Search className="h-5 w-5 text-accent" />
              <h3 className="font-serif text-lg font-semibold text-foreground">Quick Booking</h3>
            </div>
            <form className="grid grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Check In</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Check Out</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <select className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 appearance-none transition-all">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4+ Guests</option>
                  </select>
                </div>
              </div>
              <div>
                <Link to="/rooms">
                  <Button variant="gold" size="lg" className="w-full">
                    <Search className="h-5 w-5 mr-2" />
                    Search Rooms
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
