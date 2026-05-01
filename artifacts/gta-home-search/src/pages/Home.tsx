import React, { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { getDocumentTitle } from "@/lib/utils";
import { LeadForm } from "@/components/LeadForm";
import { communities } from "@/content/communities";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MapPin, Search, TrendingUp, Home as HomeIcon, ChevronRight, CheckCircle2 } from "lucide-react";

const BUYER_RESOURCES = [
  { title: "Search Available Homes", desc: "Browse current listings across Pickering, Ajax, Whitby, Markham, and the wider GTA filtered by price, beds, and community.", cta: "Search Homes", href: "/search" },
  { title: "Understand the Buying Process", desc: "From pre-approval to closing day — get a clear overview of what to expect at each step of purchasing a home in Ontario.", cta: "Buyer Resources", href: "/buyers" },
  { title: "Compare GTA Communities", desc: "Each community offers a different lifestyle, school district, and price range. Explore area guides to find the right fit.", cta: "View Communities", href: "/communities" },
];

const SELLER_RESOURCES = [
  { title: "Request a Home Valuation", desc: "Get a free, no-obligation estimate of your home's current market value based on recent comparable sales in your area.", cta: "Get Home Value", href: "/sellers" },
  { title: "Understand Your Selling Options", desc: "Learn the difference between listing on the open market, off-market sales, and timing strategies that work in the GTA.", cta: "Seller Resources", href: "/sellers" },
  { title: "Request a Market Update", desc: "See what homes have sold for recently in your neighbourhood. A quick snapshot of the current market can help you plan.", cta: "Request Market Update", href: "/contact" },
];

const SERVICE_AREAS = [
  { name: "Pickering", highlight: "Lakeside living & new communities", img: "/images/pickering.jpg", slug: "pickering" },
  { name: "Ajax", highlight: "Family-friendly & waterfront parks", img: "/images/ajax.jpg", slug: "ajax" },
  { name: "Whitby", highlight: "Growing suburban charm", img: "/images/whitby.jpg", slug: "whitby" },
  { name: "Markham", highlight: "Tech hub & multicultural living", img: "/images/markham.jpg", slug: "markham" },
  { name: "Vaughan", highlight: "Urban growth & entertainment", img: "/images/vaughan.jpg", slug: "vaughan" },
  { name: "North York", highlight: "Urban core & diverse housing", img: "/images/north-york.jpg", slug: "north-york" },
  { name: "Richmond Hill", highlight: "Top schools & green space", img: "/images/richmond-hill.jpg", slug: "richmond-hill" },
  { name: "Scarborough", highlight: "Lakeside trails & value", img: "/images/scarborough.jpg", slug: "scarborough" },
];

const HOME_FAQS = [
  { q: "How do I start searching for homes in the GTA?", a: "Use the search tool on this site to filter homes by location, price range, and property type. When you find something you like, you can request more details or book a private viewing directly." },
  { q: "Do I need a real estate agent to buy a home?", a: "While not legally required, having professional representation ensures your interests are protected throughout the offer and negotiation process. Buyer representation is typically at no cost to you as the buyer." },
  { q: "How do I find out what my home is worth?", a: "You can request a free home valuation through this site. A comparable market analysis will be prepared based on recent sales in your neighbourhood — no obligation required." },
  { q: "What communities do you serve?", a: "We serve buyers and sellers across the GTA including Pickering, Ajax, Whitby, Markham, Vaughan, Richmond Hill, North York, and Scarborough." },
  { q: "How do I get notified when new homes hit the market?", a: "Submit your search criteria through any form on this site and you'll receive matching listing alerts as new homes become available in your target area." },
];

export default function Home() {
  useEffect(() => {
    document.title = getDocumentTitle("Search Homes Across the GTA");
  }, []);

  return (
    <div className="flex flex-col min-h-screen">

      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/home-hero.jpg"
            alt="GTA homes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/30" />
        </div>

        <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight font-serif text-foreground">
                Search Homes Across <span className="text-primary">Pickering and the GTA</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Explore homes, compare local markets, and request helpful real estate guidance when you need it.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/search">
                  <Search className="w-4 h-4 mr-2" />
                  Search Homes
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="h-12 px-8 text-base bg-secondary text-secondary-foreground hover:bg-secondary/80">
                <Link href="/sellers">Get Home Value</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                <Link href="/contact">Book a Call</Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-2">
              {["Simple home search", "Local market insight", "Helpful real estate guidance"].map((item) => (
                <span key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block lg:ml-auto w-full max-w-md"
          >
            <LeadForm
              source="mygtahomesearch-home"
              title="Find Your Next Home"
              subtitle="Tell us what you're looking for and we'll send matching listings directly to you."
            />
          </motion.div>
        </div>
      </section>

      {/* Mobile Form */}
      <section className="block lg:hidden container mx-auto px-4 -mt-10 relative z-20 mb-12">
        <LeadForm
          source="mygtahomesearch-home-mobile"
          title="Find Your Next Home"
          subtitle="Tell us what you're looking for and we'll send matching listings directly to you."
        />
      </section>

      {/* ── Pickering featured area ── */}
      <section className="py-20 bg-muted/20 border-y">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
              <img src="/images/pickering.jpg" alt="Pickering, Ontario" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Pickering, Ontario</span>
                </div>
                <p className="text-white/80 text-sm">Lakeside Living &amp; Suburban Charm</p>
              </div>
            </div>
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-3 py-1.5 rounded-full">
                <HomeIcon className="w-4 h-4" />
                Featured Community
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Pickering — A Growing GTA Community Worth Exploring
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Pickering offers one of the best combinations of lakefront lifestyle and suburban value in the GTA. With excellent GO train access, waterfront trails along Lake Ontario, and a growing downtown core, it attracts first-time buyers and families looking for space without giving up city connectivity.
              </p>
              <ul className="space-y-2">
                {[
                  "Frenchman's Bay waterfront & parks",
                  "GO Transit access to Union Station",
                  "Mix of detached homes, townhomes & condos",
                  "Strong public and Catholic school network",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 pt-2">
                <Button asChild>
                  <Link href="/communities/pickering">Explore Pickering</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/search">Search Pickering Homes</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Buyer resources ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-3 py-1.5 rounded-full">
              <Search className="w-4 h-4" />
              For Buyers
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Buyer Resources</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to search, compare, and make informed decisions on your next home purchase.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {BUYER_RESOURCES.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-muted/30 rounded-2xl p-8 border border-border/50 flex flex-col hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-lg text-foreground mb-3">{r.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">{r.desc}</p>
                <Button asChild variant="outline" className="w-fit">
                  <Link href={r.href}>
                    {r.cta}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Seller resources ── */}
      <section className="py-20 bg-muted/20 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 bg-secondary/60 text-secondary-foreground text-sm font-semibold px-3 py-1.5 rounded-full">
              <TrendingUp className="w-4 h-4" />
              For Sellers
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Seller Resources</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Understand your home's value, explore your options, and stay informed with local market data before you list.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {SELLER_RESOURCES.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-border/50 flex flex-col hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-lg text-foreground mb-3">{r.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">{r.desc}</p>
                <Button asChild variant="secondary" className="w-fit">
                  <Link href={r.href}>
                    {r.cta}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service areas ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">GTA Communities We Serve</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From the eastern shores of Pickering to the tech corridor of Markham — browse homes and explore area guides across 8 GTA communities.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SERVICE_AREAS.map((area, i) => (
              <motion.div
                key={area.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/communities/${area.slug}`}>
                  <div className="group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300">
                    <img
                      src={area.img}
                      alt={area.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-serif font-bold text-lg leading-tight">{area.name}</h3>
                      <p className="text-white/75 text-xs mt-0.5">{area.highlight}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/communities">View All Community Guides</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Market update CTA ── */}
      <section className="py-20 bg-muted/20 border-y">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Request a Local Market Update
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Not sure what's happening in your neighbourhood right now? Request a snapshot of recent sales, price trends, and days-on-market data for your area — no obligation.
              </p>
              <ul className="space-y-2">
                {[
                  "Recent comparable sales in your area",
                  "Average days on market this quarter",
                  "Current price trends by community",
                  "Inventory levels — buyer's vs. seller's market",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg">
                <Link href="/contact">Request Market Update</Link>
              </Button>
            </div>
            <div className="bg-card rounded-2xl border shadow-sm p-8 space-y-6">
              <h3 className="font-serif font-bold text-xl">GTA Market Snapshot</h3>
              {[
                { label: "Pickering — Detached Avg.", value: "~$1.1M", trend: "↑ stable" },
                { label: "Ajax — Detached Avg.", value: "~$1.0M", trend: "↑ stable" },
                { label: "Whitby — Detached Avg.", value: "~$950K", trend: "→ balanced" },
                { label: "Richmond Hill — Detached Avg.", value: "~$1.2M", trend: "↑ active" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                  <span className="text-sm text-muted-foreground">{row.label}</span>
                  <div className="text-right">
                    <span className="font-bold text-foreground text-sm">{row.value}</span>
                    <span className="text-xs text-muted-foreground ml-2">{row.trend}</span>
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground italic">Approximate averages based on recent market data. Request a full update for accurate local figures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Home value CTA ── */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute -right-40 -top-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -left-40 -bottom-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-primary-foreground/10 rounded-2xl flex items-center justify-center">
              <HomeIcon className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-serif">What Is Your Home Worth Today?</h2>
            <p className="text-xl text-primary-foreground/80">
              Get a free, no-obligation home valuation based on current market data and comparable sales in your neighbourhood.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild size="lg" variant="secondary" className="h-14 px-10 text-base font-semibold">
                <Link href="/sellers">Get My Free Home Value</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-10 text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/contact">Book a Call</Link>
              </Button>
            </div>
            <p className="text-xs text-primary-foreground/60 pt-2">
              Free. No obligation. By submitting, you agree to be contacted about your inquiry.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-12 text-center">Common Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {HOME_FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 bg-card border-t text-center">
        <div className="container mx-auto px-4 space-y-6 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold font-serif">Ready to Explore GTA Homes?</h2>
          <p className="text-lg text-muted-foreground">
            Search available listings, request a home valuation, or get in touch for local market guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button asChild size="lg" className="h-12 px-8">
              <Link href="/search">
                <Search className="w-4 h-4 mr-2" />
                Search Homes
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="h-12 px-8">
              <Link href="/sellers">Get Home Value</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8">
              <Link href="/contact">Request Market Update</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:hidden z-50 flex gap-3">
        <Button asChild className="flex-1 h-12">
          <Link href="/search">Search Homes</Link>
        </Button>
        <Button asChild variant="secondary" className="flex-1 h-12">
          <Link href="/sellers">Get Home Value</Link>
        </Button>
      </div>

    </div>
  );
}
