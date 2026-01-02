'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, cubicBezier } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function randomBlobRadius() {
  const a = () => Math.floor(30 + Math.random() * 40);
  return `${a()}% ${a()}% ${a()}% ${a()}% / ${a()}% ${a()}% ${a()}% ${a()}%`;
}

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement | null>(null);

  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const titleWords = useMemo(
    () => 'Bring clarity to your design system'.split(' '),
    []
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      orbRefs.current.forEach((orb, i) => {
        if (!orb) return;

        gsap.to(orb, {
          borderRadius: () => randomBlobRadius(),
          duration: 8 + i * 1.25,
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
          ease: 'sine.inOut',
        });

        gsap.to(orb, {
          y: `+=${18 + i * 6}`,
          x: i % 2 === 0 ? '+=14' : '-=14',
          duration: 7 + i,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      if (gridRef.current) {
        gsap.to(gridRef.current, {
          x: -40,
          y: -25,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.to(card, {
          y: i % 2 === 0 ? '+=14' : '-=14',
          rotate: i % 2 === 0 ? 0.8 : -0.8,
          duration: 5.5 + i * 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      if (imageWrapRef.current) {
        gsap.fromTo(
          imageWrapRef.current,
          { opacity: 0, y: 80, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.3,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: imageWrapRef.current,
              start: 'top 85%',
            },
          }
        );

        gsap.to(imageWrapRef.current, {
          y: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=700',
            scrub: 0.6,
          },
        });
      }

      if (glowRef.current) {
        gsap.fromTo(
          glowRef.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 0.55,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: glowRef.current,
              start: 'top 90%',
            },
          }
        );
      }

      const wrap = imageWrapRef.current;

      const tiltX = wrap
        ? gsap.quickTo(wrap, 'rotateX', { duration: 0.8, ease: 'power3' })
        : null;
      const tiltY = wrap
        ? gsap.quickTo(wrap, 'rotateY', { duration: 0.8, ease: 'power3' })
        : null;

      const cardQuick = cardRefs.current.map((el) => {
        if (!el) return null;
        return {
          x: gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' }),
          y: gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' }),
        };
      });

      const ctaQuick = ctaRefs.current.map((el) => {
        if (!el) return null;
        return {
          x: gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' }),
          y: gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' }),
        };
      });

      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const nx = e.clientX / innerWidth - 0.5; // -0.5..0.5
        const ny = e.clientY / innerHeight - 0.5;

        if (tiltX && tiltY) {
          tiltX(ny * -10);
          tiltY(nx * 10);
        }

        cardQuick.forEach((q, i) => {
          if (!q) return;
          q.x(nx * (10 + i * 3));
          q.y(ny * (10 + i * 3));
        });

        ctaRefs.current.forEach((cta, i) => {
          if (!cta) return;
          const rect = cta.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const d = Math.hypot(e.clientX - cx, e.clientY - cy);

          const q = ctaQuick[i];
          if (!q) return;

          if (d < 120) {
            q.x((e.clientX - cx) * 0.22);
            q.y((e.clientY - cy) * 0.22);
          } else {
            q.x(0);
            q.y(0);
          }
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.18 } },
  };

  const wordVars = {
    hidden: { y: 90, rotate: 2 },
    show: { y: 0, rotate: 0, transition: { duration: 0.9, ease: cubicBezier(0.22, 1, 0.36, 1) } },
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-surface-light pt-24 pb-20 md:pt-32 md:pb-24"
      style={{ perspective: 1200 }}
    >
      <div
        ref={gridRef}
        className="pointer-events-none absolute -inset-24 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage:
            'radial-gradient(circle at 50% 30%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0) 70%)',
          WebkitMaskImage:
            'radial-gradient(circle at 50% 30%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0) 70%)',
        }}
      />

      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            orbRefs.current[i] = el;
          }}
          className={`pointer-events-none absolute blur-3xl opacity-45 mix-blend-multiply
            ${i === 0 ? '-top-24 -left-44 h-[560px] w-[560px] bg-primary/25' : ''}
            ${i === 1 ? 'top-10 -right-44 h-[520px] w-[520px] bg-purple-400/20' : ''}
            ${i === 2 ? '-bottom-28 left-1/3 h-[720px] w-[720px] bg-pink-400/15' : ''}
          `}
          style={{ borderRadius: randomBlobRadius() }}
        />
      ))}

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          variants={containerVars}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            className="inline-flex items-center gap-2 rounded-full border border-border-light bg-white/70 px-4 py-2 text-xs font-semibold tracking-wide text-text-faded backdrop-blur"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-primary" />
            Design system platform • Documentation • Governance • Adoption
          </motion.div>

          <h1 className="mt-6 font-display text-[clamp(2.4rem,6.6vw,4.8rem)] font-extrabold leading-[0.95] tracking-tight text-text-primary">
            {titleWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pr-3">
                <motion.span variants={wordVars} className="inline-block origin-bottom-left">
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 max-w-[720px] text-lg leading-relaxed text-text-faded md:text-xl"
          >
            Document, deliver, measure, and manage your design system in one place—so teams ship consistent UI
            without slowing down.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            className="mt-7 flex flex-wrap items-center justify-center gap-2"
          >
            {['Sync tokens', 'Embed components', 'Track adoption', 'Publish docs'].map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-text-primary ring-1 ring-black/5 backdrop-blur"
              >
                {t}
              </span>
            ))}
          </motion.div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-5">
            {[
              { label: 'Start for free', kind: 'primary' },
              { label: 'Request a demo', kind: 'secondary' },
            ].map((cta, i) => (
              <Link
                key={cta.label}
                href="#"
                ref={(el) => {
                  ctaRefs.current[i] = el;
                }}
                className={`inline-flex h-14 items-center justify-center rounded-full px-9 text-sm font-bold uppercase tracking-wide transition-transform active:scale-[0.98]
                  ${
                    cta.kind === 'primary'
                      ? 'bg-primary text-white shadow-xl shadow-primary/25'
                      : 'bg-white/80 text-black ring-1 ring-black/10 backdrop-blur'
                  }
                `}
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </motion.div>

        <div className="relative mx-auto mt-16 max-w-[1100px] md:mt-20">
          <div
            ref={glowRef}
            className="pointer-events-none absolute -inset-10 rounded-full bg-primary/15 blur-[110px] opacity-0"
          />

        
        </div>
      </div>
    </section>
  );
};

export default Hero;
