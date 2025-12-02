import { Layout } from "@/components/layout/Layout";
import { Award, Users, Clock, Heart } from "lucide-react";
import heroImage from "@/assets/hero-lobby.jpg";

const stats = [
  { icon: Award, value: "15+", label: "Years of Excellence" },
  { icon: Users, value: "50,000+", label: "Happy Guests" },
  { icon: Clock, value: "24/7", label: "Customer Service" },
  { icon: Heart, value: "98%", label: "Satisfaction Rate" },
];

const team = [
  {
    name: "Chief Agaba Valentine ",
    role: "Founder & Chairman",
    bio: "Visionary entrepreneur with over 20 years in hospitality.",
    avatar: "NO",
  },
  {
    name: "Hon Agaba Joseph",
    role: "General Manager",
    bio: "Expert in hotel operations and guest experience management.",
    avatar: "AE",
  },
  {
    name: "Mr. Emeka Udoh",
    role: "Head of Operations",
    bio: "Ensuring seamless operations and exceptional service delivery.",
    avatar: "EU",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="ABOBBY NWA AND SUITE lobby"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            About Us
          </h1>
          <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
            Discover the story behind ABOBBY NWA AND SUITE
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-medium tracking-wider uppercase text-sm">
                Our Story
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                A Legacy of Nigerian Hospitality
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2009, ABOBBY NWA AND SUITE has grown from a modest guesthouse 
                  to one of the premier luxury hotels in Nigeria. Our journey began with a 
                  simple vision: to provide world-class hospitality that reflects the warmth 
                  and richness of Nigerian culture.
                </p>
                <p>
                  Named after the founder's grandfather, "AGABA," the hotel embodies 
                  the traditional values of respect, generosity, and excellence that have 
                  been passed down through generations.
                </p>
                <p>
                  Today, we continue to uphold these values while embracing modern luxury 
                  and innovation. Every guest who walks through our doors becomes part of 
                  our extended family, and we take pride in creating unforgettable experiences.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-secondary rounded-xl p-6 text-center hover:bg-accent/10 transition-colors"
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-accent" />
                  <span className="block text-3xl font-bold text-foreground">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl p-8 shadow-luxury">
              <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
                Our Mission
              </span>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                Excellence in Every Detail
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide exceptional hospitality experiences that exceed expectations, 
                combining world-class amenities with authentic Nigerian warmth. We strive 
                to make every guest feel at home while enjoying the finest luxury accommodations.
              </p>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-luxury">
              <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
                Our Vision
              </span>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                Setting the Standard
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To be recognized as the leading hospitality brand in West Africa, 
                setting new standards for luxury, service, and sustainability. We aim 
                to showcase the best of Nigerian hospitality to the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-medium tracking-wider uppercase text-sm">
              Leadership
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground">
              Our dedicated leadership team brings decades of combined experience in hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-card rounded-xl p-8 text-center shadow-luxury hover:shadow-luxury-lg transition-shadow"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl font-bold">
                  {member.avatar}
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-accent text-sm mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-medium tracking-wider uppercase text-sm">
              What We Stand For
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 mb-4">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "Excellence", desc: "Striving for perfection in every service we provide." },
              { title: "Integrity", desc: "Operating with honesty and transparency at all times." },
              { title: "Hospitality", desc: "Treating every guest as family with warmth and care." },
              { title: "Innovation", desc: "Continuously improving to exceed guest expectations." },
            ].map((value) => (
              <div
                key={value.title}
                className="text-center p-6 rounded-xl bg-primary-foreground/5 backdrop-blur-sm"
              >
                <h3 className="font-serif text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-primary-foreground/80 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
