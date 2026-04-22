"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, Check, Loader2 } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@veltrixwear.com",
    href: "mailto:hello@veltrixwear.com",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "Nairobi, Kenya",
    href: "#",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+254 700 000 000",
    href: "tel:+254700000000",
  },
];

const topics = [
  "General Inquiry",
  "Order Support",
  "Returns & Exchanges",
  "Wholesale",
  "Press & Media",
  "Collaborations",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1500));
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-vx-black pt-20">
      {/* Header */}
      <div className="border-b border-vx-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-vx-accent text-xs font-bold tracking-[0.3em] uppercase mb-2">
            ✦ Get In Touch
          </p>
          <h1 className="font-display text-6xl lg:text-8xl tracking-wider">
            CONTACT
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left – info */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-display text-3xl tracking-wider mb-4">
                WE&apos;RE HERE
              </h2>
              <p className="text-vx-silver text-sm leading-relaxed">
                Have a question about an order, a collab idea, or just want to
                say something? We read every message and respond within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 border border-vx-border flex items-center justify-center flex-shrink-0 group-hover:border-vx-accent group-hover:text-vx-accent transition-all duration-200 text-vx-gray">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-vx-gray mb-0.5">
                      {label}
                    </p>
                    <p className="text-sm text-vx-silver group-hover:text-vx-white transition-colors">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Hours */}
            <div className="p-6 bg-vx-card border border-vx-border">
              <h3 className="text-[10px] font-bold tracking-widest uppercase text-vx-gray mb-4">
                Response Hours
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  { day: "Mon – Fri", time: "9:00 – 18:00 EAT" },
                  { day: "Saturday", time: "10:00 – 14:00 EAT" },
                  { day: "Sunday", time: "Closed" },
                ].map(({ day, time }) => (
                  <div key={day} className="flex justify-between">
                    <span className="text-vx-gray">{day}</span>
                    <span className="text-vx-silver font-medium">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right – form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center py-24 gap-4">
                <div className="w-16 h-16 bg-vx-accent/10 border border-vx-accent flex items-center justify-center">
                  <Check className="w-8 h-8 text-vx-accent" />
                </div>
                <h2 className="font-display text-4xl tracking-wider">
                  MESSAGE SENT
                </h2>
                <p className="text-vx-gray text-sm max-w-xs">
                  Thanks for reaching out. We&apos;ll get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", topic: "", message: "" });
                  }}
                  className="btn-outline py-2 px-6 text-xs mt-4"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[10px] font-bold tracking-widest uppercase text-vx-gray mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="vx-input"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[10px] font-bold tracking-widest uppercase text-vx-gray mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="vx-input"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="topic"
                    className="block text-[10px] font-bold tracking-widest uppercase text-vx-gray mb-2"
                  >
                    Topic
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                    className="vx-input appearance-none cursor-pointer"
                  >
                    <option value="">Select a topic…</option>
                    {topics.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[10px] font-bold tracking-widest uppercase text-vx-gray mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    className="vx-input resize-none"
                    placeholder="Tell us what's on your mind…"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-vx-red/10 border border-vx-red text-vx-red text-xs">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-vx-gray text-xs">
                  By submitting, you agree to our{" "}
                  <a href="#" className="text-vx-accent underline underline-offset-2">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
