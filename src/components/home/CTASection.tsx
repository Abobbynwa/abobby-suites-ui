import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="bg-primary rounded-2xl p-12 md:p-16 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-accent font-medium tracking-wider uppercase text-sm">
              Limited Time Offer
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mt-2 mb-4">
              Book Now & Save Up To 25%
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Experience luxury at unbeatable prices. Book your stay today and enjoy 
              exclusive discounts on our premium rooms and suites.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button variant="hero" size="xl">
                  Reserve Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:+2348012345678">
                <Button variant="outline-light" size="xl">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
