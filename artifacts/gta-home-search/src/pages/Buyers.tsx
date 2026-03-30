import React, { useEffect } from "react";
import { getDocumentTitle } from "@/lib/utils";
import { LeadForm } from "@/components/LeadForm";
import { faqs } from "@/content/faqs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Map, ShieldCheck, Key } from "lucide-react";

export default function Buyers() {
  useEffect(() => {
    document.title = getDocumentTitle("Buy a Home in the GTA");
  }, []);

  const benefits = [
    {
      icon: <Map className="w-8 h-8 text-primary" />,
      title: "Neighborhood Expertise",
      desc: "We help you find the right community that fits your lifestyle, commute, and school requirements."
    },
    {
      icon: <Search className="w-8 h-8 text-primary" />,
      title: "Off-Market Access",
      desc: "Get access to exclusive properties before they hit the open MLS market."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Skilled Negotiation",
      desc: "In competitive multiple-offer situations, our experience ensures your offer stands out while protecting your interests."
    },
    {
      icon: <Key className="w-8 h-8 text-primary" />,
      title: "Seamless Process",
      desc: "From pre-approval to closing day, we coordinate with inspectors, lawyers, and lenders for a smooth transition."
    }
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <section className="bg-muted py-20 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">Your GTA Home Buying Journey Starts Here</h1>
            <p className="text-xl text-muted-foreground">
              Expert guidance to help you navigate the Greater Toronto Area real estate market and secure your ideal home.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-16">
          {/* Benefits */}
          <section>
            <h2 className="text-3xl font-serif font-bold mb-8">Why Buy With Us?</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {benefits.map((b, i) => (
                <div key={i} className="space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center">
                    {b.icon}
                  </div>
                  <h3 className="text-xl font-bold">{b.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Process */}
          <section className="bg-card p-8 rounded-2xl border">
            <h2 className="text-3xl font-serif font-bold mb-8">The Buying Process</h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {[
                { step: "1", title: "Consultation & Pre-Approval", desc: "We sit down to understand your needs and connect you with trusted mortgage professionals." },
                { step: "2", title: "The Search", desc: "We set up automated alerts and schedule private showings for homes that match your criteria." },
                { step: "3", title: "Making an Offer", desc: "We analyze recent comparables to craft a strong, strategic offer." },
                { step: "4", title: "Closing", desc: "We handle the conditions, inspections, and final walkthroughs until you get the keys." }
              ].map((item, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    {item.step}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border bg-background shadow-sm space-y-2">
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-3xl font-serif font-bold mb-8">Buyer FAQs</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.buyers.map((faq, i) => (
                <AccordionItem key={i} value={`buyer-faq-${i}`}>
                  <AccordionTrigger className="text-left text-lg font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>

        {/* Sidebar Form */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <LeadForm 
            source="mygtahomesearch-buyer"
            leadType="buyer"
            title="Book a Buyer Consultation"
            subtitle="Tell us what you're looking for, and we'll start building your custom search strategy."
            buttonText="Start My Search"
            showAreaOfInterest={true}
            showBudget={true}
            showTimeline={true}
          />
        </div>
      </div>
    </div>
  );
}
