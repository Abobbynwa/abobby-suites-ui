import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Chioma Adeyemi",
    role: "Business Executive",
    rating: 5,
    comment: "The service at ABOBBY NWA AND SUITE is exceptional. The staff went above and beyond to make my stay comfortable. I'll definitely be returning!",
    avatar: "CA",
  },
  {
    id: 2,
    name: "Michael Okonkwo",
    role: "Travel Blogger",
    rating: 5,
    comment: "One of the best hotels I've stayed at in Lagos. The rooms are spacious, clean, and beautifully decorated. The restaurant serves amazing local and international cuisine.",
    avatar: "MO",
  },
  {
    id: 3,
    name: "Amara Johnson",
    role: "Corporate Client",
    rating: 5,
    comment: "We hosted our company retreat here and it was perfect. The conference facilities are top-notch and the catering was excellent.",
    avatar: "AJ",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-medium tracking-wider uppercase text-sm">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 mb-4">
            What Our Guests Say
          </h2>
          <p className="text-primary-foreground/80">
            Don't just take our word for it - hear from our satisfied guests.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-8 relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 h-10 w-10 text-accent/30" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                "{testimonial.comment}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-primary-foreground/60">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
