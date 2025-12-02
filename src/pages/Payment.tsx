import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Building2, 
  Smartphone, 
  Wallet, 
  Clock, 
  Check, 
  Shield,
  Lock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    description: "Visa, Mastercard, Verve",
    icon: CreditCard,
  },
  {
    id: "paystack",
    name: "Paystack",
    description: "Fast & secure payment",
    icon: Smartphone,
  },
  {
    id: "flutterwave",
    name: "Flutterwave",
    description: "Multiple payment options",
    icon: Wallet,
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "International payments",
    icon: Wallet,
  },
  {
    id: "bank",
    name: "Bank Transfer",
    description: "Direct bank transfer",
    icon: Building2,
  },
  {
    id: "arrival",
    name: "Pay on Arrival",
    description: "Pay at hotel check-in",
    icon: Clock,
  },
];

const Payment = () => {
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [processing, setProcessing] = useState(false);

  // Mock booking data - in a real app, this would come from context/state
  const bookingData = {
    room: "Deluxe Room",
    checkIn: "2024-02-15",
    checkOut: "2024-02-18",
    nights: 3,
    guests: 2,
    subtotal: 225000,
    tax: 16875,
    total: 241875,
  };

  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === "number") {
      formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim().slice(0, 19);
    }
    // Format expiry date
    if (name === "expiry") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").slice(0, 5);
    }
    // Limit CVV
    if (name === "cvv") {
      formattedValue = value.slice(0, 4);
    }

    setCardData({ ...cardData, [name]: formattedValue });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setProcessing(false);
    toast({
      title: "Payment Successful!",
      description: "Your booking has been confirmed. Check your email for details.",
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            Secure Payment
          </h1>
          <p className="text-primary-foreground/80">
            Complete your booking with our secure payment system
          </p>
        </div>
      </section>

      {/* Payment Form */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Methods */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl shadow-luxury p-6 mb-6">
                <h2 className="font-serif text-xl font-bold text-foreground mb-6">
                  Select Payment Method
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedMethod === method.id
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <method.icon className={`h-6 w-6 mb-2 ${
                        selectedMethod === method.id ? "text-accent" : "text-muted-foreground"
                      }`} />
                      <h3 className="font-medium text-foreground text-sm">{method.name}</h3>
                      <p className="text-xs text-muted-foreground">{method.description}</p>
                    </button>
                  ))}
                </div>

                {/* Payment Form based on selected method */}
                <form onSubmit={handlePayment}>
                  {selectedMethod === "card" && (
                    <div className="space-y-4 animate-fade-in">
                      <h3 className="font-semibold text-foreground mb-4">Card Details</h3>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <input
                            type="text"
                            name="number"
                            value={cardData.number}
                            onChange={handleCardChange}
                            placeholder="1234 5678 9012 3456"
                            className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          name="name"
                          value={cardData.name}
                          onChange={handleCardChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Expiry Date</label>
                          <input
                            type="text"
                            name="expiry"
                            value={cardData.expiry}
                            onChange={handleCardChange}
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            value={cardData.cvv}
                            onChange={handleCardChange}
                            placeholder="123"
                            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {(selectedMethod === "paystack" || selectedMethod === "flutterwave" || selectedMethod === "paypal") && (
                    <div className="text-center py-8 animate-fade-in">
                      <p className="text-muted-foreground mb-4">
                        You will be redirected to {paymentMethods.find(m => m.id === selectedMethod)?.name} to complete your payment securely.
                      </p>
                    </div>
                  )}

                  {selectedMethod === "bank" && (
                    <div className="space-y-4 animate-fade-in">
                      <h3 className="font-semibold text-foreground mb-4">Bank Transfer Details</h3>
                      <div className="bg-secondary rounded-lg p-4 space-y-4">
                        <div className="pb-3 border-b border-border">
                          <span className="text-xs text-muted-foreground uppercase tracking-wide">Option 1 - Opay</span>
                          <p className="font-medium text-foreground mt-1">AGABA VALENTINE NKWADOCHUKWU</p>
                          <p className="text-accent font-semibold">8149642220</p>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground uppercase tracking-wide">Option 2 - Access Bank</span>
                          <p className="font-medium text-foreground mt-1">AGABA VALENTINE NKWADOCHUKWU</p>
                          <p className="text-accent font-semibold">1958811618</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Please use your booking reference as the payment description. 
                        Your booking will be confirmed once payment is verified (within 24 hours).
                      </p>
                    </div>
                  )}

                  {selectedMethod === "arrival" && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                        <h3 className="font-semibold text-foreground mb-2">Pay on Arrival</h3>
                        <p className="text-sm text-muted-foreground">
                          Your room will be reserved and you can pay at the hotel reception during check-in. 
                          Please note that a valid ID will be required.
                        </p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Check className="h-4 w-4 text-accent" />
                          Room held for 24 hours
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Check className="h-4 w-4 text-accent" />
                          No advance payment required
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Check className="h-4 w-4 text-accent" />
                          Pay with cash or card at check-in
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-8">
                    <Button
                      type="submit"
                      variant="gold"
                      size="xl"
                      className="w-full"
                      disabled={processing}
                    >
                      {processing ? (
                        "Processing..."
                      ) : (
                        <>
                          <Lock className="h-5 w-5 mr-2" />
                          {selectedMethod === "arrival" ? "Confirm Reservation" : `Pay ₦${bookingData.total.toLocaleString()}`}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Security Notice */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Shield className="h-10 w-10 text-accent flex-shrink-0" />
                <p>
                  Your payment information is encrypted and secure. We use industry-standard SSL 
                  encryption to protect your personal and financial data.
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-40 bg-card rounded-xl shadow-luxury p-6 space-y-6">
                <h3 className="font-serif text-xl font-bold text-foreground">Booking Summary</h3>

                <div className="space-y-4 pb-4 border-b border-border">
                  <div>
                    <h4 className="font-semibold text-foreground">{bookingData.room}</h4>
                    <p className="text-sm text-muted-foreground">{bookingData.guests} Guests</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Check In</span>
                      <p className="font-medium text-foreground">{bookingData.checkIn}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Check Out</span>
                      <p className="font-medium text-foreground">{bookingData.checkOut}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pb-4 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Room ({bookingData.nights} nights)</span>
                    <span className="text-foreground">₦{bookingData.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">VAT (7.5%)</span>
                    <span className="text-foreground">₦{bookingData.tax.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-foreground">Total</span>
                  <span className="text-accent">₦{bookingData.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Payment;
