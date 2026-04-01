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
            <div className="pt-2 space-y-2 text-sm">
              <p><span className="font-semibold text-foreground">Phone:</span> {siteConfig.phone}</p>
              <p><span className="font-semibold text-foreground">Email:</span> {siteConfig.email}</p>
              <p className="text-muted-foreground mt-4">{siteConfig.address}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/search" className="hover:text-primary transition-colors">Search Homes</Link></li>
              <li><Link href="/buyers" className="hover:text-primary transition-colors">Buyers</Link></li>
              <li><Link href="/sellers" className="hover:text-primary transition-colors">Sellers</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Communities */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Communities</h4>
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

          {/* Social & Connect */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Connect</h4>
            <p className="text-sm text-muted-foreground">Follow us for GTA market updates, new listings, and community news.</p>
            <div className="flex gap-4 pt-2">
              <a href={siteConfig.socialLinks.instagram} className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">IN</a>
              <a href={siteConfig.socialLinks.facebook} className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">FB</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t space-y-4 text-center md:text-left">
          <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl">
            {siteConfig.disclaimer}
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link href="/admin/login" className="hover:text-foreground transition-colors opacity-30 hover:opacity-70">Admin</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
