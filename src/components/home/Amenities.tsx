import { 
  Wifi, 
  Car, 
  Utensils, 
  Dumbbell, 
  Waves, 
  Clock, 
  ShieldCheck, 
  Sparkles 
} from "lucide-react";

const amenities = [
  {
    icon: Wifi,
    title: "Free High-Speed WiFi",
    description: "Stay connected with complimentary high-speed internet throughout the hotel.",
  },
  {
    icon: Utensils,
    title: "Fine Dining Restaurant",
    description: "Experience culinary excellence with our award-winning chefs.",
  },
  {
    icon: Waves,
    title: "Swimming Pool",
    description: "Relax and unwind at our stunning infinity pool with panoramic views.",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description: "State-of-the-art gym equipment available 24/7 for your wellness.",
  },
  {
    icon: Car,
    title: "Airport Transfer",
    description: "Complimentary pickup and drop-off service for our guests.",
  },
  {
    icon: Clock,
    title: "24/7 Room Service",
    description: "Round-the-clock service to cater to your every need.",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Security",
    description: "Your safety is our priority with professional security staff.",
  },
  {
    icon: Sparkles,
    title: "Spa & Wellness",
    description: "Rejuvenate your body and mind at our luxury spa center.",
  },
];

export function Amenities() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-medium tracking-wider uppercase text-sm">
            Hotel Amenities
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            World-Class Services
          </h2>
          <p className="text-muted-foreground">
            Discover the exceptional amenities that make your stay unforgettable.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenities.map((amenity, index) => (
            <div
              key={amenity.title}
              className="group text-center p-6 rounded-xl hover:bg-secondary transition-colors duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                <amenity.icon className="h-8 w-8 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                {amenity.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
