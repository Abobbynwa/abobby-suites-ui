import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Wifi, Coffee, Tv, Bath, ArrowRight, Users, Check, Filter } from "lucide-react";
import roomStandard from "@/assets/room-standard.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomExecutive from "@/assets/room-executive.jpg";
import roomPresidential from "@/assets/room-presidential.jpg";

const rooms = [
  {
    id: "standard",
    name: "Standard Room",
    description: "Comfortable and cozy room perfect for solo travelers or couples. Features modern amenities and a relaxing atmosphere.",
    price: 45000,
    image: roomStandard,
    guests: 2,
    size: "25 sqm",
    bed: "Queen Bed",
    amenities: ["Free WiFi", "Air Conditioning", "Flat Screen TV", "Mini Fridge", "Room Service"],
    icons: [Wifi, Coffee, Tv],
  },
  {
    id: "deluxe",
    name: "Deluxe Room",
    description: "Spacious room with premium amenities and stunning city views. Ideal for business travelers seeking comfort.",
    price: 75000,
    image: roomDeluxe,
    guests: 2,
    size: "35 sqm",
    bed: "King Bed",
    amenities: ["Free WiFi", "Air Conditioning", "Flat Screen TV", "Mini Bar", "Room Service", "Work Desk", "City View"],
    icons: [Wifi, Coffee, Tv, Bath],
  },
  {
    id: "executive",
    name: "Executive Suite",
    description: "Luxurious suite featuring a separate living area and workspace. Perfect for extended stays or business executives.",
    price: 120000,
    image: roomExecutive,
    guests: 3,
    size: "55 sqm",
    bed: "King Bed + Sofa Bed",
    amenities: ["Free WiFi", "Air Conditioning", "Smart TV", "Full Bar", "24/7 Room Service", "Executive Lounge Access", "Bathtub", "Living Area"],
    icons: [Wifi, Coffee, Tv, Bath],
  },
  {
    id: "presidential",
    name: "Presidential Suite",
    description: "Our finest accommodation with panoramic views, private balcony, and exclusive butler service. The ultimate luxury experience.",
    price: 250000,
    image: roomPresidential,
    guests: 4,
    size: "100 sqm",
    bed: "King Bed + 2 Single Beds",
    amenities: ["Free WiFi", "Climate Control", "Home Theater", "Private Bar", "Butler Service", "Private Dining", "Jacuzzi", "Panoramic Views", "Private Balcony"],
    icons: [Wifi, Coffee, Tv, Bath],
  },
];

const priceFilters = [
  { label: "All Rooms", min: 0, max: Infinity },
  { label: "Under ₦50,000", min: 0, max: 50000 },
  { label: "₦50,000 - ₦100,000", min: 50000, max: 100000 },
  { label: "Above ₦100,000", min: 100000, max: Infinity },
];

const Rooms = () => {
  const [activeFilter, setActiveFilter] = useState(0);

  const filteredRooms = rooms.filter(
    (room) => room.price >= priceFilters[activeFilter].min && room.price <= priceFilters[activeFilter].max
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Our Rooms & Suites
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Discover our carefully curated selection of rooms and suites, 
            each designed to provide the ultimate comfort and luxury.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-secondary border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="h-5 w-5" />
              <span className="font-medium">Filter by price:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {priceFilters.map((filter, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFilter(index)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === index
                      ? "bg-accent text-accent-foreground"
                      : "bg-card text-foreground hover:bg-accent/10"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {filteredRooms.map((room, index) => (
              <div
                key={room.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative rounded-xl overflow-hidden shadow-luxury-lg group">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-semibold">
                      ₦{room.price.toLocaleString()}/night
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                    {room.name}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {room.description}
                  </p>

                  {/* Room Details */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-secondary rounded-lg">
                      <Users className="h-5 w-5 mx-auto mb-1 text-accent" />
                      <span className="text-sm text-muted-foreground">Up to {room.guests} guests</span>
                    </div>
                    <div className="text-center p-3 bg-secondary rounded-lg">
                      <span className="block font-semibold text-foreground">{room.size}</span>
                      <span className="text-sm text-muted-foreground">Room Size</span>
                    </div>
                    <div className="text-center p-3 bg-secondary rounded-lg">
                      <span className="block font-semibold text-foreground">{room.bed}</span>
                      <span className="text-sm text-muted-foreground">Bed Type</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-8">
                    <h3 className="font-semibold text-foreground mb-3">Room Amenities</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {room.amenities.slice(0, 6).map((amenity) => (
                        <div key={amenity} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-accent" />
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to={`/rooms/${room.id}`}>
                      <Button variant="gold" size="lg">
                        View Details
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </Link>
                    <Link to={`/booking?room=${room.id}`}>
                      <Button variant="outline-gold" size="lg">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Rooms;
