'use client';

import Image from "next/image";
import { FC, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface LogoProps {
  name: string;
  src: string;
  width: number;
  height: number;
  link?: string;
  label?: string;
}

const logos: LogoProps[] = [
  {
    name: "Adobe",
    src: "https://zeroheight-wordpress-uploads.s3.amazonaws.com/wp-content/uploads/2025/06/abobe-logo.svg",
    width: 83,
    height: 22,
    link: "https://blog.adobe.com/en/publish/2020/02/27/zeroheight-plugin-adobe-xd",
    label: "Learn more",
  },
  {
    name: "The Guardian",
    src: "https://zeroheight-wordpress-uploads.s3.amazonaws.com/wp-content/uploads/2025/06/the-guardian-logo.svg",
    width: 89,
    height: 29,
    link: "https://www.ameliamarriott.com/work/theguardian",
    label: "Learn more",
  },
  {
    name: "Uber",
    src: "https://zeroheight-wordpress-uploads.s3.amazonaws.com/wp-content/uploads/2025/06/uber-black.svg",
    width: 71,
    height: 24,
    link: "https://base.uber.com/6d2425e9f/p/294ab4-base-design-system",
    label: "Design System",
  },
  {
    name: "United",
    src: "https://zeroheight-wordpress-uploads.s3.amazonaws.com/wp-content/uploads/2025/06/united-logo.svg",
    width: 169,
    height: 42,
  },
  {
    name: "Ulta Beauty",
    src: "https://zeroheight-wordpress-uploads.s3.amazonaws.com/wp-content/uploads/2025/06/ultra-beauty-logo.svg",
    width: 75,
    height: 31,
  },
  {
    name: "Salesforce",
    src: "https://zeroheight-wordpress-uploads.s3.amazonaws.com/wp-content/uploads/2025/06/salesforce_logo.svg.svg",
    width: 64,
    height: 45,
    link: "https://www.lightningdesignsystem.com/2e1ef8501/p/85bd85-lightning-design-system-2",
    label: "Design System",
  },
];

const QuarterCircle: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="89"
    height="auto"
    viewBox="0 0 89 176"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="quarter-circle-top" style={{ transform: "none", transformOrigin: "50% 50%", transformBox: "fill-box" }}>
      <path
        d="M88.5002 2.273C88.5002 1.31986 87.7273 0.545416 86.7744 0.564205C75.8665 0.779279 65.0895 3.03171 55.0005 7.21068C44.3799 11.6099 34.7297 18.058 26.6009 26.1867C18.4722 34.3154 12.0242 43.9656 7.62492 54.5863C3.44594 64.6752 1.19351 75.4522 0.978438 86.3602C0.959648 87.3131 1.7341 88.0859 2.68724 88.0859L86.7744 88.0859C87.7275 88.0859 88.5002 87.3133 88.5002 86.3601L88.5002 2.273Z"
        fill="#EFEADD"
      />
    </g>
    <g id="quarter-circle-bottom" style={{ transform: "none", transformOrigin: "50% 50%", transformBox: "fill-box" }}>
      <circle cx="44.7308" cy="131.817" r="43.7306" transform="rotate(90 44.7308 131.817)" fill="#EFEADD" />
    </g>
  </svg>
);

const CircleSquare: FC = () => (
  <svg
    id="circle-square"
    className="hidden sm:block transform-gpu overflow-visible"
    width="89"
    height="auto"
    viewBox="0 0 89 177"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="circle-square-square" style={{ transform: "none", transformOrigin: "50% 50%", transformBox: "fill-box" }}>
      <rect width="87.9995" height="87.9216" rx="1.73643" transform="matrix(1 0 0 -1 0.5 176.469)" fill="#EFEADD" />
    </g>
    <g id="circle-square-circle" style={{ transform: "none", transformOrigin: "50% 50%", transformBox: "fill-box" }}>
      <circle cx="43.9998" cy="43.9998" r="43.9998" transform="matrix(1 0 0 -1 0.5 88.5469)" fill="#EFEADD" />
    </g>
  </svg>
);

const Triangle: FC = () => (
  <svg
    id="triangle"
    className="hidden lg:block transform-gpu overflow-visible"
    width="176"
    height="auto"
    viewBox="0 0 176 174"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: "none" }}
  >
    <path
      d="M2.88641 173.547H173.039C174.143 173.547 175.039 172.651 175.039 171.547V2.35602C175.039 0.57695 172.89 -0.31662 171.628 0.937805L1.47621 170.129C0.21077 171.387 1.10187 173.547 2.88641 173.547Z"
      fill="#EFEADD"
    />
  </svg>
);

const TriangleSquare: FC = () => (
  <svg
    id="triangle-square"
    className="hidden lg:block"
    width="89"
    height="auto"
    viewBox="0 0 89 176"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="triangle-square-bottom" style={{ transform: "none", transformOrigin: "50% 50%", transformBox: "fill-box" }}>
      <rect width="88" height="90" rx="1.73643" transform="matrix(1 0 0 -1 0.191895 175.047)" fill="#EFEADD" />
    </g>
    <path
      id="triangle-square-top"
      d="M5.02032 1.04688H86.1919C87.2965 1.04688 88.1919 1.9423 88.1919 3.04687V84.2184C88.1919 86.0003 86.0376 86.8926 84.7777 85.6327L3.60611 4.46109C2.34618 3.20116 3.23852 1.04688 5.02032 1.04688Z"
      fill="#EFEADD"
      style={{ transform: "none", transformOrigin: "50% 50%", transformBox: "fill-box" }}
    />
  </svg>
);

const SquareTriangle: FC = () => (
  <svg
    id="square-triangle"
    className="hidden lg:block"
    width="89"
    height="auto"
    viewBox="0 0 89 176"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="square-triangle-top" style={{ transform: "none", transformOrigin: "50% 50%", transformBox: "fill-box" }}>
      <rect x="0.808105" y="0.046875" width="88" height="90" rx="1.73643" fill="#EFEADD" />
    </g>
    <path
      id="square-triangle-bottom"
      d="M5.63654 174.047H86.8081C87.9127 174.047 88.8081 173.151 88.8081 172.047V90.8753C88.8081 89.0935 86.6538 88.2012 85.3939 89.4611L4.22232 170.633C2.96239 171.893 3.85473 174.047 5.63654 174.047Z"
      fill="#EFEADD"
      style={{ transform: "none", transformOrigin: "50% 50%", transformBox: "fill-box" }}
    />
  </svg>
);

const LogoItem: FC<LogoProps> = ({ name, src, width, height, link, label }) => {
  const Content = link ? "a" : "div";
  const props = link
    ? { href: link, target: "_blank", rel: "noopener noreferrer", "aria-label": label }
    : {};
  return (
    <div className="relative flex aspect-[1/1] h-full w-full max-w-44 min-w-44 items-center justify-center px-5.5 py-8 sm:min-w-[unset]">
      <div className="absolute inset-0 items-center justify-center rounded bg-white sm:min-w-[unset]" style={{ transform: "none" }}>
        <Content
          className="group relative flex h-full w-full items-center justify-center"
          {...props}
        >
          <div className="absolute inset-0 flex items-center justify-center rounded bg-white px-6.5 py-8">
            <div className="relative flex w-full justify-center gap-2">
              <Image
                alt={`${name} Logo`}
                loading="lazy"
                width={width}
                height={height}
                decoding="async"
                className="h-auto max-h-10 w-full transition-opacity duration-300 opacity-100"
                style={{ color: "transparent" }}
                src={src}
              />
              {link && (
                <div className="mt-1 duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.0498 0.189453C9.21378 0.189459 9.37135 0.254167 9.4873 0.370117C9.60318 0.486059 9.66797 0.643695 9.66797 0.807617V7.54492C9.66797 7.7088 9.60312 7.86649 9.4873 7.98242C9.37135 8.09837 9.21378 8.16406 9.0498 8.16406C8.88582 8.16406 8.72826 8.09838 8.6123 7.98242C8.49648 7.86649 8.43164 7.70881 8.43164 7.54492V2.2998L1.19434 9.53809C1.07834 9.65399 0.920815 9.71875 0.756836 9.71875C0.592852 9.71874 0.435323 9.654 0.319336 9.53809C0.2034 9.42215 0.138754 9.26454 0.138672 9.10059C0.138672 8.93661 0.203436 8.77908 0.319336 8.66309L7.55664 1.42578H2.31152C2.14764 1.42571 1.99089 1.36003 1.875 1.24414C1.75911 1.12825 1.69342 0.971507 1.69336 0.807617C1.69336 0.643632 1.75905 0.486072 1.875 0.370117C1.99087 0.254369 2.14774 0.189525 2.31152 0.189453H9.0498Z"
                      fill="#808295"
                      stroke="#808295"
                      strokeWidth="0.2"
                    />
                  </svg>
                </div>
              )}
            </div>
            {link && (
              <div className="absolute right-3 bottom-3 left-3 flex justify-center">
                <div className="font-selecta text-16px origin-bottom scale-0 rounded-xs border border-black/6 px-3.5 py-1.5 font-medium tracking-[0.015em] transition-transform duration-700 ease-[linear(0,_0.024_1.8%,_0.101_4%,_0.571_12.9%,_0.767_17.5%,_0.903_22.3%,_0.95_24.9%,_0.984_27.6%,_1.014_32%,_1.024_37.4%,_1.001_62.5%,_1)] group-hover:scale-100">
                  {label}
                </div>
              </div>
            )}
          </div>
        </Content>
      </div>
    </div>
  );
};

const Fortune100 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      }).fromTo(
        ".logos-container",
        { scale: 0.8, opacity: 0.5 },
        { scale: 1, opacity: 1, ease: "power2.inOut" }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-background relative z-10 overflow-hidden py-20 lg:py-40">
      <div className="container relative z-10 mx-auto">
        <h2 className="font-display text-text-primary mx-auto max-w-2xl text-center font-bold leading-none tracking-[-0.01em] text-[clamp(3rem,5vw,3.5rem)] lg:tracking-[-0.02em]">
          Trusted by 20% of <br />
          the Fortune 100
        </h2>
      </div>
      <div className="container relative z-10 mx-auto mt-12 lg:mt-[98px]">
        <div className="hide-scrollbars -mx-5 hidden gap-1.25 overflow-scroll px-5 whitespace-nowrap sm:mx-0 sm:block sm:px-0 md:overflow-visible logos-container">
          <div className="flex flex-none items-end gap-1.25 sm:w-full sm:flex-[unset] sm:justify-center">
            <LogoItem {...logos[0]} />
            <div className="w-[89px]">
              <QuarterCircle className="quarter-circle-1 hidden md:block" />
            </div>
            <LogoItem {...logos[1]} />
            <CircleSquare />
            <div className="w-[89px]">
              <QuarterCircle className="quarter-circle-3 hidden md:block" />
            </div>
            <Triangle />
            <LogoItem {...logos[2]} />
          </div>
          <div className="flex flex-none items-end gap-1.25 sm:mt-1.25 sm:w-full sm:flex-[unset] sm:justify-center">
            <TriangleSquare />
            <LogoItem {...logos[3]} />
            <QuarterCircle className="quarter-circle-2 hidden sm:block" />
            <LogoItem {...logos[4]} />
            <QuarterCircle className="md-large:block quarter-circle-3 hidden" />
            <LogoItem {...logos[5]} />
            <QuarterCircle className="quarter-circle-5 hidden md:block" />
            <SquareTriangle />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fortune100;