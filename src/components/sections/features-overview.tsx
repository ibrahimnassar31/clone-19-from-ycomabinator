"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  BookCopy,
  BarChart3,
  Layers,
  SlidersHorizontal,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TABS_DATA = [
  {
    id: "documentation",
    label: "Documentation",
    icon: BookCopy,
    title: "Documentation",
    description: "Connect, customize, and launch your doc site into the stratosphere. zeroheight keeps your design system docs organized, up to date, and ready for your whole team to use.",
    linkText: "Discover Documentation",
    bgColor: "bg-[#A598FF]",
  },
  {
    id: "delivery",
    label: "Delivery",
    icon: Layers,
    title: "Delivery",
    description: "Bridge the gap between design and code with developer-friendly features that automate workflows and streamline handoff.",
    linkText: "Discover Delivery",
    bgColor: "bg-[#14B8A6]",
  },
  {
    id: "measurement",
    label: "Measurement",
    icon: BarChart3,
    title: "Measurement",
    description: "Understand how your design system is performing with analytics that measure adoption, identify areas for improvement, and demonstrate business value.",
    linkText: "Discover Measurement",
    bgColor: "bg-[#FFB800]",
  },
  {
    id: "management",
    label: "Management",
    icon: SlidersHorizontal,
    title: "Management",
    description: "Manage every aspect of your design system from a central hub. Control permissions, automate workflows, and ensure your system is secure and scalable.",
    linkText: "Discover Management",
    bgColor: "bg-[#FFA6A6]",
  },
];

const FeaturesOverview = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    TABS_DATA.forEach((_, index) => {
      const card = cardsRef.current[index];
      if (!card) return;

      const offset = index - activeIndex;
      let effectiveOffset = offset;
      
      if (Math.abs(offset) > TABS_DATA.length / 2) {
        effectiveOffset = offset > 0 ? offset - TABS_DATA.length : offset + TABS_DATA.length;
      }

      const isActive = index === activeIndex;
      const isVisible = Math.abs(effectiveOffset) <= 1;

      gsap.to(card, {
        xPercent: effectiveOffset * 70, // المسافة الأفقية
        scale: isActive ? 1 : 0.85,    // تصغير الكروت الجانبية
        opacity: isVisible ? 1 : 0,    // إخفاء الكروت البعيدة
        zIndex: 10 - Math.abs(effectiveOffset),
        duration: 0.8,
        ease: "expo.out",
        overwrite: true,
      });

      if (isActive) {
        const elements = card.querySelectorAll(".animate-content");
        gsap.fromTo(elements, 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.2 }
        );
      }
    });
  }, [activeIndex]);

  const handleTabClick = (index: number) => setActiveIndex(index);
  const handlePrev = () => setActiveIndex((p) => (p > 0 ? p - 1 : TABS_DATA.length - 1));
  const handleNext = () => setActiveIndex((p) => (p < TABS_DATA.length - 1 ? p + 1 : 0));

  return (
    <section ref={containerRef} className="bg-surface-light py-20 lg:py-[120px] overflow-hidden">
      <div className="container text-center">
        <h2 className="font-display font-bold text-text-primary text-[clamp(2.25rem,3vw+1rem,3.5rem)] leading-[1.15] -tracking-[0.01em] max-w-[686px] mx-auto">
          Stay on top of your design system at every stage
        </h2>
        <p className="font-body text-body-lg text-text-secondary max-w-3xl mx-auto mt-6">
          zeroheight brings all the separate parts of your design system together...
        </p>

        <div className="flex justify-center flex-wrap gap-2 mt-10" role="tablist">
          {TABS_DATA.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(index)}
              className={cn(
                "group py-2.5 px-5 rounded-full flex items-center gap-2 transition-all duration-300 transform active:scale-95",
                activeIndex === index ? "bg-[#A598FF] text-white shadow-lg" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              )}
            >
              <tab.icon className={cn("h-4 w-4 transition-transform group-hover:rotate-12", activeIndex === index && "animate-pulse")} />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-16 lg:mt-24">
        <div className="relative w-full h-[500px] flex items-center justify-center">
          {TABS_DATA.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute w-[90%] md:w-[70%] lg:w-[624px] h-[480px] pointer-events-none"
              style={{ pointerEvents: activeIndex === index ? 'auto' : 'none' }}
            >
              <div className={cn("w-full h-full rounded-3xl p-10 md:p-14 text-white shadow-2xl relative overflow-hidden", card.bgColor)}>
                <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
                
                <div className="relative z-10 h-full flex flex-col justify-center">
                  <h3 className="animate-content font-display font-bold text-4xl md:text-5xl leading-tight">
                    {card.title}
                  </h3>
                  <p className="animate-content mt-6 text-lg opacity-85 leading-relaxed max-w-md">
                    {card.description}
                  </p>
                  <div className="animate-content mt-10">
                    <a href="#" className="inline-flex items-center gap-3 font-bold text-lg group bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition-all">
                      <div className="bg-white rounded-full p-2 group-hover:scale-110 transition-transform">
                        <Play className="w-3 h-3 fill-black text-black" />
                      </div>
                      <span>{card.linkText}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container flex justify-center items-center gap-6 mt-12">
        <button onClick={handlePrev} className="p-4 rounded-full bg-white border border-neutral-200 hover:border-black transition-colors shadow-sm active:scale-90">
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="flex gap-3">
          {TABS_DATA.map((_, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={cn(
                "h-1.5 transition-all duration-500 rounded-full",
                activeIndex === index ? "w-8 bg-black" : "w-2 bg-neutral-300 hover:bg-neutral-400"
              )}
            />
          ))}
        </div>

        <button onClick={handleNext} className="p-4 rounded-full bg-white border border-neutral-200 hover:border-black transition-colors shadow-sm active:scale-90">
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default FeaturesOverview;