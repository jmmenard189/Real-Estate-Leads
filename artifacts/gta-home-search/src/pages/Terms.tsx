import React, { useEffect } from "react";
import { getDocumentTitle } from "@/lib/utils";
import { siteConfig } from "@/content/site-config";

export default function Terms() {
  useEffect(() => {
    document.title = getDocumentTitle("Terms of Service & Disclaimer");
  }, []);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold mb-8">Terms of Service & Disclaimer</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using this website ({siteConfig.url}), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this website.</p>

          <h2>2. Brokerage Identity & Affiliation</h2>
          <p>This website is operated by independent sales representatives licensed with <strong>{siteConfig.brokerage}</strong>. The brokerage is independently owned and operated. All content and advertising on this website are subject to brokerage review and approval.</p>
          
          <h2>3. No MLS/IDX Data Disclaimer</h2>
          <p>This website is an independent lead generation platform. It is <strong>not</strong> the official website of the Toronto Regional Real Estate Board (TRREB), the Canadian Real Estate Association (CREA), or the Ontario Real Estate Association (OREA). Property listings and search features provided on this site are for informational purposes only and do not constitute a direct live feed from the MLS® system unless explicitly stated.</p>

          <h2>4. Information Accuracy</h2>
          <p>While we strive to provide accurate and up-to-date information regarding the GTA real estate market, we make no warranties or representations as to the accuracy, completeness, or reliability of any information found on this site. Real estate markets fluctuate, and users should verify all facts before making financial decisions.</p>

          <h2>5. Not Professional Advice</h2>
          <p>The content provided on this website is for general informational purposes only. It is not intended to provide specific legal, accounting, financial, or tax advice. You should consult with appropriate professionals before making any real estate transaction decisions.</p>

          <h2>6. Limitation of Liability</h2>
          <p>In no event shall {siteConfig.name}, its affiliates, or {siteConfig.brokerage} be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, or use of, the site and its content.</p>

          <h2>7. Contact</h2>
          <p>For questions regarding these terms, please contact us at {siteConfig.email}.</p>
        </div>
      </div>
    </div>
  );
}
