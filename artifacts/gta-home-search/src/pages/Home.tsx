import React, { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { getDocumentTitle } from "@/lib/utils";
import { LeadForm } from "@/components/LeadForm";
import { communities } from "@/content/communities";
import { testimonials, disclaimer } from "@/content/testimonials";
import { faqs } from "@/content/faqs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator, Send, CheckCircle2 } from "lucide-react";

export default function Home() {
  useEffect(() => {
    document.title = getDocumentTitle("Find Your Perfect GTA Home");
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/home-hero.jpg" 
            alt="Beautiful Toronto home" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/30" />
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
                Find Your Perfect <span className="text-primary">GTA Home</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Expert local guidance for buying, selling, and investing in the Greater Toronto Area. We know every neighborhood intimately.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/search">Search Homes</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="h-12 px-8 text-base bg-secondary text-secondary-foreground hover:bg-secondary/80">
                <Link href="/sellers">Get Home Value</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                <Link href="/contact">Book a Call</Link>
              </Button>
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
              title="Start Your Journey"
              subtitle="Get expert guidance tailored to your GTA real estate goals."
            />
          </motion.div>
        </div>
      </section>

      {/* Mobile Form */}
      <section className="block lg:hidden container mx-auto px-4 -mt-10 relative z-20 mb-12">
        <LeadForm 
          source="mygtahomesearch-home-mobile"
          title="Start Your Journey"
          subtitle="Get expert guidance tailored to your GTA real estate goals."
        />
      </section>

      {/* Featured Communities */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold font-serif text-foreground">Explore GTA Communities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From lakeside living in Pickering to the bustling tech hub of Markham, discover the neighborhood that fits your lifestyle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communities.slice(0, 8).map((community, index) => (
              <motion.div
                key={community.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/communities/${community.slug}`}>
                  <div className="group relative overflow-hidden rounded-xl aspect-[4/5] cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
                    <img 
                      src={community.imageUrl} 
                      alt={community.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-serif font-bold mb-1">{community.name}</h3>
                      <p className="text-sm text-white/80 line-clamp-2">{community.tagline}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/communities">View All Communities</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Buyers / Sellers Split */}
      <section className="py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div className="bg-primary/5 rounded-2xl p-10 flex flex-col justify-center border border-primary/10 hover-elevate">
            <h2 className="text-3xl font-serif font-bold mb-4">Looking to Buy?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Navigate the competitive GTA market with confidence. We provide early access to listings, expert negotiation, and deep neighborhood insights.
            </p>
            <Button asChild size="lg" className="w-fit">
              <Link href="/buyers">Buyer Services</Link>
            </Button>
          </div>
          
          <div className="bg-secondary/30 rounded-2xl p-10 flex flex-col justify-center border border-secondary/50 hover-elevate">
            <h2 className="text-3xl font-serif font-bold mb-4">Thinking of Selling?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Maximize your home's value with our data-driven pricing strategies, premium staging, and unparalleled local marketing reach.
            </p>
            <Button asChild variant="secondary" size="lg" className="w-fit">
              <Link href="/sellers">Free Home Evaluation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-card border-y">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-serif mb-16">The Process</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "1. Strategy Call", desc: "We discuss your goals, timeline, and ideal neighborhoods." },
              { title: "2. Custom Plan", desc: "We build a tailored approach, whether buying or preparing to sell." },
              { title: "3. Execution", desc: "We guide you through every step until keys are exchanged." }
            ].map((step, i) => (
              <div key={i} className="space-y-4 p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold mx-auto font-serif">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mortgage Calculator Placeholder */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Calculator className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Plan Your Finances</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Understanding your budget is the first step. Use our upcoming mortgage tools to estimate monthly payments, explore rates, and connect with trusted GTA mortgage brokers.
            </p>
            <ul className="space-y-3">
              {["Estimate monthly carrying costs", "Compare fixed vs variable rates", "Understand closing costs & land transfer taxes"].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-4">
              <Link href="/contact">Connect with a Broker</Link>
            </Button>
          </div>
          <div className="bg-card p-8 rounded-2xl border shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center text-center p-6">
              <h3 className="text-xl font-bold mb-2">Advanced Calculator Coming Soon</h3>
              <p className="text-muted-foreground text-sm max-w-xs">We're building a comprehensive GTA-specific calculator including municipal and provincial land transfer taxes.</p>
            </div>
            <div className="space-y-4 opacity-40 select-none pointer-events-none">
              <div className="space-y-2">
                <label className="text-sm font-medium">Home Price</label>
                <div className="h-10 bg-muted rounded-md border w-full"></div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Down Payment</label>
                <div className="h-10 bg-muted rounded-md border w-full"></div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Interest Rate</label>
                <div className="h-10 bg-muted rounded-md border w-full"></div>
              </div>
              <div className="pt-4 border-t mt-4 flex justify-between items-center">
                <span className="font-bold">Est. Monthly Payment</span>
                <span className="text-2xl font-serif font-bold">$3,450</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-card border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-serif mb-4">Client Success Stories</h2>
            <p className="text-sm text-muted-foreground italic border border-dashed border-muted-foreground/30 inline-block px-4 py-1 rounded-full">
              {disclaimer}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-muted/30 p-8 rounded-xl border border-border/50 relative">
                <div className="text-4xl text-primary/20 absolute top-4 right-6 font-serif">"</div>
                <p className="text-lg text-foreground italic mb-6 relative z-10">"{t.quote}"</p>
                <div>
                  <p className="font-bold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.location} • {t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute -right-40 -top-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -left-40 -bottom-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="w-16 h-16 mx-auto bg-primary-foreground/10 rounded-2xl flex items-center justify-center mb-6">
              <Send className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-serif">Get New GTA Listings First</h2>
            <p className="text-xl text-primary-foreground/80">
              Join our VIP list to receive exclusive off-market opportunities, coming-soon listings, and market updates delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto pt-4" onSubmit={(e) => { e.preventDefault(); alert("Subscribed! (Mock)"); }}>
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="h-14 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 text-lg"
                required
              />
              <Button type="submit" size="lg" variant="secondary" className="h-14 px-8 text-lg font-semibold shrink-0">
                Subscribe Now
              </Button>
            </form>
            <p className="text-xs text-primary-foreground/60">We respect your privacy. No spam, ever.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl font-bold font-serif mb-12 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.home.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-lg font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-card border-t text-center">
        <div className="container mx-auto px-4 space-y-8 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold font-serif">Ready to Make Your Move?</h2>
          <p className="text-xl text-muted-foreground">
            Let's discuss your GTA real estate goals. No pressure, just professional advice.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button asChild size="lg" className="h-14 px-10 text-lg">
              <Link href="/contact">Book Your Call Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:hidden z-50 flex gap-4">
        <Button asChild className="w-full h-12 text-lg">
          <Link href="/contact">Book a Call</Link>
        </Button>
      </div>
    </div>
  );
}
