import { LotusDecor } from "@/components/LotusDecor";
import { MandalaDecor } from "@/components/MandalaDecor";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useState } from "react";

const WA_NUMBER = "918910883176";

export default function InquiryPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = [
      "*New Inquiry from Navayata Website*",
      "",
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      `*City/Location:* ${form.city}`,
    ];
    if (form.message) parts.push(`*Message:* ${form.message}`);
    const text = parts.join("\n");
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-center px-4 py-16"
      style={{
        background:
          "linear-gradient(135deg, oklch(15% 0.12 260) 0%, oklch(20% 0.1 240) 50%, oklch(15% 0.08 280) 100%)",
      }}
    >
      {/* Jali overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            "repeating-linear-gradient(45deg, oklch(72% 0.17 78 / 0.04) 0px, oklch(72% 0.17 78 / 0.04) 1px, transparent 1px, transparent 12px)",
            "repeating-linear-gradient(-45deg, oklch(72% 0.17 78 / 0.04) 0px, oklch(72% 0.17 78 / 0.04) 1px, transparent 1px, transparent 12px)",
          ].join(", "),
        }}
      />

      {/* Decorative mandalas */}
      <div
        className="absolute -top-20 -left-20 w-72 h-72 pointer-events-none opacity-10 mandala-rotate"
        style={{ color: "oklch(72% 0.17 78)" }}
      >
        <MandalaDecor className="w-full h-full" />
      </div>
      <div
        className="absolute -bottom-20 -right-20 w-64 h-64 pointer-events-none opacity-10"
        style={{
          color: "oklch(72% 0.17 78)",
          animation: "mandala-spin 80s linear infinite reverse",
        }}
      >
        <MandalaDecor className="w-full h-full" />
      </div>

      {/* Back link */}
      <button
        type="button"
        onClick={() => navigate({ to: "/" })}
        className="mb-8 flex items-center gap-2 text-sm uppercase tracking-widest transition-colors self-start max-w-[480px] w-full mx-auto"
        style={{ color: "oklch(72% 0.17 78 / 0.7)" }}
        data-ocid="inquiry.link"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      {/* Card */}
      <div
        className="relative w-full max-w-[480px] mx-auto p-8 md:p-10"
        style={{
          background: "oklch(18% 0.09 255 / 0.92)",
          border: "1.5px solid oklch(72% 0.17 78 / 0.4)",
          boxShadow:
            "0 8px 48px oklch(10% 0.1 260 / 0.6), inset 0 0 0 1px oklch(72% 0.17 78 / 0.08)",
        }}
      >
        {/* Corner ornaments */}
        <span
          className="absolute -top-px -left-px w-8 h-8 border-t-2 border-l-2"
          style={{ borderColor: "oklch(72% 0.17 78 / 0.8)" }}
        />
        <span
          className="absolute -top-px -right-px w-8 h-8 border-t-2 border-r-2"
          style={{ borderColor: "oklch(72% 0.17 78 / 0.8)" }}
        />
        <span
          className="absolute -bottom-px -left-px w-8 h-8 border-b-2 border-l-2"
          style={{ borderColor: "oklch(72% 0.17 78 / 0.8)" }}
        />
        <span
          className="absolute -bottom-px -right-px w-8 h-8 border-b-2 border-r-2"
          style={{ borderColor: "oklch(72% 0.17 78 / 0.8)" }}
        />

        {/* Header */}
        <div className="text-center mb-6 space-y-2">
          <h1
            className="font-display text-4xl font-bold leading-tight"
            style={{
              color: "oklch(72% 0.17 78)",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Submit Your Inquiry
          </h1>
          <p
            className="text-sm tracking-wider"
            style={{ color: "oklch(65% 0.06 250)" }}
          >
            अपनी जानकारी दर्ज करें
          </p>
          <div style={{ color: "oklch(72% 0.17 78 / 0.5)" }}>
            <LotusDecor className="w-48 h-auto mx-auto mt-3" />
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          data-ocid="inquiry.modal"
        >
          <div className="space-y-1">
            <label
              className="block text-xs uppercase tracking-widest"
              style={{ color: "oklch(65% 0.06 250)" }}
              htmlFor="inq-name"
            >
              Full Name *
            </label>
            <input
              id="inq-name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full px-4 py-3 text-sm outline-none transition-all"
              style={{
                background: "oklch(22% 0.08 255 / 0.6)",
                border: "1px solid oklch(72% 0.17 78 / 0.3)",
                color: "oklch(92% 0.02 80)",
              }}
              data-ocid="inquiry.input"
            />
          </div>

          <div className="space-y-1">
            <label
              className="block text-xs uppercase tracking-widest"
              style={{ color: "oklch(65% 0.06 250)" }}
              htmlFor="inq-phone"
            >
              Phone Number *
            </label>
            <input
              id="inq-phone"
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-4 py-3 text-sm outline-none transition-all"
              style={{
                background: "oklch(22% 0.08 255 / 0.6)",
                border: "1px solid oklch(72% 0.17 78 / 0.3)",
                color: "oklch(92% 0.02 80)",
              }}
              data-ocid="inquiry.input"
            />
          </div>

          <div className="space-y-1">
            <label
              className="block text-xs uppercase tracking-widest"
              style={{ color: "oklch(65% 0.06 250)" }}
              htmlFor="inq-city"
            >
              City / Location *
            </label>
            <input
              id="inq-city"
              name="city"
              type="text"
              required
              value={form.city}
              onChange={handleChange}
              placeholder="Your city"
              className="w-full px-4 py-3 text-sm outline-none transition-all"
              style={{
                background: "oklch(22% 0.08 255 / 0.6)",
                border: "1px solid oklch(72% 0.17 78 / 0.3)",
                color: "oklch(92% 0.02 80)",
              }}
              data-ocid="inquiry.input"
            />
          </div>

          <div className="space-y-1">
            <label
              className="block text-xs uppercase tracking-widest"
              style={{ color: "oklch(65% 0.06 250)" }}
              htmlFor="inq-message"
            >
              Message / Product Interest
            </label>
            <textarea
              id="inq-message"
              name="message"
              rows={3}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us what you're looking for..."
              className="w-full px-4 py-3 text-sm outline-none transition-all resize-none"
              style={{
                background: "oklch(22% 0.08 255 / 0.6)",
                border: "1px solid oklch(72% 0.17 78 / 0.3)",
                color: "oklch(92% 0.02 80)",
              }}
              data-ocid="inquiry.textarea"
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-none gap-2 py-3 h-auto text-sm font-semibold uppercase tracking-widest mt-2"
            style={{
              background: "oklch(72% 0.17 78)",
              color: "oklch(15% 0.05 60)",
            }}
            data-ocid="inquiry.submit_button"
          >
            <MessageCircle className="w-4 h-4" />
            Send via WhatsApp
          </Button>
        </form>
      </div>

      {/* Bottom branding */}
      <p className="mt-8 text-xs" style={{ color: "oklch(40% 0.06 250)" }}>
        &copy; {new Date().getFullYear()} Navayata. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-80 transition-opacity"
        >
          caffeine.ai
        </a>
      </p>
    </div>
  );
}
