import React, { useEffect } from "react";
import { getDocumentTitle } from "@/lib/utils";
import { siteConfig } from "@/content/site-config";

export default function Privacy() {
  useEffect(() => {
    document.title = getDocumentTitle("Privacy Policy");
  }, []);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <p>We ("we", "our", or "us") respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website.</p>

          <h2>1. Information We Collect</h2>
          <p>We may collect personal identification information that you voluntarily provide to us when you fill out lead forms, contact forms, or register for updates. This includes:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Property address or area of interest</li>
            <li>Buying or selling timeline and budget</li>
            <li>Any custom messages you submit</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your real estate inquiries</li>
            <li>Provide home valuations or tailored property searches</li>
            <li>Send you relevant real estate market updates and listings (if you have opted in)</li>
            <li>Improve our website and customer service</li>
          </ul>

          <h2>3. Cookies and Tracking Technologies</h2>
          <p>We may use cookies, web beacons, and similar tracking technologies to improve your browsing experience. Cookies help us understand how users interact with our site and allow us to optimize our content.</p>

          <h2>4. Third-Party Services</h2>
          <p>We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners and trusted affiliates. Our website data is processed securely through trusted hosting and CRM providers.</p>

          <h2>5. Your Rights</h2>
          <p>You have the right to request access to the personal data we hold about you, to request corrections, or to ask us to delete your data. To exercise these rights, please contact us.</p>

          <h2>6. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at:</p>
          <p>
            <strong>GTA Home Search</strong><br />
            {siteConfig.email && <>Email: {siteConfig.email}<br /></>}
            {siteConfig.phone && <>Phone: {siteConfig.phone}</>}
          </p>
        </div>
      </div>
    </div>
  );
}
