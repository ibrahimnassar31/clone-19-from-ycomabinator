'use client'
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const CtaFinal = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const measurementsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Title animation with split text effect
    const titleLines = titleRef.current?.querySelectorAll('br');
    const titleText = titleRef.current?.textContent || '';
    const lines = titleText.split('\n').filter(line => line.trim());
    
    // Clear and rebuild title with animated spans
    if (titleRef.current) {
      titleRef.current.innerHTML = '';
      lines.forEach((line, lineIndex) => {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'overflow-hidden';
        
        const words = line.split(' ');
        words.forEach((word, wordIndex) => {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'inline-block overflow-hidden';
          
          const chars = word.split('');
          chars.forEach((char, charIndex) => {
            const charSpan = document.createElement('span');
            charSpan.className = 'inline-block will-change-transform';
            charSpan.textContent = char === ' ' ? '\u00A0' : char;
            charSpan.style.opacity = '0';
            charSpan.style.transform = 'translateY(100%) rotateX(90deg)';
            wordSpan.appendChild(charSpan);
          });
          
          // Add space after word (except last)
          if (wordIndex < words.length - 1) {
            const spaceSpan = document.createElement('span');
            spaceSpan.className = 'inline-block';
            spaceSpan.textContent = '\u00A0';
            wordSpan.appendChild(spaceSpan);
          }
          
          lineDiv.appendChild(wordSpan);
        });
        
        titleRef.current?.appendChild(lineDiv);
        if (lineIndex < lines.length - 1) {
          const br = document.createElement('br');
          titleRef.current?.appendChild(br);
        }
      });
    }

    // Animate title characters with stagger
    const charSpans = titleRef.current?.querySelectorAll('span span');
    if (charSpans) {
      gsap.fromTo(charSpans,
        {
          opacity: 0,
          y: 100,
          rotationX: 90,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: {
            amount: 0.5,
            from: 'random',
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );
    }

    // Measurement lines drawing animation
    const measurementLines = measurementsRef.current?.querySelectorAll('.measurement-line');
    if (measurementLines) {
      gsap.fromTo(measurementLines,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Measurement labels animation
      const labels = measurementsRef.current?.querySelectorAll('.measurement-label');
      if (labels) {
        gsap.fromTo(labels,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.5,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }

    // Button entrance animation
    if (buttonRef.current) {
      gsap.fromTo(buttonRef.current,
        {
          scale: 0.8,
          opacity: 0,
          rotationX: 15,
        },
        {
          scale: 1,
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: buttonRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Grid pattern animation
    if (gridRef.current) {
      const gridLines = gridRef.current.querySelectorAll('.grid-dot');
      if (gridLines.length === 0) {
        // Create grid dots if they don't exist
        for (let i = 0; i < 100; i++) {
          const dot = document.createElement('div');
          dot.className = 'grid-dot absolute w-[1px] h-[1px] bg-white/10';
          dot.style.left = `${Math.random() * 100}%`;
          dot.style.top = `${Math.random() * 100}%`;
          gridRef.current.appendChild(dot);
        }
      }

      const dots = gridRef.current.querySelectorAll('.grid-dot');
      gsap.fromTo(dots,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 0.2,
          duration: 1,
          stagger: {
            each: 0.01,
            from: 'random',
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            end: 'top 30%',
            scrub: true,
          },
        }
      );

      // Grid pulse animation
      gsap.to(gridRef.current, {
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Create particles
    if (particlesRef.current) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle absolute rounded-full bg-white/5';
        particle.style.width = `${Math.random() * 4 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particlesRef.current.appendChild(particle);
      }

      const particles = particlesRef.current.querySelectorAll('.particle');
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          x: () => (Math.random() - 0.5) * 100,
          y: () => (Math.random() - 0.5) * 100,
          duration: 3 + Math.random() * 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.1,
        });

        gsap.to(particle, {
          opacity: 0.1,
          duration: 1.5 + Math.random() * 1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        });
      });
    }

    // Button hover effects
    if (buttonRef.current) {
      const buttonText = buttonRef.current.querySelector('span');
      
      buttonRef.current.addEventListener('mouseenter', () => {
        // Scale animation with overshoot
        gsap.to(buttonRef.current, {
          scale: 1.08,
          duration: 0.6,
          ease: 'back.out(1.7)',
        });

        // Background color change
        gsap.to(buttonRef.current, {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          duration: 0.3,
        });

        // Text color animation
        if (buttonText) {
          gsap.to(buttonText, {
            color: '#ffffff',
            duration: 0.3,
          });
        }

        // Border animation
        gsap.to(buttonRef.current, {
          borderColor: 'rgba(255, 255, 255, 0.8)',
          duration: 0.3,
        });

        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'absolute inset-0 rounded-full bg-white/10';
        ripple.style.transform = 'scale(0)';
        if (buttonRef.current) {
          buttonRef.current.appendChild(ripple);
        }

        gsap.to(ripple, {
          scale: 2,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove(),
        });
      });

      buttonRef.current.addEventListener('mouseleave', () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        });

        gsap.to(buttonRef.current, {
          backgroundColor: 'transparent',
          duration: 0.3,
        });

        if (buttonText) {
          gsap.to(buttonText, {
            color: '#ffffff',
            duration: 0.3,
          });
        }

        gsap.to(buttonRef.current, {
          borderColor: 'rgba(255, 255, 255, 0.4)',
          duration: 0.3,
        });
      });

      // Click animation
      buttonRef.current.addEventListener('mousedown', () => {
        gsap.to(buttonRef.current, {
          scale: 0.95,
          duration: 0.1,
        });
      });

      buttonRef.current.addEventListener('mouseup', () => {
        gsap.to(buttonRef.current, {
          scale: 1.08,
          duration: 0.3,
          ease: 'elastic.out(1, 0.5)',
        });

        // Create click particles
        for (let i = 0; i < 10; i++) {
          const particle = document.createElement('div');
          particle.className = 'absolute w-1 h-1 bg-white/80 rounded-full';
          if (buttonRef.current) {
            buttonRef.current.appendChild(particle);
          }

          gsap.fromTo(particle,
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
            },
            {
              x: () => (Math.random() - 0.5) * 100,
              y: () => (Math.random() - 0.5) * 100,
              opacity: 0,
              scale: 0,
              duration: 0.6,
              ease: 'power2.out',
              onComplete: () => particle.remove(),
            }
          );
        }
      });
    }

    // Section parallax effect
    gsap.to('.parallax-layer-1', {
      y: (i) => -30 * (i + 1),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.to('.parallax-layer-2', {
      y: (i) => -15 * (i + 1),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Continuous button subtle pulse
    const pulseAnimation = gsap.to(buttonRef.current, {
      scale: 1.02,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Stop pulse on hover
    buttonRef.current?.addEventListener('mouseenter', () => {
      pulseAnimation.pause();
    });

    buttonRef.current?.addEventListener('mouseleave', () => {
      pulseAnimation.play();
    });

    return () => {
      pulseAnimation.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Gradient layers for parallax */}
        <div className="parallax-layer-1 absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent" />
        <div className="parallax-layer-2 absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-transparent" />
        
        {/* Grid pattern */}
        <div ref={gridRef} className="absolute inset-0" />
        
        {/* Particles */}
        <div ref={particlesRef} className="absolute inset-0" />
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/5 to-cyan-500/5 blur-3xl" />
      </div>

      <div className="container relative z-10 py-32 lg:py-40">
        <div className="flex flex-col items-center text-center">
          {/* Enhanced title with animation-ready structure */}
          <h2 ref={titleRef} className="font-display font-bold text-white text-[clamp(40px,6vw,80px)] leading-[1.1] tracking-[-0.02em] max-w-6xl">
            Unleash the potential
            <br />
            of your design system
          </h2>

          <div className="relative mt-24">
            {/* Enhanced Measurement Decorations */}
            <div ref={measurementsRef}>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 flex flex-col items-center gap-1.5 pointer-events-none">
                <div className="measurement-line w-px h-2 bg-gradient-to-b from-white/80 to-white/30" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 flex flex-col items-center gap-1.5 pointer-events-none">
                <div className="measurement-line w-px h-2 bg-gradient-to-t from-white/80 to-white/30" />
              </div>
              <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 flex items-center gap-1.5 pointer-events-none">
                <div className="measurement-line h-px w-2 bg-gradient-to-l from-white/80 to-white/30" />
              </div>
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 flex items-center gap-1.5 pointer-events-none">
                <div className="measurement-line h-px w-2 bg-gradient-to-r from-white/80 to-white/30" />
              </div>
            </div>

            {/* Enhanced CTA Button with multiple layers */}
            <a
              ref={buttonRef}
              href="#"
              className="group relative flex h-[76px] items-center justify-center bg-transparent px-16 md:px-[180px] border-2 border-white/40 rounded-full overflow-hidden will-change-transform"
            >
              {/* Animated border */}
              <div className="absolute inset-0 border-2 border-transparent rounded-full">
                <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-border-spin" />
              </div>
              
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-pink-600/0 to-blue-600/0 group-hover:from-purple-600/20 group-hover:via-pink-600/20 group-hover:to-blue-600/20 transition-all duration-500" />
              
              {/* Grid pattern layer */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                }}
              />
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/5 blur-xl transition-all duration-500" />
              
              {/* Text with gradient */}
              <span className="relative z-10 font-medium text-white text-[15px] whitespace-nowrap tracking-wider">
                Get started for free
              </span>
              
              {/* Animated arrow icon */}
              <svg
                className="absolute right-6 w-4 h-4 text-white/0 group-hover:text-white/80 transition-all duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Subtle call-to-action hint */}
          <div className="mt-12 opacity-50">
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <span>Scroll to discover more</span>
              <div className="relative w-4 h-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-white/50 rounded-full animate-scroll-hint" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes border-spin {
          0% {
            border-image-source: linear-gradient(0deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1));
          }
          100% {
            border-image-source: linear-gradient(360deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1));
          }
        }

        @keyframes scroll-hint {
          0%, 100% {
            transform: translateY(0) scaleY(1);
            opacity: 0.5;
          }
          50% {
            transform: translateY(8px) scaleY(1.2);
            opacity: 1;
          }
        }

        .animate-border-spin {
          animation: border-spin 2s linear infinite;
          border-image-slice: 1;
        }

        .animate-scroll-hint {
          animation: scroll-hint 2s ease-in-out infinite;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Performance optimizations */
        .will-change-transform {
          will-change: transform;
        }

        /* Custom cursor for button */
        a[href="#"] {
          cursor: pointer;
        }

        /* Remove outline for non-keyboard navigation */
        a[href="#"]:focus:not(:focus-visible) {
          outline: none;
        }

        /* Enhanced focus styles for accessibility */
        a[href="#"]:focus-visible {
          outline: 2px solid rgba(255, 255, 255, 0.8);
          outline-offset: 4px;
        }
      `}</style>
    </section>
  );
};

export default CtaFinal;