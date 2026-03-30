import React, { useEffect } from "react";
import { Link } from "wouter";
import { getDocumentTitle } from "@/lib/utils";
import { communities } from "@/content/communities";
import { motion } from "framer-motion";

export default function CommunitiesIndex() {
  useEffect(() => {
    document.title = getDocumentTitle("GTA Communities");
  }, []);

  return (
    <div className="min-h-screen pb-24">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">Explore GTA Communities</h1>
          <p className="text-lg text-primary-foreground/80">
            From vibrant urban centers to peaceful lakeside suburbs, discover the diverse neighborhoods that make the Greater Toronto Area an incredible place to call home.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {communities.map((community, index) => (
            <motion.div
              key={community.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/communities/${community.slug}`}>
                <div className="bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img 
                      src={community.imageUrl} 
                      alt={community.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h2 className="absolute bottom-4 left-6 text-2xl font-serif font-bold text-white">
                      {community.name}
                    </h2>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-primary font-medium mb-3 text-sm tracking-wide uppercase">{community.tagline}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                      {community.description}
                    </p>
                    <div className="mt-auto flex items-center text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      Explore {community.name} →
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
