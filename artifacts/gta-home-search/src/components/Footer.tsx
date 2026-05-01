import React from "react";
import { Link } from "wouter";
import { siteConfig } from "@/content/site-config";
import { communities } from "@/content/communities";

export function Footer() {
  return (
    <footer className="bg-card border-t py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand & Contact */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold">{siteConfig.name}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {siteConfig.description}
            </p>
            {(siteConfig.phone || siteConfig.email) && (
              <div className="pt-2 space-y-2 text-sm">
                {siteConfig.phone && <p><span className="font-semibold text-foreground">Phone:</span> {siteConfig.phone}</p>}
                {siteConfig.email && <p><span className="font-semibold text-foreground">Email:</span> {siteConfig.email}</p>}
                {siteConfig.address && <p className="text-muted-foreground mt-4">{siteConfig.address}</p>}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/search" className="hover:text-primary transition-colors">Search Homes</Link></li>
              <li><Link href="/buyers" className="hover:text-primary transition-colors">Buyer Resources</Link></li>
              <li><Link href="/sellers" className="hover:text-primary transition-colors">Get Home Value</Link></li>
              <li><Link href="/communities" className="hover:text-primary transition-colors">Communities</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Communities */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Service Areas</h4>
            <ul className="space-y-2 text-sm text-muted-foreground grid grid-cols-2 gap-x-4">
              {communities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/communities/${c.slug}`} className="hover:text-primary transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Connect</h4>
            <p className="text-sm text-muted-foreground">Follow for GTA market updates and community news.</p>
            <div className="flex gap-4 pt-2">
              <a href={siteConfig.socialLinks.instagram} className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors text-xs font-bold">IN</a>
              <a href={siteConfig.socialLinks.facebook} className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors text-xs font-bold">FB</a>
            </div>
          </div>
        </div>

        {/* Compliance block */}
        <div className="mt-12 pt-8 border-t space-y-3">
          <div className="bg-muted/40 rounded-xl p-5 space-y-2">
            <p className="text-xs text-muted-foreground leading-relaxed font-medium">
              Jean-Michel Menard, Sales Representative, RE/MAX West Realty Inc., Brokerage.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Not intended to solicit buyers or sellers currently under contract.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Listing information deemed reliable but not guaranteed and should be independently verified.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {siteConfig.disclaimer}
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground pt-2">
            <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link href="/admin/login" className="hover:text-foreground transition-colors flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
