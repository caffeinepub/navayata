import { LotusDecor } from "@/components/LotusDecor";
import { MandalaDecor } from "@/components/MandalaDecor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronRight,
  Facebook,
  Instagram,
  Loader2,
  Menu,
  MessageCircle,
  RotateCcw,
  Settings,
  Star,
  TrendingUp,
  Truck,
  Twitter,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useGetAllProducts, useGetFee } from "../hooks/useQueries";

const WA_BASE = "https://wa.me/918910883176";

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

const socialLinks = [
  { href: "https://instagram.com", Icon: Instagram },
  { href: "https://facebook.com", Icon: Facebook },
  { href: "https://twitter.com", Icon: Twitter },
];

const aboutStats = [
  { val: "500+", label: "Happy Customers", sub: "Across India", offset: false },
  { val: "100+", label: "Unique Designs", sub: "Every season", offset: true },
  {
    val: "4.9★",
    label: "Customer Rating",
    sub: "Verified reviews",
    offset: false,
  },
  {
    val: "3+",
    label: "Years of Trust",
    sub: "Est. 2022",
    offset: true,
    highlight: true,
  },
];

function PaisleyBorderTop({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 20"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,10 Q20,2 40,10 Q60,18 80,10 Q100,2 120,10 Q140,18 160,10 Q180,2 200,10 Q220,18 240,10 Q260,2 280,10 Q300,18 320,10 Q340,2 360,10 Q380,18 400,10"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M0,14 Q20,6 40,14 Q60,22 80,14 Q100,6 120,14 Q140,22 160,14 Q180,6 200,14 Q220,22 240,14 Q260,6 280,14 Q300,22 320,14 Q340,6 360,14 Q380,22 400,14"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray="2 4"
      />
    </svg>
  );
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: products = [], isLoading: loadingProducts } =
    useGetAllProducts();
  const { data: fee } = useGetFee();

  const feeAmount = fee !== undefined ? Number(fee) : null;

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
    <div className="min-h-screen bg-background font-body">
      {/* ── Sticky Header ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-secondary/97 backdrop-blur-md shadow-maroon"
            : "bg-secondary"
        }`}
      >
        <div className="h-[3px] w-full bg-gradient-to-r from-accent/40 via-accent to-accent/40" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2"
            data-ocid="nav.link"
          >
            <img
              src="/assets/file_00000000dabc7208bcffbe2575fd7f9b-019d23fb-97d7-7222-bf8a-7fe7d7362a59.png"
              alt="Navayata"
              className="h-10 w-auto object-contain"
            />
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-secondary-foreground/75 hover:text-accent transition-colors tracking-widest uppercase"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
            <a
              href="/admin"
              className="text-sm font-medium text-secondary-foreground/40 hover:text-accent/60 transition-colors tracking-widest uppercase flex items-center gap-1"
              data-ocid="nav.link"
            >
              <Settings className="w-3 h-3" />
              Admin
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={WA_BASE}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="nav.primary_button"
            >
              <Button className="hidden sm:flex rounded-none bg-transparent border border-accent text-accent hover:bg-accent hover:text-accent-foreground gap-2 px-5 uppercase tracking-widest text-xs transition-all">
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </Button>
            </a>
            <button
              type="button"
              className="md:hidden p-2 rounded hover:bg-secondary-foreground/10 text-secondary-foreground"
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

        {mobileMenuOpen && (
          <div className="md:hidden bg-secondary border-t border-accent/20 px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-left py-2 text-sm font-medium text-secondary-foreground/80 hover:text-accent transition-colors uppercase tracking-widest"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
            <a
              href="/admin"
              className="py-2 text-sm font-medium text-secondary-foreground/40 hover:text-accent/60 transition-colors uppercase tracking-widest flex items-center gap-1"
              data-ocid="nav.link"
            >
              <Settings className="w-3 h-3" />
              Admin
            </a>
            <a
              href={WA_BASE}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="nav.primary_button"
            >
              <Button className="w-full rounded-none border border-accent bg-transparent text-accent hover:bg-accent hover:text-accent-foreground gap-2 mt-2 uppercase tracking-widest text-xs">
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </Button>
            </a>
          </div>
        )}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </header>

      <main>
        {/* ── Hero Section ── */}
        <section
          id="home"
          className="pt-16 min-h-screen flex items-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(30% 0.13 18) 0%, oklch(38% 0.15 20) 40%, oklch(30% 0.1 25) 100%)",
          }}
        >
          <div className="absolute inset-0 jali-bg opacity-30" />
          <div className="absolute -top-20 -right-20 w-80 h-80 text-accent/15 mandala-rotate pointer-events-none">
            <MandalaDecor className="w-full h-full" />
          </div>
          <div
            className="absolute -bottom-24 -left-24 w-72 h-72 text-accent/10 pointer-events-none"
            style={{ animation: "mandala-spin 80s linear infinite reverse" }}
          >
            <MandalaDecor className="w-full h-full" />
          </div>
          <div className="absolute inset-4 md:inset-8 border border-accent/20 pointer-events-none" />
          <div className="absolute inset-5 md:inset-9 border border-accent/10 pointer-events-none" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 w-full relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-7">
                <div className="inline-flex items-center gap-2 border border-accent/50 text-accent text-xs font-medium tracking-[0.2em] uppercase px-4 py-2 animate-float-up">
                  <Star className="w-3 h-3 fill-accent" />
                  New Collection 2026
                </div>

                <div className="animate-float-up-delay">
                  <h1
                    className="font-display text-5xl md:text-7xl font-bold leading-tight"
                    style={{ color: "oklch(95% 0.03 80)" }}
                  >
                    शैली जो
                  </h1>
                  <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight text-accent">
                    बोलती है।
                  </h1>
                  <p
                    className="font-display text-2xl md:text-3xl italic mt-1"
                    style={{ color: "oklch(85% 0.04 80)" }}
                  >
                    Style that Speaks.
                  </p>
                </div>

                <p
                  className="leading-relaxed animate-float-up-delay-2 text-lg"
                  style={{ color: "oklch(80% 0.03 75)" }}
                >
                  Discover our exclusive clothing collection crafted for every
                  occasion — from ethnic elegance to everyday comfort. Rooted in
                  heritage, dressed for today.
                </p>

                <div className="flex flex-wrap gap-4 animate-float-up-delay-2">
                  <Button
                    onClick={() => scrollTo("#collections")}
                    className="rounded-none bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3 h-auto text-sm font-semibold shadow-gold uppercase tracking-widest transition-all"
                    data-ocid="hero.primary_button"
                  >
                    Explore Collections
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                  <a
                    href={WA_BASE}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="hero.secondary_button"
                  >
                    <Button
                      className="rounded-none border border-secondary-foreground/50 bg-transparent px-8 py-3 h-auto text-sm font-semibold gap-2 uppercase tracking-widest transition-all hover:border-accent hover:text-accent"
                      style={{ color: "oklch(85% 0.03 75)" }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp Enquiry
                    </Button>
                  </a>
                </div>

                <div className="flex items-center gap-6 pt-2 animate-float-up-delay-2">
                  <div className="text-center">
                    <div className="font-display font-bold text-2xl text-accent">
                      500+
                    </div>
                    <div
                      className="text-xs uppercase tracking-widest"
                      style={{ color: "oklch(65% 0.04 75)" }}
                    >
                      Happy Customers
                    </div>
                  </div>
                  <div className="w-px h-10 bg-accent/25" />
                  <div className="text-center">
                    <div className="font-display font-bold text-2xl text-accent">
                      100+
                    </div>
                    <div
                      className="text-xs uppercase tracking-widest"
                      style={{ color: "oklch(65% 0.04 75)" }}
                    >
                      Designs
                    </div>
                  </div>
                  <div className="w-px h-10 bg-accent/25" />
                  <div className="text-center">
                    <div className="font-display font-bold text-2xl text-accent">
                      4.9★
                    </div>
                    <div
                      className="text-xs uppercase tracking-widest"
                      style={{ color: "oklch(65% 0.04 75)" }}
                    >
                      Rating
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex justify-center animate-float-up-delay">
                <div className="relative w-full max-w-lg">
                  <div className="absolute -inset-3 border-2 border-accent/40" />
                  <div className="absolute -inset-5 border border-accent/20" />
                  <div className="absolute -top-5 -left-5 w-8 h-8 border-t-2 border-l-2 border-accent" />
                  <div className="absolute -top-5 -right-5 w-8 h-8 border-t-2 border-r-2 border-accent" />
                  <div className="absolute -bottom-5 -left-5 w-8 h-8 border-b-2 border-l-2 border-accent" />
                  <div className="absolute -bottom-5 -right-5 w-8 h-8 border-b-2 border-r-2 border-accent" />
                  <img
                    src="/assets/generated/hero-clothing.dim_800x600.jpg"
                    alt="Navayata Collection"
                    className="w-full object-cover aspect-[4/3] relative"
                  />
                  <div className="absolute -bottom-5 -left-5 bg-secondary border border-accent/50 px-4 py-3 flex items-center gap-3 shadow-maroon">
                    <div className="w-9 h-9 bg-green-700/30 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-secondary-foreground/90 uppercase tracking-wider">
                        Order via WhatsApp
                      </div>
                      <div className="text-xs text-accent">+91 8910883176</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lotus Divider */}
        <div className="relative bg-background">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          <div className="py-6 flex items-center justify-center">
            <LotusDecor className="w-64 h-auto text-accent/50" />
          </div>
        </div>

        {/* Features Strip */}
        <section
          className="py-12 border-y border-border relative overflow-hidden"
          style={{ background: "oklch(94% 0.025 75)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-5 overflow-hidden text-accent/20">
            <PaisleyBorderTop className="w-full h-full" />
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-5 card-ornate"
                >
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-sm text-foreground">
                      {label}
                    </div>
                    <div className="text-xs text-muted-foreground">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-5 overflow-hidden text-accent/20 rotate-180">
            <PaisleyBorderTop className="w-full h-full" />
          </div>
        </section>

        {/* Collections Section */}
        <section id="collections" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-[0.35em] text-primary mb-3">
                ✦ New Arrivals ✦
              </p>
              <h2 className="font-display text-5xl font-bold text-foreground mb-4">
                Our Collections
              </h2>
              <LotusDecor className="w-56 h-auto mx-auto text-accent/40 my-3" />
              <p className="text-muted-foreground max-w-md mx-auto text-lg">
                Handpicked styles for every mood and occasion.
              </p>
              {feeAmount !== null && feeAmount > 0 && (
                <p className="text-sm text-muted-foreground mt-2 flex items-center justify-center gap-1">
                  <Truck className="w-4 h-4 text-primary" />
                  Delivery charges:{" "}
                  <span className="font-semibold text-foreground">
                    ₹{feeAmount}
                  </span>
                </p>
              )}
              {feeAmount === 0 && (
                <p className="text-sm text-green-700 mt-2 flex items-center justify-center gap-1">
                  <Truck className="w-4 h-4" />
                  Free Delivery on all orders!
                </p>
              )}
            </div>

            {loadingProducts ? (
              <div
                className="flex justify-center items-center py-20"
                data-ocid="collections.loading_state"
              >
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : products.length === 0 ? (
              <div
                className="text-center py-20 text-muted-foreground"
                data-ocid="collections.empty_state"
              >
                <p className="font-display text-xl">Coming Soon</p>
                <p className="text-sm mt-2">
                  Our collection is being curated. Contact us on WhatsApp!
                </p>
                <a
                  href={WA_BASE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block"
                >
                  <Button className="rounded-none bg-secondary text-accent border border-accent/40 hover:bg-accent hover:text-accent-foreground gap-2 uppercase tracking-widest text-xs mt-4">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Us
                  </Button>
                </a>
              </div>
            ) : (
              <div
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                data-ocid="collections.list"
              >
                {products.map((product, idx) => {
                  const price = Number(product.price);
                  const waMsg = encodeURIComponent(
                    `Hi! I'm interested in ${product.name} priced at ₹${price}.\nDelivery: ₹${feeAmount ?? 0}\nPlease share more details and confirm availability.`,
                  );
                  return (
                    <Card
                      key={product.id}
                      className="group overflow-hidden rounded-none card-ornate transition-all duration-300 hover:-translate-y-1"
                      data-ocid={`collections.item.${idx + 1}`}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image.getDirectURL()}
                          alt={product.name}
                          className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-5 space-y-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
                        <div>
                          <h3 className="font-display font-semibold text-lg text-foreground">
                            {product.name}
                          </h3>
                          <p className="text-primary font-bold text-xl font-display">
                            ₹{price}
                          </p>
                          {feeAmount !== null && (
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <Truck className="w-3 h-3" />
                              Delivery:{" "}
                              {feeAmount === 0 ? "Free" : `₹${feeAmount}`}
                            </p>
                          )}
                          {product.contents && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {product.contents}
                            </p>
                          )}
                        </div>
                        <a
                          href={`${WA_BASE}?text=${waMsg}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-ocid={`collections.primary_button.${idx + 1}`}
                        >
                          <Button className="w-full rounded-none bg-secondary text-accent border border-accent/40 hover:bg-accent hover:text-accent-foreground gap-2 text-xs uppercase tracking-widest transition-all">
                            <MessageCircle className="w-4 h-4" />
                            Enquire on WhatsApp
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Lotus Divider */}
        <div className="flex items-center justify-center py-4 border-y border-border">
          <LotusDecor className="w-56 h-auto text-accent/40" />
        </div>

        {/* About Section */}
        <section
          id="about"
          className="py-20 relative overflow-hidden"
          style={{ background: "oklch(94% 0.025 75)" }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 text-primary/5 pointer-events-none">
            <MandalaDecor className="w-full h-full" />
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-14 items-center">
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-[0.35em] text-primary">
                  ✦ Our Story ✦
                </p>
                <h2 className="font-display text-5xl font-bold text-foreground leading-tight">
                  Crafted With
                  <span className="text-primary italic block">
                    Passion &amp; Care
                  </span>
                </h2>
                <LotusDecor className="w-44 h-auto text-accent/40" />
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Navayata is more than a clothing brand — it&apos;s a
                  celebration of style, culture, and craftsmanship. We curate
                  collections that blend timeless elegance with modern trends,
                  ensuring every piece you wear tells a story.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We believe fashion should be accessible to all without
                  compromising on quality. That&apos;s why we offer direct
                  ordering via WhatsApp — making your shopping experience
                  personal, fast, and convenient.
                </p>
                <a
                  href={WA_BASE}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="about.primary_button"
                >
                  <Button className="rounded-none bg-secondary text-accent border border-accent/40 hover:bg-accent hover:text-accent-foreground gap-2 px-8 uppercase tracking-widest text-xs transition-all">
                    <MessageCircle className="w-4 h-4" />
                    Chat With Us
                  </Button>
                </a>
              </div>
              <div className="grid grid-cols-2 gap-5">
                {aboutStats.map(({ val, label, sub, offset, highlight }) => (
                  <div
                    key={label}
                    className={`card-ornate p-6 text-center space-y-2 ${
                      offset ? "mt-8" : ""
                    } ${highlight ? "bg-secondary border-accent/60" : ""}`}
                  >
                    <div
                      className={`font-display text-4xl font-bold ${
                        highlight ? "text-accent" : "text-primary"
                      }`}
                    >
                      {val}
                    </div>
                    <div
                      className={`text-sm font-medium font-display ${
                        highlight
                          ? "text-secondary-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {label}
                    </div>
                    <div
                      className={`text-xs ${highlight ? "text-secondary-foreground/60" : "text-muted-foreground"}`}
                    >
                      {sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div
              className="relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, oklch(30% 0.13 18) 0%, oklch(38% 0.15 20) 50%, oklch(28% 0.1 25) 100%)",
              }}
            >
              <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-accent/50" />
              <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-accent/50" />
              <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-accent/50" />
              <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-accent/50" />
              <div className="absolute inset-6 border border-accent/15 pointer-events-none" />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-60 h-60 text-accent/10 pointer-events-none">
                <MandalaDecor className="w-full h-full" />
              </div>
              <div className="relative z-10 p-10 md:p-16 text-center space-y-7">
                <p className="text-xs uppercase tracking-[0.35em] text-accent/70">
                  ✦ Get In Touch ✦
                </p>
                <h2
                  className="font-display text-5xl font-bold"
                  style={{ color: "oklch(95% 0.03 80)" }}
                >
                  Ready to Shop?
                </h2>
                <LotusDecor className="w-48 h-auto mx-auto text-accent/40" />
                <p
                  className="max-w-md mx-auto text-lg leading-relaxed"
                  style={{ color: "oklch(75% 0.04 75)" }}
                >
                  Message us directly on WhatsApp to place orders, ask about
                  availability, or get styling advice.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href={WA_BASE}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="contact.primary_button"
                  >
                    <Button className="rounded-none bg-accent text-accent-foreground hover:bg-accent/90 gap-2 px-10 py-3 h-auto text-sm font-semibold shadow-gold uppercase tracking-widest transition-all">
                      <MessageCircle className="w-5 h-5" />
                      Chat on WhatsApp
                    </Button>
                  </a>
                  <div className="font-display text-xl text-accent">
                    +91 8910883176
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ background: "oklch(18% 0.05 22)" }}>
        <div className="h-[2px] bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
        <PaisleyBorderTop className="w-full h-6 text-accent/20" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-5 md:col-span-1">
              <span className="font-display text-3xl font-bold text-accent tracking-wide">
                Navayata
              </span>
              <p
                className="leading-relaxed text-sm"
                style={{ color: "oklch(60% 0.04 75)" }}
              >
                Your trusted destination for premium clothing. Style rooted in
                heritage, crafted for today.
              </p>
              <div className="flex gap-3">
                {socialLinks.map(({ href, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 border border-accent/30 hover:border-accent hover:text-accent flex items-center justify-center transition-colors text-secondary-foreground/50"
                    data-ocid="footer.link"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-display font-semibold text-accent text-sm uppercase tracking-[0.2em]">
                Quick Links
              </h4>
              <div className="h-px w-8 bg-accent/40" />
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.href)}
                      className="hover:text-accent text-sm transition-colors"
                      style={{ color: "oklch(60% 0.04 75)" }}
                      data-ocid="footer.link"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-display font-semibold text-accent text-sm uppercase tracking-[0.2em]">
                Categories
              </h4>
              <div className="h-px w-8 bg-accent/40" />
              <ul
                className="space-y-2 text-sm"
                style={{ color: "oklch(60% 0.04 75)" }}
              >
                <li>Ethnic Wear</li>
                <li>Casual Wear</li>
                <li>Formal Wear</li>
                <li>Party Wear</li>
                <li>Accessories</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-display font-semibold text-accent text-sm uppercase tracking-[0.2em]">
                Contact
              </h4>
              <div className="h-px w-8 bg-accent/40" />
              <div
                className="space-y-3 text-sm"
                style={{ color: "oklch(60% 0.04 75)" }}
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <a
                    href={WA_BASE}
                    className="hover:text-accent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="footer.link"
                  >
                    +91 8910883176
                  </a>
                </div>
                <p className="text-xs" style={{ color: "oklch(45% 0.04 75)" }}>
                  Available Mon–Sat, 10am – 8pm
                </p>
              </div>
            </div>
          </div>
          <LotusDecor className="w-48 h-auto mx-auto my-8 text-accent/20" />
          <div
            className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderColor: "oklch(72% 0.17 78 / 0.15)" }}
          >
            <p className="text-xs" style={{ color: "oklch(45% 0.04 75)" }}>
              &copy; {new Date().getFullYear()} Navayata. All rights reserved.
            </p>
            <p className="text-xs" style={{ color: "oklch(40% 0.04 75)" }}>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={WA_BASE}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center shadow-lg whatsapp-pulse transition-colors"
        aria-label="Chat on WhatsApp"
        data-ocid="whatsapp.primary_button"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
