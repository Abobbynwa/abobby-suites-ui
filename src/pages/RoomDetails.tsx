import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Wifi, Coffee, Tv, Bath, Users, Maximize, Bed, 
  Check, ArrowLeft, Calendar, Star 
} from "lucide-react";
import roomStandard from "@/assets/room-standard.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomExecutive from "@/assets/room-executive.jpg";
import roomPresidential from "@/assets/room-presidential.jpg";

const roomsData = {
  standard: {
    id: "standard",
    name: "Standard Room",
    description: "Our Standard Room offers a comfortable retreat with modern amenities. Perfect for solo travelers or couples looking for a cozy yet stylish accommodation. The room features contemporary decor, a comfortable queen bed, and all the essentials for a pleasant stay.",
    longDescription: "Wake up refreshed in our thoughtfully designed Standard Room. Each room features a plush queen bed with premium linens, a modern workspace, and a private bathroom with complimentary toiletries. Enjoy the convenience of high-speed WiFi, a flat-screen TV with cable channels, and climate control for your comfort.",
    price: 45000,
    image: roomStandard,
    gallery: [roomStandard, roomDeluxe],
    guests: 2,
    size: "25 sqm",
    bed: "Queen Bed",
    view: "Garden View",
    amenities: [
      "Free High-Speed WiFi",
      "Air Conditioning",
      "Flat Screen TV",
      "Mini Fridge",
      "Room Service",
      "Daily Housekeeping",
      "In-Room Safe",
      "Coffee/Tea Maker",
      "Work Desk",
      "Iron & Ironing Board",
    ],
    policies: [
      "Check-in: 2:00 PM",
      "Check-out: 12:00 PM",
      "No smoking",
      "Pets not allowed",
    ],
  },
  deluxe: {
    id: "deluxe",
    name: "Deluxe Room",
    description: "Elevate your stay in our Deluxe Room featuring stunning city views and premium amenities. The perfect choice for business travelers and those seeking extra comfort and space.",
    longDescription: "Our Deluxe Room offers an enhanced experience with a king-size bed, expansive city views, and a dedicated work area. The sophisticated design combines comfort with functionality, featuring a marble bathroom with a rain shower, premium toiletries, and plush bathrobes.",
    price: 75000,
    image: roomDeluxe,
    gallery: [roomDeluxe, roomExecutive],
    guests: 2,
    size: "35 sqm",
    bed: "King Bed",
    view: "City View",
    amenities: [
      "Free High-Speed WiFi",
      "Climate Control",
      "Smart TV",
      "Mini Bar",
      "24/7 Room Service",
      "Daily Housekeeping",
      "In-Room Safe",
      "Nespresso Machine",
      "Executive Work Desk",
      "Iron & Ironing Board",
      "Bathrobe & Slippers",
      "Rain Shower",
    ],
    policies: [
      "Check-in: 2:00 PM",
      "Check-out: 12:00 PM",
      "No smoking",
      "Pets not allowed",
    ],
  },
  executive: {
    id: "executive",
    name: "Executive Suite",
    description: "Experience luxury in our Executive Suite with a separate living area, premium amenities, and exclusive access to our Executive Lounge.",
    longDescription: "The Executive Suite is designed for discerning travelers who appreciate space and sophistication. Featuring a separate living room, dining area, and a master bedroom with a king bed, this suite offers the comfort of home with the luxury of a five-star hotel. Enjoy complimentary access to our Executive Lounge with breakfast and evening cocktails.",
    price: 120000,
    image: roomExecutive,
    gallery: [roomExecutive, roomPresidential],
    guests: 3,
    size: "55 sqm",
    bed: "King Bed + Sofa Bed",
    view: "Panoramic City View",
    amenities: [
      "Free High-Speed WiFi",
      "Climate Control",
      "Home Theater System",
      "Full Bar",
      "24/7 Butler Service",
      "Twice Daily Housekeeping",
      "In-Room Safe",
      "Espresso Machine",
      "Executive Lounge Access",
      "Bathtub & Rain Shower",
      "Premium Toiletries",
      "Living Area",
      "Dining Table",
      "Walk-in Closet",
    ],
    policies: [
      "Check-in: 2:00 PM",
      "Check-out: 12:00 PM",
      "No smoking",
      "Pets allowed upon request",
    ],
  },
  presidential: {
    id: "presidential",
    name: "Presidential Suite",
    description: "The pinnacle of luxury - our Presidential Suite offers panoramic views, a private balcony, dedicated butler service, and exclusive amenities for an unforgettable experience.",
    longDescription: "Our Presidential Suite represents the ultimate in luxury accommodation. Spanning 100 square meters, this magnificent suite features a grand living room, private dining room, master bedroom with an en-suite spa bathroom featuring a Jacuzzi, and a separate guest room. The private balcony offers breathtaking panoramic views of the city. Enjoy personalized butler service, private check-in, and access to all hotel facilities.",
    price: 250000,
    image: roomPresidential,
    gallery: [roomPresidential, roomExecutive],
    guests: 4,
    size: "100 sqm",
    bed: "King Bed + 2 Single Beds",
    view: "360° Panoramic View",
    amenities: [
      "Free High-Speed WiFi",
      "Smart Climate Control",
      "Premium Home Theater",
      "Private Bar",
      "24/7 Butler Service",
      "Thrice Daily Housekeeping",
      "Private Safe",
      "Wine Collection",
      "VIP Lounge Access",
      "Jacuzzi & Rain Shower",
      "Luxury Toiletries",
      "Grand Living Area",
      "Private Dining Room",
      "Walk-in Closet",
      "Private Balcony",
      "Guest Bedroom",
    ],
    policies: [
      "Check-in: Flexible",
      "Check-out: Flexible",
      "No smoking",
      "Pets allowed",
      "Private check-in available",
    ],
  },
};

const RoomDetails = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const room = roomsData[roomId as keyof typeof roomsData];

  if (!room) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold">Room not found</h1>
          <Link to="/rooms" className="text-accent hover:underline mt-4 inline-block">
            Back to Rooms
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Back Button */}
      <div className="bg-secondary py-4">
        <div className="container mx-auto px-4">
          <Link to="/rooms" className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to All Rooms
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
              {room.name}
            </h1>
            <div className="flex items-center gap-4 text-primary-foreground/80">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-accent text-accent" />
                <Star className="h-5 w-5 fill-accent text-accent" />
                <Star className="h-5 w-5 fill-accent text-accent" />
                <Star className="h-5 w-5 fill-accent text-accent" />
                <Star className="h-5 w-5 fill-accent text-accent" />
              </div>
              <span>|</span>
              <span>{room.view}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">About This Room</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{room.description}</p>
                <p className="text-muted-foreground leading-relaxed">{room.longDescription}</p>
              </div>

              {/* Room Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-secondary rounded-lg p-4 text-center">
                  <Users className="h-6 w-6 mx-auto mb-2 text-accent" />
                  <span className="block font-semibold text-foreground">{room.guests} Guests</span>
                  <span className="text-sm text-muted-foreground">Max Capacity</span>
                </div>
                <div className="bg-secondary rounded-lg p-4 text-center">
                  <Maximize className="h-6 w-6 mx-auto mb-2 text-accent" />
                  <span className="block font-semibold text-foreground">{room.size}</span>
                  <span className="text-sm text-muted-foreground">Room Size</span>
                </div>
                <div className="bg-secondary rounded-lg p-4 text-center">
                  <Bed className="h-6 w-6 mx-auto mb-2 text-accent" />
                  <span className="block font-semibold text-foreground">{room.bed}</span>
                  <span className="text-sm text-muted-foreground">Bed Type</span>
                </div>
                <div className="bg-secondary rounded-lg p-4 text-center">
                  <Wifi className="h-6 w-6 mx-auto mb-2 text-accent" />
                  <span className="block font-semibold text-foreground">Free</span>
                  <span className="text-sm text-muted-foreground">High-Speed WiFi</span>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Room Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {room.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3 text-muted-foreground">
                      <Check className="h-5 w-5 text-accent flex-shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Policies */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Room Policies</h2>
                <div className="bg-secondary rounded-lg p-6">
                  <ul className="space-y-3">
                    {room.policies.map((policy) => (
                      <li key={policy} className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        {policy}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-40 bg-card rounded-xl shadow-luxury p-6 space-y-6">
                <div className="text-center pb-6 border-b border-border">
                  <span className="text-3xl font-bold text-foreground">
                    ₦{room.price.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">/night</span>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Check In</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Check Out</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Guests</label>
                    <select className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent">
                      {[...Array(room.guests)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} Guest{i > 0 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>

                <Link to={`/booking?room=${room.id}`}>
                  <Button variant="gold" size="xl" className="w-full">
                    Book Now
                  </Button>
                </Link>

                <p className="text-center text-sm text-muted-foreground">
                  Free cancellation up to 24 hours before check-in
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RoomDetails;
