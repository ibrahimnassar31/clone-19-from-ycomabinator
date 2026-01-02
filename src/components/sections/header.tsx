"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { Menu, X, ChevronDown, Sparkles, Layout, Zap, Users, BookOpen, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Data Structure matching zeroheight's actual site architecture ---
const NAV_DATA = [
  {
    name: "Features",
    dropdown: [
      { title: "Tokens", desc: "Manage design tokens at scale", icon: <Zap className="w-5 h-5" /> },
      { title: "Components", desc: "Document code and design together", icon: <Layout className="w-5 h-5" /> },
      { title: "Governance", desc: "Review and approve changes", icon: <Sparkles className="w-5 h-5" /> },
      { title: "Analytics", desc: "Measure system adoption", icon: <BarChart3 className="w-5 h-5" /> },
    ],
  },
  {
    name: "Solutions",
    dropdown: [
      { title: "Design Ops", desc: "Scale your design language", icon: <Users className="w-5 h-5" /> },
      { title: "Enterprise", desc: "Security and scale for big teams", icon: <BookOpen className="w-5 h-5" /> },
    ],
  },
  { name: "Customers", href: "/customers" },
  { name: "Resources", href: "/resources" },
  { name: "Pricing", href: "/pricing" },
];

export default function ZeroHeightHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const headerRef = useRef<HTMLElement>(null);

  // 1. GSAP: Advanced Scroll Compression
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const ctx = gsap.context(() => {
      // Entrance reveal
      gsap.from(".nav-link", {
        y: -15,
        opacity: 0,
        stagger: 0.04,
        duration: 0.8,
        ease: "power4.out",
        delay: 0.2
      });

      // Subtle compression on scroll
      ScrollTrigger.create({
        start: "top top",
        end: 100,
        onUpdate: (self) => {
          gsap.to(headerRef.current, {
            paddingTop: self.progress > 0.5 ? "12px" : "24px",
            paddingBottom: self.progress > 0.5 ? "12px" : "24px",
            duration: 0.4,
            ease: "power2.out",
          });
        }
      });
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={clsx(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-6",
        isScrolled ? "bg-[#F9F7F2]/90 backdrop-blur-xl border-b border-black/5" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-[1280px] flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex-1 flex items-center">
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-display text-[24px] font-bold tracking-tighter text-black">
              zeroheight
            </span>
            <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 4 }}
                className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1" 
            />
          </Link>
        </div>

        {/* Desktop Nav - Using "Pill" Interaction */}
        <nav 
          className="hidden lg:flex items-center gap-1 relative"
          onMouseLeave={() => setHoveredItem(null)}
        >
          {NAV_DATA.map((item) => (
            <div 
              key={item.name} 
              className="relative px-4 py-2"
              onMouseEnter={() => setHoveredItem(item.name)}
            >
              {/* The "Ghost" Pill Background */}
              {hoveredItem === item.name && (
                <motion.div
                  layoutId="nav-pill"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  className="absolute inset-0 bg-black/5 rounded-full z-0"
                />
              )}

              <Link 
                href={item.href || "#"} 
                className="relative z-10 flex items-center gap-1 text-[15px] font-medium text-black/70 hover:text-black transition-colors nav-link"
              >
                {item.name}
                {item.dropdown && (
                  <ChevronDown className={clsx("w-4 h-4 transition-transform", hoveredItem === item.name && "rotate-180")} />
                )}
              </Link>

              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {item.dropdown && hoveredItem === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[480px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-black/5 overflow-hidden p-4 grid grid-cols-2 gap-2"
                  >
                    {item.dropdown.map((sub) => (
                      <Link 
                        key={sub.title} 
                        href="#" 
                        className="flex items-start gap-4 p-3 rounded-xl hover:bg-[#F9F7F2] transition-colors group"
                      >
                        <div className="p-2 bg-black/5 rounded-lg text-black group-hover:bg-black group-hover:text-white transition-colors">
                          {sub.icon}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-black">{sub.title}</div>
                          <div className="text-xs text-black/50 leading-snug">{sub.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="flex-1 flex justify-end items-center gap-6">
          <Link href="#" className="hidden md:block text-sm font-bold text-black/60 hover:text-black transition-colors nav-link">
            Log in
          </Link>
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="nav-link"
          >
            <Link 
              href="#" 
              className="bg-black text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-all"
            >
              Get Started
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Slide */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#F9F7F2] z-[90] p-8 pt-32 lg:hidden flex flex-col gap-8"
          >
            {NAV_DATA.map((item, i) => (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={item.name}
              >
                <Link 
                  href={item.href || "#"} 
                  className="text-4xl font-bold tracking-tight"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <div className="mt-auto flex flex-col gap-4">
               <button className="w-full py-4 rounded-xl border border-black font-bold">Log in</button>
               <button className="w-full py-4 rounded-xl bg-black text-white font-bold">Sign up free</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}