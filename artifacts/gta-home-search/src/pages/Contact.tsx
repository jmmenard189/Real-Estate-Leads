import React, { useEffect } from "react";
import { getDocumentTitle } from "@/lib/utils";
import { LeadForm } from "@/components/LeadForm";
import { siteConfig } from "@/content/site-config";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  useEffect(() => {
    document.title = getDocumentTitle("Contact Us");
  }, []);

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're ready to buy, sell, or just have questions about the GTA real estate market, we're here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-12">
            <div className="bg-card p-8 rounded-xl border shadow-sm space-y-8">
              <h2 className="text-2xl font-serif font-bold">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <p className="text-lg text-muted-foreground mt-1">{siteConfig.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-lg text-muted-foreground mt-1">{siteConfig.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Office</p>
                    <p className="text-lg text-muted-foreground mt-1 leading-relaxed">
                      {siteConfig.address}<br />
                      <span className="text-sm font-medium">{siteConfig.brokerage}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted p-6 rounded-xl border">
              <p className="text-sm text-muted-foreground text-center italic">
                "Our commitment is to provide you with honest, expert advice without any pressure. Let's talk about your goals."
              </p>
            </div>
          </div>

          <div>
            <LeadForm 
              source="mygtahomesearch-contact"
              title="Send us a Message"
              subtitle="Fill out the form and we'll get back to you within 24 hours."
              buttonText="Send Message"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
