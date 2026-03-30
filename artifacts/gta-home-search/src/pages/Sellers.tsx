import React, { useEffect } from "react";
import { getDocumentTitle } from "@/lib/utils";
import { LeadForm } from "@/components/LeadForm";
import { faqs } from "@/content/faqs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TrendingUp, PenTool, Megaphone, Target } from "lucide-react";

export default function Sellers() {
  useEffect(() => {
    document.title = getDocumentTitle("Sell Your GTA Home");
  }, []);

  const approach = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Data-Driven Pricing",
      desc: "We analyze hyper-local market trends to price your home for maximum return without lingering on the market."
    },
    {
      icon: <PenTool className="w-8 h-8 text-primary" />,
      title: "Strategic Preparation",
      desc: "From professional staging advice to minor repairs, we ensure your home makes a flawless first impression."
    },
    {
      icon: <Megaphone className="w-8 h-8 text-primary" />,
      title: "Premium Marketing",
      desc: "High-end photography, cinematic video tours, and targeted digital advertising get your home in front of qualified buyers."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Expert Negotiation",
      desc: "We aggressively negotiate on your behalf to secure the highest possible price and the best terms."
    }
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <section className="bg-foreground text-background py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/images/seller-bg.jpg" 
            alt="Luxury home interior" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white drop-shadow-md">
              Discover Your Home's True Value
            </h1>
            <p className="text-xl text-white/90 drop-shadow-md font-medium">
              The GTA market moves fast. Get a precise, professional home evaluation and a customized strategy to maximize your sale.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-16">
          {/* Approach */}
          <section>
            <h2 className="text-3xl font-serif font-bold mb-8">Our Proven Approach</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {approach.map((item, i) => (
                <div key={i} className="p-6 rounded-xl border bg-card hover:border-primary/50 transition-colors">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Marketing Showcase */}
          <section className="bg-secondary/20 p-8 rounded-2xl border border-secondary/50">
            <h2 className="text-3xl font-serif font-bold mb-4">Maximum Exposure</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Listing on MLS is just the beginning. Our comprehensive marketing suite ensures your property stands out in the crowded GTA market.
            </p>
            <ul className="space-y-4">
              {[
                "Professional HDR Photography & Drone Imagery",
                "Immersive 3D Virtual Tours (Matterport)",
                "Custom Property Websites",
                "Targeted Social Media Ad Campaigns",
                "Print Marketing & Direct Mail to Surround Neighborhoods",
                "Exclusive Brokerage Networking"
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-3xl font-serif font-bold mb-8">Seller FAQs</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.sellers.map((faq, i) => (
                <AccordionItem key={i} value={`seller-faq-${i}`}>
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
            source="mygtahomesearch-seller"
            leadType="seller"
            title="Get Your Free Home Evaluation"
            subtitle="Provide your address below and we'll prepare a comprehensive comparative market analysis."
            buttonText="Get My Home Value"
            showAddress={true}
            showTimeline={true}
            className="border-primary/20 shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
