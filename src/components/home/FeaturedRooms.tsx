import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wifi, Coffee, Tv, Bath, ArrowRight, Users } from "lucide-react";
import roomStandard from "@/assets/room-standard.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomExecutive from "@/assets/room-executive.jpg";
import roomPresidential from "@/assets/room-presidential.jpg";

const rooms = [
  {
    id: "standard",
    name: "Standard Room",
    description: "Comfortable and cozy room perfect for solo travelers or couples.",
    price: 45000,
    image: roomStandard,
    guests: 2,
    amenities: [Wifi, Coffee, Tv],
  },
  {
    id: "deluxe",
    name: "Deluxe Room",
    description: "Spacious room with premium amenities and city views.",
    price: 75000,
    image: roomDeluxe,
    guests: 2,
    amenities: [Wifi, Coffee, Tv, Bath],
  },
  {
    id: "executive",
    name: "Executive Suite",
    description: "Luxurious suite with separate living area and workspace.",
    price: 120000,
    image: roomExecutive,
    guests: 3,
    amenities: [Wifi, Coffee, Tv, Bath],
  },
  {
    id: "presidential",
    name: "Presidential Suite",
    description: "Our finest accommodation with panoramic views and exclusive services.",
    price: 250000,
    image: roomPresidential,
    guests: 4,
    amenities: [Wifi, Coffee, Tv, Bath],
  },
];

export function FeaturedRooms() {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-medium tracking-wider uppercase text-sm">
            Accommodations
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Our Luxurious Rooms
          </h2>
          <p className="text-muted-foreground">
            Choose from our carefully designed rooms and suites, each offering 
            unique comfort and elegance for your perfect stay.
          </p>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              className="group bg-card rounded-xl overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-all duration-300 hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  ₦{room.price.toLocaleString()}/night
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {room.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {room.description}
                </p>

                {/* Amenities */}
                <div className="flex items-center gap-4 mb-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{room.guests}</span>
                  </div>
                  <div className="flex gap-2">
                    {room.amenities.map((Icon, i) => (
                      <Icon key={i} className="h-4 w-4" />
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link to={`/rooms/${room.id}`}>
                  <Button variant="outline-gold" className="w-full group/btn">
                    View Details
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/rooms">
            <Button variant="gold" size="lg">
              View All Rooms
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
