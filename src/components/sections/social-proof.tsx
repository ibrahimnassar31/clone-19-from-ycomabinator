'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Logo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const decathlonLogo: Logo = {
  src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9bc559cc-8a12-4ede-baa6-824d6ddebe75-zeroheight-com/assets/svgs/decathlon-logo-27.svg',
  alt: 'Decathlon logo',
  width: 124,
  height: 20,
};

const rightLogos: Logo[] = [
  {
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9bc559cc-8a12-4ede-baa6-824d6ddebe75-zeroheight-com/assets/svgs/uber-black-28.svg',
    alt: 'Uber logo',
    width: 79,
    height: 27,
  },
  {
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9bc559cc-8a12-4ede-baa6-824d6ddebe75-zeroheight-com/assets/svgs/united-logo-29.svg',
    alt: 'United Airlines logo',
    width: 84,
    height: 19,
  },
];

function usePrefersReducedMotion(): boolean {
  // Avoid importing framer-motion here; keep this component standalone.
  const reducedRef = useRef(false);
  const [, force] = React.useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => {
      reducedRef.current = !!mq.matches;
      force((n) => n + 1);
    };
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  return reducedRef.current;
}

export default function SocialProof() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const sectionRef = useRef<HTMLElement | null>(null);

  // Desktop refs
  const revealRefs = useRef<(HTMLDivElement | HTMLParagraphElement | null)[]>([]);
  const logoCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mobile marquee refs
  const marqueeViewportRef = useRef<HTMLDivElement | null>(null);
  const marqueeTrackRef = useRef<HTMLDivElement | null>(null);

  const marqueeItems = useMemo(() => {
    // Build a compact row: Decathlon + statement + right logos
    return [
      { kind: 'logo' as const, logo: decathlonLogo },
      { kind: 'text' as const },
      ...rightLogos.map((l) => ({ kind: 'logo' as const, logo: l })),
    ];
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Scroll reveal (desktop)
      const targets = revealRefs.current.filter(Boolean);
      if (targets.length) {
        gsap.fromTo(
          targets,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
            },
          }
        );
      }

      // Hover: logo cards lift + sheen sweep
      logoCardRefs.current.forEach((card) => {
        if (!card) return;

        const sheen = card.querySelector('[data-sheen]') as HTMLSpanElement | null;

        const onEnter = () => {
          gsap.to(card, { y: -3, scale: 1.03, duration: 0.22, ease: 'power3.out' });
          if (sheen) {
            gsap.killTweensOf(sheen);
            gsap.fromTo(
              sheen,
              { x: '-120%', opacity: 0 },
              { x: '120%', opacity: 1, duration: 0.55, ease: 'power2.out' }
            );
          }
        };

        const onLeave = () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.26, ease: 'power3.out' });
        };

        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);

        return () => {
          card.removeEventListener('mouseenter', onEnter);
          card.removeEventListener('mouseleave', onLeave);
        };
      });

      // Mobile marquee
      const viewport = marqueeViewportRef.current;
      const track = marqueeTrackRef.current;

      if (viewport && track) {
        // Only run marquee on small screens
        const isMobile = window.matchMedia('(max-width: 1023px)').matches;
        if (isMobile) {
          // Duplicate content for seamless loop (track already renders twice)
          const firstHalf = track.querySelector('[data-half="1"]') as HTMLDivElement | null;
          if (firstHalf) {
            const width = firstHalf.getBoundingClientRect().width;
            if (width > 0) {
              gsap.set(track, { x: 0 });
              gsap.to(track, {
                x: -width,
                duration: 18,
                ease: 'none',
                repeat: -1,
              });
            }
          }
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="bg-surface-light border-y border-border-medium"
      aria-label="Social proof"
    >
      <div className="container mx-auto">
        {/* Desktop View (lg and up) */}
        <div className="hidden lg:flex items-center justify-between py-7">
          <div className="flex items-center gap-x-16">
            {/* Decathlon */}
            <div
              ref={(el) => {
                revealRefs.current[0] = el;
              }}
              className="flex-shrink-0"
            >
              <LogoCard
                logo={decathlonLogo}
                refCb={(el) => {
                  // store for hover
                  logoCardRefs.current[0] = el;
                }}
              />
            </div>

            {/* Statement */}
            <p
              ref={(el) => {
                revealRefs.current[1] = el;
              }}
              className="text-text-secondary text-base font-body leading-relaxed max-w-[340px]"
            >
              Delivered design system to 17 products, across 19 countries in{' '}
              <b className="font-medium text-text-primary">4 months</b>
            </p>
          </div>

          {/* Right logos */}
          <div className="flex items-center gap-x-10">
            {rightLogos.map((logo, i) => (
              <div
                key={logo.alt}
                ref={(el) => {
                  revealRefs.current[2 + i] = el;
                }}
                className="flex-shrink-0"
              >
                <LogoCard
                  logo={logo}
                  refCb={(el) => {
                    // store for hover
                    logoCardRefs.current[1 + i] = el;
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View (below lg) */}
        <div className="lg:hidden w-full">
          {prefersReducedMotion ? (
            // Fallback: simple scroll row
            <div role="presentation" className="w-full overflow-x-auto">
              <div className="flex items-center gap-x-10 py-4 text-sm">
                <div className="flex-shrink-0">
                  <Image src={decathlonLogo.src} alt={decathlonLogo.alt} width={decathlonLogo.width} height={decathlonLogo.height} />
                </div>

                <p className="flex-shrink-0 text-text-secondary font-body leading-relaxed whitespace-nowrap">
                  Delivered design system to 17 products, across 19 countries in{' '}
                  <b className="font-medium text-text-primary">4 months</b>
                </p>

                {rightLogos.map((logo) => (
                  <div key={logo.alt} className="flex-shrink-0">
                    <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Marquee: seamless loop
            <div
              ref={marqueeViewportRef}
              className="relative overflow-hidden py-4"
              aria-label="Customer logos marquee"
            >
              {/* subtle fade edges */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[rgba(0,0,0,0.04)] to-transparent" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[rgba(0,0,0,0.04)] to-transparent" />

              <div
                ref={marqueeTrackRef}
                className="flex w-max items-center gap-x-10 will-change-transform"
              >
                {/* Half 1 */}
                <div data-half="1" className="flex items-center gap-x-10">
                  {marqueeItems.map((it, idx) =>
                    it.kind === 'text' ? (
                      <p
                        key={`t-${idx}`}
                        className="flex-shrink-0 text-text-secondary font-body leading-relaxed whitespace-nowrap text-sm"
                      >
                        Delivered design system to 17 products, across 19 countries in{' '}
                        <b className="font-medium text-text-primary">4 months</b>
                      </p>
                    ) : (
                      <div key={`l-${it.logo.alt}-${idx}`} className="flex-shrink-0">
                        <Image src={it.logo.src} alt={it.logo.alt} width={it.logo.width} height={it.logo.height} />
                      </div>
                    )
                  )}
                </div>

                {/* Half 2 (duplicate for loop) */}
                <div className="flex items-center gap-x-10" aria-hidden="true">
                  {marqueeItems.map((it, idx) =>
                    it.kind === 'text' ? (
                      <p
                        key={`t2-${idx}`}
                        className="flex-shrink-0 text-text-secondary font-body leading-relaxed whitespace-nowrap text-sm"
                      >
                        Delivered design system to 17 products, across 19 countries in{' '}
                        <b className="font-medium text-text-primary">4 months</b>
                      </p>
                    ) : (
                      <div key={`l2-${it.logo.alt}-${idx}`} className="flex-shrink-0">
                        <Image src={it.logo.src} alt={it.logo.alt} width={it.logo.width} height={it.logo.height} />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Logo card: subtle premium hover surface + GSAP-driven lift & sheen.
 * Kept small to avoid changing layout.
 */
function LogoCard({
  logo,
  refCb,
}: {
  logo: Logo;
  refCb?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={refCb}
      className="group relative inline-flex items-center justify-center rounded-xl border border-black/10 bg-white/60 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm transform-gpu"
    >
      {/* sheen layer (animated by GSAP) */}
      <span
        data-sheen
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[120%] opacity-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
      />
      <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} />
    </div>
  );
}
