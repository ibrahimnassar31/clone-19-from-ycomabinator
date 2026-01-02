"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Linkedin, LinkedinIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP Plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- SVG Icons ---
const ZeroheightLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="125" height="25" viewBox="0 0 125 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_footer_logo)">
      <path d="M11.666 23.3323V1.66567H0V-0.000976562H13.3327V24.999H0V23.3323H11.666Z" fill="#1A1A1A"/>
      <path d="M29.5829 1.66667V0H42.9156V1.66667H37.4158L29.5825 23.3333H42.9156V25H29.5829V23.3333H35.0827L42.9159 1.66667H29.5829Z" fill="#1A1A1A"/>
      <path d="M60.4158 1.66667H47.0831V23.3333H60.4158V25H45.4164V0H60.4158V1.66667Z" fill="#1A1A1A"/>
      <path d="M78.7493 1.66667H65.4167V23.3333H78.7493V25H63.75V0H78.7493V1.66667Z" fill="#1A1A1A"/>
      <path d="M83.3333 1.66667H96.666V23.3333H83.3333V1.66667ZM84.9999 21.6667H95V3.33333H84.9999V21.6667Z" fill="#1A1A1A"/>
      <path d="M99.5833 23.3333V1.66667H112.916V23.3333H99.5833ZM111.25 3.33333H101.25V21.6667H111.25V3.33333Z" fill="#1A1A1A"/>
      <path d="M69.5833 10H74.5833V15H69.5833V10Z" fill="#FF5757"/>
      <path d="M115.833 10H120.833V15H115.833V10Z" fill="#FF5757"/>
    </g>
    <defs>
      <clipPath id="clip0_footer_logo">
        <rect width="124.17" height="25" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.931L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298l13.312 17.404z" />
  </svg>
);

// --- New Components ---

const InfiniteMarquee = () => {
  return (
    <div className="w-full overflow-hidden py-4 bg-black text-white relative my-8">
      <div className="whitespace-nowrap flex animate-marquee gap-12 font-mono text-sm uppercase tracking-widest opacity-80">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="flex items-center gap-4">
            <span className="w-2 h-2 bg-[#FF5757] rounded-full"></span>
            Design Systems
            <span className="w-2 h-2 bg-[#FF5757] rounded-full"></span>
            Connect
            <span className="w-2 h-2 bg-[#FF5757] rounded-full"></span>
            Scale
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

// --- Data ---

const mainLinkColumns = [
  {
    groups: [
      { title: 'Features', links: [{ name: 'Documentation' }, { name: 'Delivery' }, { name: 'Measurement' }, { name: 'Management' }] },
      { title: 'Platform', links: [{ name: 'Integrations' }, { name: `What's new` }, { name: 'Pricing' }, { name: 'Request a demo' }] },
    ]
  },
  {
    groups: [
      { title: 'Solutions', links: [{ name: 'Design' }, { name: 'Engineering' }, { name: 'Leaders' }, { name: 'Early Stage' }, { name: 'Scaling' }, { name: 'Enterprise' }, { name: 'Multi-product' }] },
      { title: 'Company', links: [{ name: 'About' }, { name: 'Careers' }] },
    ]
  },
];

const resources = {
  title: 'Resources',
  columns: [
    [{ name: 'Help Center' }, { name: 'Resource Centre' }, { name: 'Customers' }, { name: 'Showcase' }, { name: 'eBooks & Newsletters' }, { name: 'Blog' }, { name: 'Design Systems Report' }, { name: 'Webinars' }, { name: 'Converge' }],
    [{ name: 'Podcasts' }, { name: 'zeroheight 101' }, { name: 'Accessibility' }, { name: 'Trust Center' }, { name: 'Contact Us' }]
  ]
};

// --- Main Component ---

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const socialIconsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const magneticAreaRef = useRef<HTMLDivElement>(null);

  // GSAP Animation Logic
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Top Border Line Animation (The "Draw" Effect)
      gsap.from(".footer-border-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse"
        }
      });

      // 2. Staggered Column Entrance (The "Stacking" Effect)
      gsap.from(".footer-col", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        }
      });

      // 3. Links Entrance (The "Pop" Effect)
      gsap.from(".footer-link-item", {
        y: 20,
        opacity: 0,
        stagger: 0.02,
        duration: 0.6,
        delay: 0.4,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        }
      });

      // 4. Footer Bar Slide Up
      gsap.from(".footer-bottom-bar", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "bottom 95%",
        }
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  // Magnetic Effect for Social Icons
  const handleMagneticMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const area = magneticAreaRef.current;
    if (!area) return;

    const icons = socialIconsRef.current.filter(Boolean);
    
    icons.forEach((icon) => {
      if (!icon) return;
      const rect = icon.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate distance to determine strength
      const dist = Math.sqrt(x*x + y*y);
      const strength = Math.max(0, 1 - dist / 200); // Effect fades out as you get further

      if (strength > 0) {
        gsap.to(icon, {
          x: x * 0.4 * strength,
          y: y * 0.4 * strength,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(icon, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      }
    });
  };

  const handleMagneticLeave = () => {
    const icons = socialIconsRef.current.filter(Boolean);
    icons.forEach((icon) => {
      gsap.to(icon, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    });
  };

  return (
    <footer 
      ref={footerRef} 
      className="bg-background text-text-primary pt-24 pb-10 font-body relative overflow-hidden"
    >
      {/* Top Animated Border Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-border-medium footer-border-line" />

      <div className="max-w-[1268px] mx-auto px-7 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12">
          
          {/* Left Column: Branding & Newsletter */}
          <div className="footer-col lg:col-span-4 xl:col-span-3 flex flex-col">
            <div className="mb-8">
           <Link href="/" className="group flex items-center gap-2">
            <span className="font-display text-[24px] font-bold tracking-tighter text-black">
              zeroheight
            </span>
            <div 
                className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1" 
            />
          </Link>
             
            </div>
            
            <h3 className="text-base font-medium mt-6 mb-4">Sign up to the latest updates</h3>
            
            <form onSubmit={(e) => e.preventDefault()} className="relative group">
              <div className="relative">
                <Input 
                  type="email" 
                  placeholder="Email here" 
                  className="bg-ui-taupe border-transparent rounded-md py-3 px-4 h-auto placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 transition-colors"
                />
                <button type="submit" aria-label="Submit email" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-black rounded-sm flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 flex items-start gap-2.5">
                <Checkbox id="marketing" className="mt-0.5" />
                <label htmlFor="marketing" className="text-sm text-text-secondary leading-snug cursor-pointer select-none">
                  Sign me up to zeroheight’s marketing updates
                </label>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                By clicking submit, you are agreeing to zeroheight’s privacy policy.
              </p>
            </form>
          </div>

          {/* Right Column: Links */}
          <div className="footer-col lg:col-span-8 xl:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
              {mainLinkColumns.map((col, i) => (
                <div key={i} className="flex flex-col gap-8">
                  {col.groups.map((group, idx) => (
                    <div key={idx}>
                      <h4 className="text-base font-medium mb-4 text-text-primary">{group.title}</h4>
                      <ul className="space-y-2.5">
                        {group.links.map((link) => (
                          <li key={link.name}>
                            <Link href="#" className="footer-link-item block text-sm text-text-secondary hover:text-primary transition-colors relative inline-block group/link">
                              <span className="relative z-10">{link.name}</span>
                              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover/link:w-full"></span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              
              {/* Resources Column (Spanning 2 cols) */}
              <div className="sm:col-span-2 lg:col-span-2">
                <h4 className="text-base font-medium mb-4 text-text-primary">{resources.title}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 sm:gap-y-0">
                  <ul className="space-y-2.5">
                    {resources.columns[0].map((link) => (
                      <li key={link.name}>
                        <Link href="#" className="footer-link-item block text-sm text-text-secondary hover:text-primary transition-colors relative inline-block group/link">
                          <span className="relative z-10">{link.name}</span>
                          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover/link:w-full"></span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-2.5">
                    {resources.columns[1].map((link) => (
                      <li key={link.name}>
                        <Link href="#" className="footer-link-item block text-sm text-text-secondary hover:text-primary transition-colors relative inline-block group/link">
                          <span className="relative z-10">{link.name}</span>
                          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover/link:w-full"></span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Infinite Marquee Breaker */}
        <div className="footer-col my-12">
            <InfiniteMarquee />
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar pt-8 border-t border-border-medium flex flex-col-reverse md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-x-6 gap-y-2 text-sm text-text-secondary">
            <p className="text-center sm:text-left">&copy; zeroheight 2025. All rights reserved.</p>
            <div className="flex gap-x-6">
              <Link href="#" className="hover:text-primary transition-colors">Terms & Conditions</Link>
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            </div>
          </div>
          
          {/* Magnetic Area for Socials */}
          <div 
            ref={magneticAreaRef}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            className="flex items-center gap-3 text-sm text-text-secondary relative"
          >
            <p>Connect with us</p>
            <div className="flex items-center gap-2">
              <a href="#" ref={(el) => { if(el) socialIconsRef.current[0] = el }} aria-label="Slack" className="block p-2 bg-ui-taupe rounded-md hover:bg-white transition-colors duration-300">
                <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9bc559cc-8a12-4ede-baa6-824d6ddebe75-zeroheight-com/assets/svgs/slack-icon_22bc2e6a-22.svg" alt="Slack logo" width={20} height={20} className="h-5 w-5"/>
              </a>
              <a href="#" ref={(el) => { if(el) socialIconsRef.current[1] = el }} aria-label="X (formerly Twitter)" className="block p-2 bg-ui-taupe rounded-md hover:bg-white transition-colors duration-300">
                <XIcon className="h-5 w-5 text-text-primary" />
              </a>
              <a href="#" ref={(el) => { if(el) socialIconsRef.current[2] = el }} aria-label="LinkedIn" className="block p-2 bg-ui-taupe rounded-md hover:bg-white transition-colors duration-300">
                <Linkedin className="h-5 w-5 text-text-primary" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;