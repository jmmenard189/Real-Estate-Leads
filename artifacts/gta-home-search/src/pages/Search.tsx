import React, { useEffect } from "react";
import { getDocumentTitle } from "@/lib/utils";
import { LeadForm } from "@/components/LeadForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search as SearchIcon, MapPin, BedDouble, Bath } from "lucide-react";

export default function Search() {
  useEffect(() => {
    document.title = getDocumentTitle("Search GTA Homes");
  }, []);

  return (
    <div className="min-h-screen pb-20">
      <div className="relative py-24 bg-foreground">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/search-bg.jpg" 
            alt="Search background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="container mx-auto px-4 text-center max-w-4xl space-y-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight text-white drop-shadow">Search GTA Homes</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow font-medium">
            Find your dream home across the Greater Toronto Area. Our live MLS / IDX integration is coming soon.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-card p-6 md:p-8 rounded-xl shadow-xl border max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Location
              </label>
              <Input placeholder="City, Neighborhood, or Address" className="h-12" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BedDouble className="w-4 h-4" /> Beds
              </label>
              <Select>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Bath className="w-4 h-4" /> Baths
              </label>
              <Select>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button size="lg" className="w-full md:w-auto h-12 px-8" onClick={() => alert("Search functionality coming soon!")}>
              <SearchIcon className="w-5 h-5 mr-2" />
              Search Properties
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
              COMING SOON
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Live IDX Property Search
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are currently upgrading our platform to provide you with direct, real-time access to the Toronto Regional Real Estate Board (TRREB) MLS® system.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">✓</div>
                <p className="text-muted-foreground">Get instant notifications for new listings matching your exact criteria.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">✓</div>
                <p className="text-muted-foreground">Access detailed property history and market statistics.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">✓</div>
                <p className="text-muted-foreground">Save your favorite properties and track their status.</p>
              </div>
            </div>
          </div>

          <div>
            <LeadForm 
              source="mygtahomesearch-search"
              title="Get Early Access"
              subtitle="Register now to receive a customized list of active properties and off-market opportunities."
              buttonText="Send Me Listings"
              showAreaOfInterest={true}
              leadType="buyer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
