import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

// ─── Page config — swap these to duplicate for another city ───────────────────
const PAGE = {
  city: "Richmond Hill",
  priceRange: "$900K–$1.2M",
  priceLabel: "$900,000 to $1,200,000",
  propertyType: "Detached Homes",
  source: "mygtahomesearch-richmond-hill-detached-facebook",
  campaign: "richmond-hill-detached-900k-1200k-facebook",
  areaOfInterest: "Richmond Hill Detached 900K to 1.2M",
  budget: "$900,000 - $1,200,000",
};

const SAMPLE_HOMES = [
  { price: "$949,000", beds: 3, baths: 2, sqft: "1,850", area: "Mill Pond Area, Richmond Hill", desc: "Beautifully maintained detached home on a quiet street with a finished basement and private backyard.", img: "/images/richmond-hill.jpg", pos: "object-center" },
  { price: "$1,088,000", beds: 4, baths: 3, sqft: "2,100", area: "Oak Ridges, Richmond Hill", desc: "Spacious 4-bedroom detached with open-concept main floor, updated kitchen, and double car garage.", img: "/images/home-hero.jpg", pos: "object-center" },
  { price: "$999,000", beds: 3, baths: 2, sqft: "1,950", area: "Crosby Area, Richmond Hill", desc: "Move-in ready detached home close to top-rated schools, transit, and Yonge Street amenities.", img: "/images/seller-bg.jpg", pos: "object-top" },
  { price: "$1,149,000", beds: 4, baths: 3, sqft: "2,300", area: "Doncrest, Richmond Hill", desc: "Gorgeous detached home with hardwood throughout, chef's kitchen, and landscaped backyard retreat.", img: "/images/search-bg.jpg", pos: "object-center" },
  { price: "$979,000", beds: 3, baths: 3, sqft: "2,000", area: "North Richmond Hill", desc: "Bright and airy detached home with large windows, updated bathrooms, and quiet neighbourhood setting.", img: "/images/richmond-hill.jpg", pos: "object-top" },
  { price: "$1,195,000", beds: 4, baths: 4, sqft: "2,450", area: "Westbrook, Richmond Hill", desc: "Premium executive detached with soaring ceilings, luxury finishes, and exceptional curb appeal.", img: "/images/home-hero.jpg", pos: "object-bottom" },
];

const WHY_RICHMOND_HILL = [
  { icon: "🏫", title: "Top-Ranked Schools", desc: "Richmond Hill is home to some of Ontario's highest-rated public and private schools, making it a top choice for families." },
  { icon: "🌳", title: "Parks & Green Space", desc: "Enjoy Lake Wilcox, Bond Lake, and dozens of trails and conservation areas perfect for outdoor living." },
  { icon: "🚗", title: "Highway & Transit Access", desc: "Minutes from Hwy 404, 407, and the 400 corridor, plus GO transit options for commuters heading downtown." },
  { icon: "🏡", title: "Desirable Detached Housing", desc: "A strong mix of well-established neighbourhoods and newer builds offering great value in the $900K–$1.2M range." },
  { icon: "🤝", title: "Strong Community Feel", desc: "Richmond Hill is consistently ranked among the safest and most livable communities in the GTA." },
  { icon: "📈", title: "Proven Real Estate Value", desc: "Detached homes in Richmond Hill have a strong long-term appreciation track record within the GTA market." },
];

const BENEFITS = [
  { icon: "⚡", title: "Get New Listings First", desc: "Receive matching homes as soon as they hit the market — before many buyers even know they exist." },
  { icon: "🔒", title: "Off-Market Opportunities", desc: "Get access to coming-soon and private listings that aren't publicly advertised." },
  { icon: "🎯", title: "Matched to Your Budget", desc: "Only see homes in the $900K–$1.2M range that meet your specific criteria. No wasted time." },
  { icon: "🏘️", title: "Local Neighbourhood Guidance", desc: "Get expert insight into Richmond Hill's best streets, schools, and community pockets." },
  { icon: "📅", title: "Book Private Showings Fast", desc: "Priority access to schedule viewings as soon as a home you love comes available." },
];

const FAQS = [
  {
    q: "Are there detached homes available in Richmond Hill between $900K and $1.2M?",
    a: "Yes — the $900K to $1.2M range is one of the most active segments in Richmond Hill. While inventory moves quickly, there are consistently detached homes available in this price band. Registering ensures you're notified the moment matching homes come to market.",
  },
  {
    q: "How quickly do homes in this price range sell?",
    a: "Well-priced detached homes in Richmond Hill often sell within 1–2 weeks, and sometimes within days in a competitive market. Having a search set up in advance and getting alerts early gives you a significant advantage.",
  },
  {
    q: "Can I book a private showing through this site?",
    a: "Yes. Once you register, a local real estate professional will reach out to understand your needs and arrange private viewings on homes that match your criteria — at times that work for you.",
  },
  {
    q: "Can I get alerts when new Richmond Hill listings come up?",
    a: "Absolutely. When you submit your information, we'll set up a personalized property alert for detached homes in Richmond Hill in your price range so you're always first to know.",
  },
  {
    q: "Do I need mortgage pre-approval before viewing homes?",
    a: "You don't need pre-approval to register or receive listings, but we strongly recommend getting pre-approved before booking showings. It speeds up the process and makes your offer stronger when you find the right home. We can also connect you with trusted mortgage professionals.",
  },
];

const TESTIMONIALS = [
  { name: "Sarah M.", area: "Richmond Hill Buyer", text: "We found our dream home in Richmond Hill within 3 weeks of registering. The process was smooth and we always felt like we had expert guidance every step of the way." },
  { name: "David & Linda T.", area: "Richmond Hill Buyers", text: "We had been searching on our own for months with no luck. After registering here, we received listings that matched exactly what we wanted — and got into our home below asking." },
  { name: "Priya K.", area: "Richmond Hill Buyer", text: "The private showing process was fast and professional. We saw 4 homes in one weekend and made an offer on the second one. Couldn't be happier." },
];

// ─── Shared lead form ─────────────────────────────────────────────────────────
interface FormData {
  firstName: string;
  email: string;
  phone: string;
  timeline: string;
  rentingOrOwning?: string;
}

function useLeadForm(formId: string) {
  const [form, setForm] = useState<FormData>({ firstName: "", email: "", phone: "", timeline: "", rentingOrOwning: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const message = [
        `Campaign: ${PAGE.campaign}`,
        `Form: ${formId}`,
        ...(form.rentingOrOwning ? [`Currently: ${form.rentingOrOwning}`] : []),
      ].join(" | ");

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.firstName,
          email: form.email,
          phone: form.phone,
          timeline: form.timeline || undefined,
          source: PAGE.source,
          leadType: "buyer",
          areaOfInterest: PAGE.areaOfInterest,
          budget: PAGE.budget,
          message,
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return { form, update, submit, submitting, submitted, error };
}

// ─── Reusable form components ─────────────────────────────────────────────────
const inputCls = "w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition";
const selectCls = `${inputCls} cursor-pointer`;

function SuccessMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8 px-4"
    >
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">You're on the list!</h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        Thanks! Your Richmond Hill detached home list request has been received. We'll be in touch shortly with matching properties.
      </p>
    </motion.div>
  );
}

// ─── Hero form ────────────────────────────────────────────────────────────────
function HeroForm() {
  const { form, update, submit, submitting, submitted, error } = useLeadForm("hero");
  if (submitted) return <div className="bg-white rounded-2xl shadow-2xl p-6"><SuccessMessage /></div>;
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
      <h2 className="text-lg font-bold text-[#1e3a5f] mb-1">Get The Richmond Hill Home List</h2>
      <p className="text-gray-500 text-sm mb-5">Detached homes {PAGE.priceRange} — sent directly to you.</p>
      <form onSubmit={submit} className="space-y-3">
        <input type="text" placeholder="First Name *" required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className={inputCls} />
        <input type="email" placeholder="Email Address *" required value={form.email} onChange={(e) => update("email", e.target.value)} className={inputCls} />
        <input type="tel" placeholder="Phone Number *" required value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputCls} />
        <select value={form.timeline} onChange={(e) => update("timeline", e.target.value)} className={selectCls}>
          <option value="">Ideal Timeline</option>
          <option value="ASAP">ASAP</option>
          <option value="3 Months">3 Months</option>
          <option value="6 Months">6 Months</option>
          <option value="Just Browsing">Just Browsing</option>
        </select>
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <button type="submit" disabled={submitting} className="w-full py-4 bg-[#c9a84c] hover:bg-[#b8973e] disabled:opacity-60 text-white font-bold text-base rounded-lg transition-colors shadow-md">
          {submitting ? "Sending…" : "Send Me The Homes →"}
        </button>
        <p className="text-gray-400 text-xs text-center leading-relaxed">
          By submitting, you agree to be contacted about available homes in Richmond Hill.
        </p>
      </form>
    </div>
  );
}

// ─── Mid-page form ────────────────────────────────────────────────────────────
function MidPageForm() {
  const { form, update, submit, submitting, submitted, error } = useLeadForm("mid-page");
  if (submitted) return <SuccessMessage />;
  return (
    <form onSubmit={submit} className="space-y-3 max-w-xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input type="text" placeholder="First Name *" required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className={inputCls} />
        <input type="email" placeholder="Email Address *" required value={form.email} onChange={(e) => update("email", e.target.value)} className={inputCls} />
      </div>
      <input type="tel" placeholder="Phone Number *" required value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputCls} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <select value={form.rentingOrOwning} onChange={(e) => update("rentingOrOwning", e.target.value)} className={selectCls}>
          <option value="">Currently Renting or Owning?</option>
          <option value="Renting">Renting</option>
          <option value="Owning">Owning</option>
          <option value="Living with Family">Living with Family</option>
        </select>
        <select value={form.timeline} onChange={(e) => update("timeline", e.target.value)} className={selectCls}>
          <option value="">Timeline</option>
          <option value="ASAP">ASAP</option>
          <option value="3 Months">3 Months</option>
          <option value="6 Months">6 Months</option>
          <option value="Just Browsing">Just Browsing</option>
        </select>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <button type="submit" disabled={submitting} className="w-full py-4 bg-[#c9a84c] hover:bg-[#b8973e] disabled:opacity-60 text-white font-bold text-base rounded-lg transition-colors shadow-md">
        {submitting ? "Sending…" : "Get My List →"}
      </button>
    </form>
  );
}

// ─── Final CTA form ───────────────────────────────────────────────────────────
function FinalForm() {
  const { form, update, submit, submitting, submitted, error } = useLeadForm("final-cta");
  if (submitted) return <SuccessMessage />;
  return (
    <form onSubmit={submit} className="space-y-3 max-w-md mx-auto">
      <input type="text" placeholder="Your Name *" required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className={inputCls} />
      <input type="email" placeholder="Email Address *" required value={form.email} onChange={(e) => update("email", e.target.value)} className={inputCls} />
      <input type="tel" placeholder="Phone Number *" required value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputCls} />
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <button type="submit" disabled={submitting} className="w-full py-4 bg-[#c9a84c] hover:bg-[#b8973e] disabled:opacity-60 text-white font-bold text-base rounded-lg transition-colors shadow-md">
        {submitting ? "Sending…" : "Send Me Listings →"}
      </button>
    </form>
  );
}

// ─── FAQ accordion ────────────────────────────────────────────────────────────
function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors">
        <span className="font-semibold text-gray-900 text-sm md:text-base pr-4">{q}</span>
        <svg className={`w-5 h-5 text-[#1e3a5f] flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function RichmondHillDetached() {
  const heroFormRef = useRef<HTMLDivElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    document.title = "Richmond Hill Detached Homes $900K to $1.2M | GTA Home Search";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Browse Richmond Hill detached homes from $900,000 to $1.2M. Register to receive matching listings, property updates, and private showing opportunities.");

    const onScroll = () => setShowStickyBar(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToHeroForm() {
    heroFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">

      {/* ── Minimal header ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-bold text-[#1e3a5f]">GTA Home Search</Link>
          <button onClick={scrollToHeroForm} className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-[#c9a84c] hover:bg-[#b8973e] text-white font-semibold text-sm rounded-lg transition-colors">
            Get The List
          </button>
        </div>
      </header>

      {/* ── Hero section ── */}
      <section className="relative overflow-hidden bg-[#1e3a5f] text-white">
        <div className="absolute inset-0">
          <img src="/images/richmond-hill.jpg" alt="Richmond Hill detached homes" className="w-full h-full object-cover object-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] via-[#1e3a5f]/90 to-[#152d4a]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#c9a84c]/20 border border-[#c9a84c]/40 text-[#c9a84c] text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                🏡 Richmond Hill · Detached Homes
              </div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5">
                Richmond Hill Detached Homes from <span className="text-[#c9a84c]">$900K to $1.2M</span>
              </h1>
              <p className="text-blue-100 text-lg leading-relaxed mb-8">
                See available detached homes in Richmond Hill and get a private list of matching properties sent directly to you — before many buyers even see them.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                {["Local Market Knowledge", "Fast Home Alerts", "Private Showings Available"].map((badge) => (
                  <div key={badge} className="flex items-center gap-2 text-sm text-blue-100">
                    <svg className="w-4 h-4 text-[#c9a84c] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {badge}
                  </div>
                ))}
              </div>
              <div className="hidden lg:block">
                <p className="text-blue-200 text-sm italic">Join buyers already receiving matching Richmond Hill listings →</p>
              </div>
            </div>
            <div ref={heroFormRef} id="hero-form">
              <HeroForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="bg-white border-b border-gray-100 py-5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm text-gray-500">
            {["🔒 100% Free — No Obligation", "📩 Listings Sent Directly to You", "🏡 Richmond Hill Local Experts", "📅 Book Private Showings"].map((item) => (
              <span key={item} className="font-medium">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Richmond Hill ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
              Why Buyers Choose Richmond Hill
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Richmond Hill consistently ranks as one of the GTA's most desirable communities for families and professionals looking for detached homes in the $900K–$1.2M range.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_RICHMOND_HILL.map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#1e3a5f] text-base mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button onClick={scrollToHeroForm} className="px-8 py-4 bg-[#1e3a5f] hover:bg-[#152d4a] text-white font-semibold rounded-lg transition-colors">
              See Matching Homes →
            </button>
          </div>
        </div>
      </section>

      {/* ── Sample home cards ── */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-4">
            <span className="inline-block bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Sample Homes Matching Your Search
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-3">
              Examples of Detached Homes in This Price Range
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm">
              These are representative examples of the types of properties available in Richmond Hill in the $900K–$1.2M range. Register below to receive current active listings.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {SAMPLE_HOMES.map((home) => (
              <div key={home.price + home.area} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img src={home.img} alt={`Detached home in ${home.area}`} className={`w-full h-full object-cover ${home.pos} scale-105 hover:scale-110 transition-transform duration-500`} />
                  <div className="absolute top-3 left-3 bg-[#1e3a5f] text-white text-sm font-bold px-3 py-1 rounded-lg">
                    {home.price}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                    <span>🛏 {home.beds} Beds</span>
                    <span>🚿 {home.baths} Baths</span>
                    <span>📐 {home.sqft} sqft</span>
                  </div>
                  <p className="text-xs text-[#c9a84c] font-semibold mb-2 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                    {home.area}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{home.desc}</p>
                  <button onClick={scrollToHeroForm} className="w-full py-2.5 border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white font-semibold text-sm rounded-lg transition-colors">
                    Request Full Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            * Sample listings shown for illustration purposes. Register to receive actual active listings in this price range.
          </p>
          <div className="mt-8 text-center">
            <button onClick={scrollToHeroForm} className="px-8 py-4 bg-[#c9a84c] hover:bg-[#b8973e] text-white font-bold rounded-lg transition-colors shadow-md">
              Get The Full List →
            </button>
          </div>
        </div>
      </section>

      {/* ── Why register ── */}
      <section className="py-16 md:py-20 bg-[#1e3a5f] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Why Register for <span className="text-[#c9a84c]">Free</span>?
            </h2>
            <p className="text-blue-200 max-w-xl mx-auto">
              Stop spending hours searching. Let matching Richmond Hill detached homes come to you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/10 hover:bg-white/15 transition-colors">
                <div className="text-3xl mb-3">{b.icon}</div>
                <h3 className="font-bold text-white text-base mb-2">{b.title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button onClick={scrollToHeroForm} className="px-8 py-4 bg-[#c9a84c] hover:bg-[#b8973e] text-white font-bold rounded-lg transition-colors shadow-md">
              Get New Listings First →
            </button>
          </div>
        </div>
      </section>

      {/* ── Mid-page lead form ── */}
      <section className="py-16 md:py-20 bg-white" id="mid-form">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl border border-gray-100 p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-3">
                Want the Full Richmond Hill Detached Home List?
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Get current detached homes in the {PAGE.priceRange} range sent directly to your inbox — updated as new properties become available.
              </p>
            </div>
            <MidPageForm />
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-[#1e3a5f] mb-3">What Buyers Are Saying</h2>
            <p className="text-gray-500">Real buyers who found homes in the GTA with our help.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#c9a84c]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-[#c9a84c] text-xs">{t.area}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500">Everything you need to know about buying a detached home in Richmond Hill.</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <FAQ key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <button onClick={scrollToHeroForm} className="px-8 py-4 bg-[#1e3a5f] hover:bg-[#152d4a] text-white font-semibold rounded-lg transition-colors">
              Get Matching Listings →
            </button>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 md:py-20 bg-[#1e3a5f] text-white" id="final-cta">
        <div className="max-w-lg mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Get Richmond Hill Detached Homes <span className="text-[#c9a84c]">Sent To You</span>
          </h2>
          <p className="text-blue-200 mb-8">
            Register now to receive updated home matches in the {PAGE.priceRange} range — directly in your inbox.
          </p>
          <div className="bg-white rounded-2xl p-8">
            <FinalForm />
            <p className="text-gray-400 text-xs mt-3 text-center">Free. No obligation. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* ── Minimal footer ── */}
      <footer className="bg-[#152d4a] text-blue-200 py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} GTA Home Search. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <p className="text-center text-blue-300/60 text-xs max-w-sm">
            Sample listings shown for illustrative purposes only. Not affiliated with TRREB or CREA.
          </p>
        </div>
      </footer>

      {/* ── Sticky mobile CTA bar ── */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-2xl px-4 py-3"
          >
            <button
              onClick={scrollToHeroForm}
              className="w-full py-4 bg-[#c9a84c] hover:bg-[#b8973e] text-white font-bold text-base rounded-xl transition-colors shadow-md"
            >
              🏡 Get The Richmond Hill Home List
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
