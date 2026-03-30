import React, { useEffect } from "react";
import { getDocumentTitle } from "@/lib/utils";
import { siteConfig } from "@/content/site-config";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function About() {
  useEffect(() => {
    document.title = getDocumentTitle("About Us");
  }, []);

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl space-y-16">
        
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">About GTA Home Search</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Your trusted partners in navigating the Greater Toronto Area real estate market.
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            The Greater Toronto Area is one of the most dynamic, diverse, and competitive real estate markets in the world. Whether you are searching for a family home in the suburbs, a downtown condominium, or a high-yield investment property, having a knowledgeable local expert by your side is crucial.
          </p>
          <p>
            We are dedicated to providing unparalleled service to buyers and sellers across the GTA. Our approach is deeply rooted in local market data, strategic negotiation, and a commitment to transparency.
          </p>

          <h2 className="font-serif">Our Expertise</h2>
          <p>
            We don't just work in the GTA; we know its communities block by block. From the historic charm of Whitby and the waterfront of Pickering to the booming tech corridors of Markham and the luxury estates of Vaughan, we understand the nuances that make each neighborhood unique. 
          </p>
          <p>
            Our deep understanding of local school districts, transit developments, zoning changes, and community amenities allows us to guide our clients toward properties that offer both lifestyle benefits and long-term value.
          </p>

          <h2 className="font-serif">Our Commitment</h2>
          <p>
            We are committed to transparency, integrity, and delivering real results for our clients. Every recommendation we make is grounded in local market knowledge and a genuine desire to help you reach your goals — whether you are buying your first home, upgrading, or planning your next investment.
          </p>

          <div className="bg-muted p-8 rounded-xl border mt-12 text-center not-prose">
            <h3 className="text-2xl font-serif font-bold mb-4">Ready to discuss your real estate goals?</h3>
            <p className="text-muted-foreground mb-6">Let's connect for a no-obligation consultation.</p>
            <Button asChild size="lg">
              <Link href="/contact">Contact Us Today</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
