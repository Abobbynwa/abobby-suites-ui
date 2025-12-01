import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Bed, CreditCard, ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const rooms = [
  { id: "standard", name: "Standard Room", price: 45000 },
  { id: "deluxe", name: "Deluxe Room", price: 75000 },
  { id: "executive", name: "Executive Suite", price: 120000 },
  { id: "presidential", name: "Presidential Suite", price: 250000 },
];

const Booking = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const preselectedRoom = searchParams.get("room") || "";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    room: preselectedRoom,
    guests: "1",
    specialRequests: "",
  });

  const [step, setStep] = useState(1);

  const selectedRoom = rooms.find((r) => r.id === formData.room);

  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diff = end.getTime() - start.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const nights = calculateNights();
  const subtotal = selectedRoom ? selectedRoom.price * nights : 0;
  const tax = subtotal * 0.075; // 7.5% VAT
  const total = subtotal + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Handle final submission
      toast({
        title: "Booking Submitted!",
        description: "Redirecting to payment page...",
      });
      // In a real app, redirect to payment
      window.location.href = "/payment";
    }
  };

  const validateStep1 = () => {
    return formData.checkIn && formData.checkOut && formData.room && formData.guests && nights > 0;
  };

  const validateStep2 = () => {
    return formData.firstName && formData.lastName && formData.email && formData.phone;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Book Your Stay
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Complete your reservation in just a few simple steps.
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="bg-secondary py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {[
              { num: 1, label: "Select Room" },
              { num: 2, label: "Guest Details" },
              { num: 3, label: "Review & Pay" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= s.num
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s.num ? <Check className="h-4 w-4" /> : s.num}
                  </div>
                  <span className={`hidden md:inline ${step >= s.num ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                </div>
                {i < 2 && (
                  <div className={`w-12 md:w-24 h-0.5 mx-2 md:mx-4 ${step > s.num ? "bg-accent" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Room Selection */}
                {step === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                      Select Your Room & Dates
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Check In Date *</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <input
                            type="date"
                            name="checkIn"
                            value={formData.checkIn}
                            onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Check Out Date *</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <input
                            type="date"
                            name="checkOut"
                            value={formData.checkOut}
                            onChange={handleChange}
                            min={formData.checkIn || new Date().toISOString().split("T")[0]}
                            className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Select Room Type *</label>
                      <div className="relative">
                        <Bed className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <select
                          name="room"
                          value={formData.room}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent appearance-none"
                          required
                        >
                          <option value="">Select a room</option>
                          {rooms.map((room) => (
                            <option key={room.id} value={room.id}>
                              {room.name} - ₦{room.price.toLocaleString()}/night
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Number of Guests *</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent appearance-none"
                          required
                        >
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests</option>
                        </select>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="gold"
                      size="xl"
                      className="w-full md:w-auto"
                      disabled={!validateStep1()}
                    >
                      Continue
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </div>
                )}

                {/* Step 2: Guest Details */}
                {step === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                      Guest Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+234"
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Special Requests</label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Any special requests or requirements?"
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent resize-none"
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button
                        type="submit"
                        variant="gold"
                        size="lg"
                        disabled={!validateStep2()}
                      >
                        Continue
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                      Review Your Booking
                    </h2>

                    <div className="bg-secondary rounded-lg p-6 space-y-4">
                      <h3 className="font-semibold text-foreground">Booking Details</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Room Type:</span>
                          <p className="font-medium text-foreground">{selectedRoom?.name}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Guests:</span>
                          <p className="font-medium text-foreground">{formData.guests}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Check In:</span>
                          <p className="font-medium text-foreground">{formData.checkIn}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Check Out:</span>
                          <p className="font-medium text-foreground">{formData.checkOut}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-secondary rounded-lg p-6 space-y-4">
                      <h3 className="font-semibold text-foreground">Guest Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Name:</span>
                          <p className="font-medium text-foreground">{formData.firstName} {formData.lastName}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Email:</span>
                          <p className="font-medium text-foreground">{formData.email}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Phone:</span>
                          <p className="font-medium text-foreground">{formData.phone}</p>
                        </div>
                      </div>
                      {formData.specialRequests && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">Special Requests:</span>
                          <p className="font-medium text-foreground">{formData.specialRequests}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <Button type="button" variant="outline" size="lg" onClick={() => setStep(2)}>
                        Back
                      </Button>
                      <Button type="submit" variant="gold" size="lg">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Proceed to Payment
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Price Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-40 bg-card rounded-xl shadow-luxury p-6 space-y-6">
                <h3 className="font-serif text-xl font-bold text-foreground">Booking Summary</h3>

                {selectedRoom && nights > 0 ? (
                  <>
                    <div className="space-y-3 pb-4 border-b border-border">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{selectedRoom.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">₦{selectedRoom.price.toLocaleString()} × {nights} night{nights > 1 ? "s" : ""}</span>
                        <span className="text-foreground">₦{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">VAT (7.5%)</span>
                        <span className="text-foreground">₦{tax.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                      <span className="text-foreground">Total</span>
                      <span className="text-accent">₦{total.toLocaleString()}</span>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Select your room and dates to see the price breakdown.
                  </p>
                )}

                <div className="text-xs text-muted-foreground space-y-2">
                  <p>• Free cancellation up to 24 hours before check-in</p>
                  <p>• Prices include all taxes and fees</p>
                  <p>• Secure payment processing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Booking;
