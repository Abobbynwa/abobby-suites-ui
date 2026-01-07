import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Wifi, Coffee, Tv, Bath, ArrowRight, Users, Check, Filter, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Static images mapping
import roomStandard from "@/assets/room-standard.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomExecutive from "@/assets/room-executive.jpg";
import roomPresidential from "@/assets/room-presidential.jpg";
import roomFamily from "@/assets/room-family.jpg";
import roomTwin from "@/assets/room-twin.jpg";
import roomSuperior from "@/assets/room-superior.jpg";
import roomHoneymoon from "@/assets/room-honeymoon.jpg";
import roomOceanSuite from "@/assets/room-ocean-suite.jpg";
import roomPenthouse from "@/assets/room-penthouse.jpg";
import roomBusiness from "@/assets/room-business.jpg";
import roomGarden from "@/assets/room-garden.jpg";
import roomRoyal from "@/assets/room-royal.jpg";
import roomEconomy from "@/assets/room-economy.jpg";
import roomPoolside from "@/assets/room-poolside.jpg";

const imageMap: Record<string, string> = {
  "standard": roomStandard,
  "deluxe": roomDeluxe,
  "executive": roomExecutive,
  "presidential": roomPresidential,
  "family": roomFamily,
  "twin": roomTwin,
  "superior": roomSuperior,
  "honeymoon": roomHoneymoon,
  "ocean-suite": roomOceanSuite,
  "penthouse": roomPenthouse,
  "business": roomBusiness,
  "garden": roomGarden,
  "royal": roomRoyal,
  "economy": roomEconomy,
  "poolside": roomPoolside,
};

interface Room {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  capacity: number;
  size: string;
  bed_type: string;
  amenities: string[];
  image_url: string;
}

const priceFilters = [
  { label: "All Rooms", min: 0, max: Infinity },
  { label: "Under ₦30,000", min: 0, max: 30000 },
  { label: "₦30,000 - ₦60,000", min: 30000, max: 60000 },
  { label: "₦60,000 - ₦100,000", min: 60000, max: 100000 },
  { label: "Above ₦100,000", min: 100000, max: Infinity },
];

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(0);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("is_available", true)
        .order("price", { ascending: true });

      if (error) throw error;
      setRooms(data || []);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRooms = rooms.filter(
    (room) => Number(room.price) >= priceFilters[activeFilter].min && Number(room.price) <= priceFilters[activeFilter].max
  );

  const getImage = (slug: string) => imageMap[slug] || roomStandard;

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Our {rooms.length} Rooms & Suites
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
          {filteredRooms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No rooms found in this price range.</p>
            </div>
          ) : (
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
                        src={getImage(room.slug)}
                        alt={room.name}
                        className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-semibold">
                        ₦{Number(room.price).toLocaleString()}/night
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
                        <span className="text-sm text-muted-foreground">Up to {room.capacity} guests</span>
                      </div>
                      <div className="text-center p-3 bg-secondary rounded-lg">
                        <span className="block font-semibold text-foreground">{room.size}</span>
                        <span className="text-sm text-muted-foreground">Room Size</span>
                      </div>
                      <div className="text-center p-3 bg-secondary rounded-lg">
                        <span className="block font-semibold text-foreground text-xs">{room.bed_type}</span>
                        <span className="text-sm text-muted-foreground">Bed Type</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="mb-8">
                      <h3 className="font-semibold text-foreground mb-3">Room Amenities</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {room.amenities?.slice(0, 6).map((amenity) => (
                          <div key={amenity} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 text-accent" />
                            {amenity}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link to={`/rooms/${room.slug}`}>
                        <Button variant="gold" size="lg">
                          View Details
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </Button>
                      </Link>
                      <Link to={`/booking?room=${room.slug}`}>
                        <Button variant="outline-gold" size="lg">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Rooms;