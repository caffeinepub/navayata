import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronRight,
  Facebook,
  Instagram,
  Menu,
  MessageCircle,
  RotateCcw,
  Star,
  TrendingUp,
  Truck,
  Twitter,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const WA_LINK = "https://wa.me/918910883176";

const products = [
  {
    id: 1,
    name: "Ethnic Kurta Set",
    price: "\u20b9499",
    image: "/assets/generated/product-ethnic-kurta.dim_400x500.jpg",
    tag: "Bestseller",
    waText: "Hi%2C%20I%27m%20interested%20in%20the%20Ethnic%20Kurta%20Set",
  },
  {
    id: 2,
    name: "Casual Cotton Tee",
    price: "\u20b9299",
    image: "/assets/generated/product-casual-tee.dim_400x500.jpg",
    tag: "New",
    waText: "Hi%2C%20I%27m%20interested%20in%20the%20Casual%20Cotton%20Tee",
  },
  {
    id: 3,
    name: "Formal Dress Shirt",
    price: "\u20b9599",
    image: "/assets/generated/product-formal-shirt.dim_400x500.jpg",
    tag: "Popular",
    waText: "Hi%2C%20I%27m%20interested%20in%20the%20Formal%20Dress%20Shirt",
  },
  {
    id: 4,
    name: "Party Wear Lehenga",
    price: "\u20b9699",
    image: "/assets/generated/product-party-wear.dim_400x500.jpg",
    tag: "Premium",
    waText: "Hi%2C%20I%27m%20interested%20in%20the%20Party%20Wear%20Lehenga",
  },
];

const features = [
  { icon: Star, label: "Premium Quality", desc: "Handpicked fabrics" },
  { icon: TrendingUp, label: "Latest Trends", desc: "Always in style" },
  { icon: Truck, label: "Fast Delivery", desc: "Pan India shipping" },
  { icon: RotateCcw, label: "Easy Returns", desc: "Hassle-free policy" },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
        } border-b border-border`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2"
            data-ocid="nav.link"
          >
            <span className="font-display text-2xl font-bold text-foreground tracking-tight">
              Nava<span className="text-primary">yata</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="nav.primary_button"
            >
              <Button className="hidden sm:flex rounded-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-5">
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </Button>
            </a>
            <button
              type="button"
              className="md:hidden p-2 rounded-lg hover:bg-muted"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-ocid="nav.toggle"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-left py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="nav.primary_button"
            >
              <Button className="w-full rounded-full bg-primary text-primary-foreground gap-2 mt-2">
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </Button>
            </a>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-white via-[oklch(97%_0.01_264)] to-white"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold rounded-full px-4 py-1.5 animate-float-up">
                  <Star className="w-3 h-3 fill-primary" />
                  New Collection 2026
                </div>
                <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground leading-tight animate-float-up-delay">
                  Style That
                  <span className="text-primary block">Speaks.</span>
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed animate-float-up-delay-2">
                  Discover our exclusive clothing collection crafted for every
                  occasion — from ethnic elegance to everyday comfort.
                </p>
                <div className="flex flex-wrap gap-3 animate-float-up-delay-2">
                  <Button
                    onClick={() => scrollTo("#collections")}
                    className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-7 py-3 h-auto text-base font-semibold shadow-lg hover:shadow-primary/25 transition-all"
                    data-ocid="hero.primary_button"
                  >
                    Shop Now
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="hero.secondary_button"
                  >
                    <Button
                      variant="outline"
                      className="rounded-full border-primary text-primary hover:bg-primary/5 px-7 py-3 h-auto text-base font-semibold gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Contact on WhatsApp
                    </Button>
                  </a>
                </div>
                <div className="flex items-center gap-6 pt-2">
                  <div className="text-center">
                    <div className="font-bold text-xl text-foreground">
                      500+
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Happy Customers
                    </div>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="text-center">
                    <div className="font-bold text-xl text-foreground">
                      100+
                    </div>
                    <div className="text-xs text-muted-foreground">Designs</div>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="text-center">
                    <div className="font-bold text-xl text-foreground">
                      4.9★
                    </div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative flex justify-center animate-float-up-delay">
                <div className="relative w-full max-w-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl transform rotate-3" />
                  <img
                    src="/assets/generated/hero-clothing.dim_800x600.jpg"
                    alt="Navayata Collection"
                    className="relative rounded-3xl shadow-card-hover w-full object-cover aspect-[4/3]"
                  />
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-card px-4 py-3 flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">
                        Order via WhatsApp
                      </div>
                      <div className="text-xs text-muted-foreground">
                        +91 8910883176
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Strip */}
        <section className="bg-[oklch(97%_0.01_264)] border-y border-border py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-card"
                >
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">
                      {label}
                    </div>
                    <div className="text-xs text-muted-foreground">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Collections Section */}
        <section id="collections" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold rounded-full px-4 py-1.5 mb-4">
                <TrendingUp className="w-3 h-3" />
                New Arrivals
              </div>
              <h2 className="font-display text-4xl font-bold text-foreground mb-3">
                Our Collections
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Handpicked styles for every mood and occasion.
              </p>
            </div>

            <div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              data-ocid="collections.list"
            >
              {products.map((product, idx) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                  data-ocid={`collections.item.${idx + 1}`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      {product.tag}
                    </span>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {product.name}
                      </h3>
                      <p className="text-primary font-bold text-lg">
                        {product.price}
                      </p>
                    </div>
                    <a
                      href={`${WA_LINK}?text=${product.waText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-ocid={`collections.primary_button.${idx + 1}`}
                    >
                      <Button className="w-full rounded-full bg-green-600 hover:bg-green-700 text-white gap-2 text-sm">
                        <MessageCircle className="w-4 h-4" />
                        Enquire on WhatsApp
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-[oklch(97%_0.01_264)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold rounded-full px-4 py-1.5">
                  About Us
                </div>
                <h2 className="font-display text-4xl font-bold text-foreground leading-tight">
                  Crafted With
                  <span className="text-primary block">Passion &amp; Care</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Navayata is more than a clothing brand — it&apos;s a
                  celebration of style, culture, and craftsmanship. We curate
                  collections that blend timeless elegance with modern trends,
                  ensuring every piece you wear tells a story. From vibrant
                  ethnic wear to contemporary casuals, our designs are crafted
                  with premium fabrics and meticulous attention to detail.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We believe fashion should be accessible to all without
                  compromising on quality. That&apos;s why we offer direct
                  ordering via WhatsApp — making your shopping experience
                  personal, fast, and convenient.
                </p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="about.primary_button"
                >
                  <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-7">
                    <MessageCircle className="w-4 h-4" />
                    Chat With Us
                  </Button>
                </a>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 shadow-card text-center space-y-2">
                  <div className="font-display text-4xl font-bold text-primary">
                    500+
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    Happy Customers
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Across India
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-card text-center space-y-2 mt-8">
                  <div className="font-display text-4xl font-bold text-primary">
                    100+
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    Unique Designs
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Every season
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-card text-center space-y-2">
                  <div className="font-display text-4xl font-bold text-primary">
                    4.9★
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    Customer Rating
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Verified reviews
                  </div>
                </div>
                <div className="bg-primary rounded-2xl p-6 shadow-card text-center space-y-2 mt-8">
                  <div className="font-display text-4xl font-bold text-primary-foreground">
                    3+
                  </div>
                  <div className="text-sm font-medium text-primary-foreground">
                    Years of Trust
                  </div>
                  <div className="text-xs text-primary-foreground/70">
                    Est. 2022
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section id="contact" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-br from-primary to-[oklch(45%_0.25_264)] rounded-3xl p-10 md:p-16 text-center space-y-6">
              <h2 className="font-display text-4xl font-bold text-white">
                Ready to Shop?
              </h2>
              <p className="text-white/80 max-w-md mx-auto text-lg">
                Message us directly on WhatsApp to place orders, ask about
                availability, or get styling advice.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.primary_button"
                >
                  <Button className="rounded-full bg-white text-primary hover:bg-white/90 gap-2 px-8 py-3 h-auto text-base font-semibold shadow-lg">
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </Button>
                </a>
                <div className="text-white/90 font-semibold text-lg">
                  +91 8910883176
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[oklch(18%_0.02_264)] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4 md:col-span-1">
              <span className="font-display text-2xl font-bold">
                Nava<span className="text-primary">yata</span>
              </span>
              <p className="text-white/60 text-sm leading-relaxed">
                Your trusted destination for premium clothing. Style for every
                occasion.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  data-ocid="footer.link"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  data-ocid="footer.link"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  data-ocid="footer.link"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.href)}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                      data-ocid="footer.link"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider">
                Categories
              </h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Ethnic Wear</li>
                <li>Casual Wear</li>
                <li>Formal Wear</li>
                <li>Party Wear</li>
                <li>Accessories</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider">
                Contact
              </h4>
              <div className="space-y-2 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <a
                    href={WA_LINK}
                    className="hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="footer.link"
                  >
                    +91 8910883176
                  </a>
                </div>
                <p className="text-white/40 text-xs">
                  Available Mon–Sat, 10am – 8pm
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/40 text-xs">
              &copy; {new Date().getFullYear()} Navayata. All rights reserved.
            </p>
            <p className="text-white/30 text-xs">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/60 transition-colors underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg whatsapp-pulse transition-colors"
        aria-label="Chat on WhatsApp"
        data-ocid="whatsapp.primary_button"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
