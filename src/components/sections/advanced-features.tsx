"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP Plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cn = (...classes) => classes.filter(Boolean).join(" ");

/* ----------------------------- Icons ----------------------------- */

const BrushIcon = ({ className }) => {
  const uid = React.useId();
  const clip0 = `${uid}-clip0`;
  const clip1 = `${uid}-clip1`;

  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("opacity-90", className)}
      aria-hidden="true"
    >
      <g clipPath={`url(#${clip0})`}>
        <g clipPath={`url(#${clip1})`}>
          <path
            d="M19.402 8.34418C19.4025 8.18711 19.3718 8.0315 19.3116 7.88641C19.2515 7.74131 19.1631 7.60963 19.0515 7.499L13.9192 2.36592C13.8082 2.25486 13.6764 2.16677 13.5313 2.10666C13.3862 2.04656 13.2307 2.01562 13.0737 2.01562C12.9166 2.01562 12.7611 2.04656 12.616 2.10666C12.471 2.16677 12.3391 2.25486 12.2281 2.36592L10.1036 4.49044L5.76934 6.11728C5.57236 6.19074 5.39813 6.31466 5.2641 6.47662C5.13007 6.63859 5.04093 6.83293 5.00562 7.04017L3.26894 17.461C3.25461 17.5467 3.25911 17.6344 3.28214 17.7182C3.30517 17.8019 3.34617 17.8797 3.40229 17.9459C3.45841 18.0122 3.52829 18.0655 3.60709 18.102C3.68588 18.1386 3.77169 18.1575 3.85854 18.1575C3.89159 18.1574 3.92457 18.1546 3.95718 18.1493L14.3773 16.4126C14.5843 16.378 14.7785 16.2896 14.9405 16.1562C15.1025 16.0228 15.2266 15.8491 15.3002 15.6526L16.927 11.3184L19.0515 9.1901C19.1631 9.07937 19.2515 8.94755 19.3117 8.80233C19.3719 8.65711 19.4026 8.50137 19.402 8.34418ZM14.1808 15.2334L5.6012 16.6629L9.14108 13.1231C9.58321 13.362 10.0966 13.4338 10.5873 13.3254C11.078 13.217 11.5134 12.9356 11.8137 12.5326C12.114 12.1296 12.2592 11.632 12.2228 11.1308C12.1864 10.6295 11.9708 10.1581 11.6155 9.80275C11.2601 9.44738 10.7887 9.23179 10.2874 9.19539C9.78619 9.159 9.28859 9.30423 8.88561 9.60454C8.48264 9.90485 8.20121 10.3402 8.0928 10.8309C7.98438 11.3216 8.05621 11.835 8.29516 12.2771L4.75528 15.8185L6.18483 7.23671L10.2852 5.69955L15.7179 11.133L14.1808 15.2334ZM9.23898 11.2825C9.23898 11.1051 9.29157 10.9318 9.3901 10.7843C9.48864 10.6368 9.62869 10.5219 9.79255 10.454C9.9564 10.3861 10.1367 10.3684 10.3107 10.403C10.4846 10.4376 10.6444 10.523 10.7698 10.6484C10.8952 10.7738 10.9806 10.9336 11.0152 11.1075C11.0498 11.2815 11.0321 11.4618 10.9642 11.6257C10.8963 11.7895 10.7814 11.9296 10.6339 12.0281C10.4864 12.1266 10.3131 12.1792 10.1357 12.1792C9.89788 12.1792 9.6698 12.0848 9.50162 11.9166C9.33345 11.7484 9.23898 11.5203 9.23898 11.2825ZM16.4129 10.1377L11.2798 5.00532L13.0733 3.21184L18.2064 8.34418L16.4129 10.1377Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id={clip0}>
          <rect width="20" height="20" fill="white" transform="translate(0 0.546875)" />
        </clipPath>
        <clipPath id={clip1}>
          <rect width="19.1304" height="19.1304" fill="white" transform="translate(0.869141 1.41406)" />
        </clipPath>
      </defs>
    </svg>
  );
};

const CodeIcon = ({ className }) => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M5.39981 7.58205L2.22638 10.2266L5.39981 12.8711C5.46469 12.9231 5.51856 12.9874 5.55827 13.0604C5.59798 13.1334 5.62272 13.2136 5.63107 13.2963C5.63941 13.379 5.63117 13.4625 5.60685 13.542C5.58252 13.6214 5.54259 13.6953 5.48939 13.7591C5.43619 13.823 5.3708 13.8756 5.29702 13.9138C5.22325 13.9521 5.14259 13.9753 5.05976 13.982C4.97692 13.9887 4.89358 13.9788 4.8146 13.953C4.73563 13.9271 4.66261 13.8857 4.59981 13.8313L0.849813 10.7063C0.779447 10.6476 0.722836 10.5742 0.683987 10.4912C0.645137 10.4083 0.625 10.3178 0.625 10.2262C0.625 10.1346 0.645137 10.0441 0.683987 9.96114C0.722836 9.87818 0.779447 9.80477 0.849813 9.74611L4.59981 6.62111C4.72724 6.51503 4.89159 6.46391 5.05671 6.479C5.22183 6.49409 5.37419 6.57415 5.48028 6.70158C5.58637 6.82901 5.63749 6.99336 5.6224 7.15848C5.60731 7.3236 5.52724 7.47597 5.39981 7.58205ZM19.1498 9.74611L15.3998 6.62111C15.3367 6.56859 15.2639 6.529 15.1855 6.50461C15.1071 6.48023 15.0247 6.47153 14.9429 6.479C14.8612 6.48647 14.7817 6.50997 14.709 6.54816C14.6363 6.58636 14.5719 6.63849 14.5193 6.70158C14.4133 6.82901 14.3621 6.99336 14.3772 7.15848C14.3923 7.3236 14.4724 7.47597 14.5998 7.58205L17.7733 10.2266L14.5998 12.8711C14.5349 12.9231 14.4811 12.9874 14.4414 13.0604C14.4016 13.1334 14.3769 13.2136 14.3686 13.2963C14.3602 13.379 14.3685 13.4625 14.3928 13.542C14.4171 13.6214 14.457 13.6953 14.5102 13.7591C14.5634 13.823 14.6288 13.8756 14.7026 13.9138C14.7764 13.9521 14.857 13.9753 14.9399 13.982C15.0227 13.9887 15.106 13.9788 15.185 13.953C15.264 13.9271 15.337 13.8857 15.3998 13.8313L19.1498 10.7063C19.2202 10.6476 19.2768 10.5742 19.3156 10.4912C19.3545 10.4083 19.3746 10.3178 19.3746 10.2262C19.3746 10.1346 19.3545 10.0441 19.3156 9.96114C19.2768 9.87818 19.2202 9.80477 19.1498 9.74611ZM12.7131 2.76408C12.6359 2.73607 12.554 2.72353 12.472 2.72718C12.39 2.73083 12.3096 2.75059 12.2352 2.78534C12.1608 2.82009 12.0941 2.86915 12.0386 2.92971C11.9832 2.99027 11.9403 3.06115 11.9123 3.1383L6.91231 16.8883C6.88418 16.9655 6.87155 17.0475 6.87514 17.1296C6.87872 17.2117 6.89846 17.2922 6.93322 17.3667C6.96798 17.4411 7.01707 17.508 7.0777 17.5634C7.13832 17.6189 7.20929 17.6619 7.28653 17.6899C7.355 17.7142 7.42714 17.7266 7.49981 17.7266C7.62817 17.7266 7.75341 17.6871 7.85852 17.6134C7.96363 17.5397 8.04351 17.4355 8.08731 17.3149L13.0873 3.56486C13.1153 3.48771 13.1279 3.4058 13.1242 3.3238C13.1206 3.2418 13.1008 3.16133 13.0661 3.08697C13.0313 3.01261 12.9823 2.94582 12.9217 2.89042C12.8611 2.83502 12.7902 2.79209 12.7131 2.76408Z"
      fill="currentColor"
    />
  </svg>
);

/* ----------------------------- UI Blocks ----------------------------- */

const WindowTabBar = () => {
  const [active, setActive] = useState(0);

  const tabs = [
    { label: "Brand-Update", icon: <BrushIcon /> },
    { label: "localhost:6006", icon: <CodeIcon /> },
    { label: "workspace@brand:~", icon: <CodeIcon /> },
  ];

  return (
    <div className="pointer-events-auto flex h-12 w-full items-center rounded-t-xl border border-white/10 bg-[#212126] font-medium text-[#7B7D91]">
      <div className="flex items-center gap-2 border-r border-white/10 px-5">
        <span className="h-[13px] w-[13px] rounded-full bg-white/10" />
        <span className="h-[13px] w-[13px] rounded-full bg-white/10" />
        <a
          aria-label="Scroll to integrations section"
          className="h-[13px] w-[13px] rounded-full bg-white/10 transition-colors duration-300 hover:bg-[#00CA4E]"
          href="#integrations"
        />
      </div>

      <div role="tablist" aria-label="Demo tabs" className="flex h-full items-stretch overflow-x-auto">
        {tabs.map((t, idx) => {
          const selected = idx === active;
          return (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(idx)}
              className={cn(
                "flex items-center gap-2.5 border-r border-white/10 px-5 whitespace-nowrap",
                "transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-0",
                selected ? "text-white" : "hover:text-white/85"
              )}
            >
              <span className="opacity-90">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const BackMark = () => (
  <svg
    className="h-auto w-[50px]"
    viewBox="0 0 25 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M12.4154 1.11645L1.59388 0.40625L0.878906 11.1555L11.7004 11.8658L12.4154 1.11645Z" fill="#FF4852" />
    <path d="M11.4219 15.6639L13.6699 5.125L24.2795 7.35798L11.4219 15.6639Z" fill="#FF4852" />
    <path d="M16.5548 25.2405C19.5493 25.2405 21.9769 22.8291 21.9769 19.8546C21.9769 16.88 19.5493 14.4688 16.5548 14.4688C13.5604 14.4688 11.1328 16.88 11.1328 19.8546C11.1328 22.8291 13.5604 25.2405 16.5548 25.2405Z" fill="#FF4852" />
    <path d="M11.7021 11.8571C5.72906 11.4246 0.533085 15.8844 0.0976562 21.8176L10.9136 22.6009L11.7021 11.8571Z" fill="#FF4852" />
  </svg>
);

const IntegrationFlip = ({ name, logoSrc }) => (
  <div className="relative [perspective:900px]" aria-label={name} title={name}>
    <div
      className={cn(
        "relative will-change-transform",
        "[transform-style:preserve-3d]",
        "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:[transform:rotateY(180deg)]",
        "motion-reduce:transition-none motion-reduce:hover:[transform:none]"
      )}
    >
      <div
        className={cn(
          "flex h-24 w-24 items-center justify-center rounded-full bg-[#1A1A1A] p-6",
          "md:h-[133px] md:w-[133px] md:p-10",
          "border border-white/10",
          "[backface-visibility:hidden]",
          "shadow-[0_10px_24px_rgba(0,0,0,0.35)]",
          "transition-transform duration-200",
          "hover:scale-[1.02]"
        )}
      >
        <img alt={`${name} logo`} loading="lazy" decoding="async" className="h-full w-auto object-contain object-center select-none" src={logoSrc} draggable={false} />
      </div>

      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-full bg-[#1A1A1A]",
          "border border-white/10",
          "[backface-visibility:hidden] [transform:rotateY(180deg)]",
          "shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
        )}
        aria-hidden="true"
      >
        <BackMark />
      </div>
    </div>
  </div>
);

/* ----------------------------- Integrations Strip ----------------------------- */

const IntegrationsStrip = () => {
  const integrations = React.useMemo(
    () => [
      { name: "Figma", logoSrc: "https://zeroheight-wordpress-uploads.s3.amazonaws.com/wp-content/uploads/2025/06/figma-logo.svg" },
      { name: "Storybook", logoSrc: "https://zeroheight-wordpress-uploads.s3.amazonaws.com/wp-content/uploads/2025/06/storybook-logo.svg" },
      { name: "GitHub", logoSrc: "https://zeroheight-wordpress-uploads.s3.amazonaws.com/wp-content/uploads/2025/06/github-logo.svg" },
      { name: "GitLab", logoSrc: "https://zeroheight-wordpress-uploads.s3.amazonaws.com/wp-content/uploads/2025/06/gitlab-logo.svg" },
      { name: "Adobe XD", logoSrc: "https://zeroheight-wordpress-uploads.s3.amazonaws.com/wp-content/uploads/2025/06/adobe-xd-logo.svg" },
      { name: "Sketch", logoSrc: "https://zeroheight-wordpress-uploads.s3.amazonaws.com/wp-content/uploads/2025/06/sketch-logo.svg" },
    ],
    []
  );

  const loopItems = React.useMemo(() => [...integrations, ...integrations], [integrations]);

  return (
    <div id="integrations" className="relative">
      <style>{`
        @keyframes zh-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black to-transparent md:w-14" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent md:w-14" />

        <div className="flex items-center gap-3 flex-nowrap">
          <div className="flex shrink-0 items-center gap-3">
            <div className="flex h-24 flex-col justify-between md:h-[133px]">
              <div className="size-10 rounded-full bg-[#1A1A1A] border border-white/10 shadow-[0_10px_22px_rgba(0,0,0,0.35)] md:size-12" />
              <div className="size-10 rounded-full bg-[#1A1A1A] border border-white/10 shadow-[0_10px_22px_rgba(0,0,0,0.35)] md:size-12" />
            </div>
          </div>

          <div className="relative min-w-0 flex-1">
            <div
              className={cn(
                "flex items-center flex-nowrap gap-3",
                "animate-[zh-marquee_22s_linear_infinite]",
                "motion-reduce:animate-none",
                "will-change-transform",
                "hover:[animation-play-state:paused]"
              )}
              style={{ width: "max-content" }}
            >
              {loopItems.map((it, idx) => (
                <IntegrationFlip key={`${it.name}-${idx}`} name={it.name} logoSrc={it.logoSrc} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex h-[96px] gap-3 bg-black md:h-[137px]">
        <div className="flex flex-col justify-between">
          <div className="size-10 rounded-full bg-[#1A1A1A] border border-white/10 shadow-[0_10px_22px_rgba(0,0,0,0.35)] md:size-12" />
          <div className="size-10 rounded-full bg-[#1A1A1A] border border-white/10 shadow-[0_10px_22px_rgba(0,0,0,0.35)] md:size-12" />
        </div>

        <div className="flex items-stretch gap-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <svg
              key={i}
              className="h-full w-[50px]"
              viewBox="0 0 50 137"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M49.9766 16.418C49.9766 19.7317 47.2903 22.418 43.9766 22.418H28.1592C24.8455 22.418 22.1592 25.1043 22.1592 28.418V109.145C22.1592 112.458 24.8455 115.145 28.1592 115.145H43.9766C47.2903 115.145 49.9766 117.831 49.9766 121.145V130.781C49.9766 134.095 47.2902 136.781 43.9764 136.781L6.7041 136.78H6.52246C3.20875 136.78 0.522461 134.094 0.522461 130.78V6.78125C0.522461 3.46754 3.20875 0.78125 6.52246 0.78125H43.9766C47.2903 0.78125 49.9766 3.46754 49.9766 6.78125V16.418Z"
                fill="#1A1A1A"
              />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ----------------------------- Cards ----------------------------- */

const FeatureCard = ({ bg, title, body, children, onMouseMove, onMouseLeave }) => (
  <div
    className={cn(
      "group relative overflow-hidden rounded-[22px] border border-black/10",
      "shadow-[0_18px_40px_rgba(0,0,0,0.35)]",
      "p-10 sm:p-12",
      "min-h-[560px] lg:min-h-[680px]",
      "pb-[280px] lg:pb-[320px]",
      "transition-transform duration-300 ease-out will-change-transform", // GSAP will handle the transform, we keep transition for smooth cleanup
      "cursor-pointer"
    )}
    style={{ backgroundColor: bg }}
    onMouseMove={onMouseMove}
    onMouseLeave={onMouseLeave}
  >
    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(55%_55%_at_30%_15%,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0)_60%)]" />

    <h3 className="relative z-10 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight text-black">
      {title}
    </h3>
    <p className="relative z-10 mt-5 max-w-[44ch] font-body text-lg leading-[1.6] text-black/60">
      {body}
    </p>

    <div className="pointer-events-none absolute inset-0">{children}</div>
  </div>
);

/* ----------------------------- Page Section ----------------------------- */

const AdvancedFeatures = () => {
  const mainContainerRef = useRef(null);
  const windowRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP Tilt Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (-10 to 10 degrees)
    const xPct = x / rect.width;
    const yPct = y / rect.height;
    
    const rotateX = (0.5 - yPct) * 10; 
    const rotateY = (xPct - 0.5) * 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.02,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
      transformOrigin: "center center"
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. THE SHRINK & EXTEND ANIMATION (Circle Reveal)
      // The window starts clipped and expands to full view as user scrolls in
      gsap.fromTo(windowRef.current, 
        {
          clipPath: "circle(0% at 50% 50%)",
          scale: 0.8,
          opacity: 0.5
        },
        {
          clipPath: "circle(150% at 50% 50%)",
          scale: 1,
          opacity: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: mainContainerRef.current,
            start: "top 75%", // When top of container hits 75% of viewport
            end: "center center", // When center of container hits center of viewport
            scrub: 1, // Smoothly links animation to scrollbar position (Two-direction)
          }
        }
      );

      // 2. Text Entrance Animation
      gsap.from(".headline-text", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: "top 80%",
        }
      });

      // 3. Cards Staggered Entrance
      // These cards slide up and appear after the window has expanded
      gsap.from(cardRefs.current, {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: "top 85%", 
        }
      });

    }, mainContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={mainContainerRef} className="relative bg-black py-20 text-white lg:py-[120px] overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_50%_15%,rgba(255,255,255,0.10)_0%,rgba(0,0,0,0)_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(90%_95%_at_50%_60%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.9)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-[1160px] px-6">
        <div className="mb-12 text-center lg:mb-[60px]">
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-none -tracking-[0.01em]">
            <span className="headline-text italic">Go further,</span> <span className="headline-text">faster.</span>
          </h2>
        </div>

        {/* Window Container - Target for Shrink/Extend */}
        <div className="mt-10 lg:mt-14 relative z-10">
          <div 
            ref={windowRef}
            className="overflow-hidden rounded-xl border border-white/10 shadow-[0_22px_60px_rgba(0,0,0,0.65)] origin-center"
          >
            <WindowTabBar />

            <div className="relative bg-black">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_35%_35%,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0)_70%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:52px_52px]" />

              <div className="relative px-8 py-10 md:px-10 md:py-12">
                <div className="max-w-[24ch] font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.05] text-white">
                  Connect your
                  <br />
                  design system
                  <br />
                  to the tools
                  <br />
                  you love
                </div>

                <div className="mt-10">
                  <IntegrationsStrip />
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none mx-auto mt-6 h-10 max-w-[980px] rounded-[999px] bg-[radial-gradient(50%_60%_at_50%_50%,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0)_70%)]" />
        </div>

        {/* Feature cards */}
        <div ref={cardsContainerRef} className="mt-10 grid grid-cols-1 gap-5 lg:mt-14 lg:grid-cols-2 lg:gap-7">
          <FeatureCard
            innerRef={(el: HTMLDivElement | null) => { if(el) cardRefs.current[0] = el }}
            bg="#C0B6FC"
            title="Explore API"
            body="Bring design system knowledge to the tools and workflows your team already uses. Build custom plugins, train a custom LLM, or push your docs anywhere with our content API."
            onMouseMove={(e) => handleMouseMove(e, 0)}
            onMouseLeave={() => handleMouseLeave(0)}
          >
            <div className="absolute bottom-0 left-0 h-[140px] w-[56%] bg-[#9974F0]" />
            <div className="absolute bottom-[140px] left-[36px] h-[300px] w-[300px] rounded-full bg-[#9974F0]" />
            <div className="absolute bottom-[140px] right-[-28px] h-[420px] w-[420px] rounded-br-full bg-[#6A00CA]" />
            <div className="absolute bottom-[-170px] left-[58%] h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-[#6A00CA]" />
          </FeatureCard>

          <FeatureCard
            innerRef={(el: HTMLDivElement | null) => { if(el) cardRefs.current[1] = el }}
            bg="#F7A2B1"
            title="zeroheight AI"
            body="A secure AI assistant that knows about design systems to help you write great docs in a fraction of the time. Why walk when you can run?"
            onMouseMove={(e) => handleMouseMove(e, 1)}
            onMouseLeave={() => handleMouseLeave(1)}
          >
            <div className="absolute bottom-[140px] left-[-28px] h-[420px] w-[420px] rounded-bl-full bg-[#EE3252]" />
            <div className="absolute bottom-[-180px] left-[120px] h-[340px] w-[340px] rounded-full bg-[#EE3252]" />
            <div className="absolute bottom-[160px] right-[44px] h-[320px] w-[320px] rounded-full bg-[#63002E]" />
            <div className="absolute bottom-0 right-0 h-[140px] w-[56%] bg-[#63002E]" />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
};

export default AdvancedFeatures;