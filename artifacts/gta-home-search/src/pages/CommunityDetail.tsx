import React, { useEffect } from "react";
import { Link, useParams } from "wouter";
import { getDocumentTitle } from "@/lib/utils";
import { communities } from "@/content/communities";
import { LeadForm } from "@/components/LeadForm";
import NotFound from "./not-found";
import { Button } from "@/components/ui/button";
import { MapPin, Home as HomeIcon, TreePine, Navigation } from "lucide-react";

export default function CommunityDetail() {
  const params = useParams();
  const community = communities.find(c => c.slug === params.slug);

  useEffect(() => {
    if (community) {
      document.title = getDocumentTitle(`Real Estate in ${community.name}, ON`);
    }
  }, [community]);

  if (!community) return <NotFound />;

  // Get 3 other communities for internal linking
  const otherCommunities = communities.filter(c => c.slug !== community.slug).slice(0, 3);

  return (
    <div className="min-h-screen pb-24">
      {/* Custom Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end pb-16">
        <div className="absolute inset-0 z-0">
          <img 
            src={community.imageUrl} 
            alt={`${community.name} neighborhood`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="inline-block bg-primary/20 backdrop-blur-md text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-4">
            Neighborhood Guide
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-4">
            {community.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-medium">
            {community.tagline}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pt-12 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 space-y-16">
          
          {/* Overview */}
          <section className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl leading-relaxed text-foreground/90 font-medium">
              {community.description}
            </p>
          </section>

          {/* Details Grid */}
          <section className="grid sm:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-xl border space-y-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-2">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-xl">Why Live Here</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{community.whyLiveHere}</p>
            </div>

            <div className="bg-card p-6 rounded-xl border space-y-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-2">
                <HomeIcon className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-xl">Housing Types</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{community.housingTypes}</p>
            </div>

            <div className="bg-card p-6 rounded-xl border space-y-3 sm:col-span-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-2">
                <TreePine className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-xl">Local Amenities & Lifestyle</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{community.amenities}</p>
            </div>
          </section>

          {/* CTAs */}
          <section className="bg-muted/50 p-8 rounded-2xl border flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="font-serif text-2xl font-bold">Looking to move to {community.name}?</h3>
              <p className="text-muted-foreground">Let us help you find the perfect property or evaluate your current home.</p>
            </div>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link href="/buyers">Buy Here</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/sellers">Sell Here</Link>
              </Button>
            </div>
          </section>

          {/* Related Areas */}
          <section className="pt-8 border-t">
            <h3 className="font-serif text-2xl font-bold mb-6">Explore Nearby Areas</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {otherCommunities.map(c => (
                <Link key={c.slug} href={`/communities/${c.slug}`}>
                  <div className="group relative h-32 rounded-lg overflow-hidden border">
                    <img src={c.imageUrl} alt={c.name} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 opacity-80" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold font-serif text-lg">{c.name}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar Form */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <LeadForm 
            source={`mygtahomesearch-${community.slug}`}
            title={`Interested in ${community.name}?`}
            subtitle="Get local market updates and new listing alerts."
            buttonText="Get Local Updates"
            showTimeline={true}
          />
        </div>
      </div>
    </div>
  );
}
