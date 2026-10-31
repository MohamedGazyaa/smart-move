"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Animation from "@/components/common/animation";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function Counter({ value, suffix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function CommittedShippingSection() {
  const t = useTranslations("CommittedShipping");

  return (
    <section className="relative w-full bg-brand-gradient overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-28">
      {/* Animated content wrapper */}
      <Animation className="relative z-10 w-full flex flex-col items-center text-center">
        {/* Main Title */}
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase leading-none px-4">
          <span className="block text-white">{t("titleCommitted")}</span>
          <span className="flex items-baseline justify-center gap-2 sm:gap-3 md:gap-4 whitespace-nowrap">
            <span className="text-orange">{t("titleSeamless")}</span>
            <span className="text-white">{t("titleShipping")}</span>
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-xs sm:text-base md:text-lg text-white/90 font-normal max-w-2xl px-4">
          {t("subtitle")}
        </p>

        {/* Stat Pill Counters */}
        <div className="mt-8 sm:mt-10 md:mt-12 flex flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 w-full max-w-xl mx-auto px-4">
          {/* 150+ On time */}
          <div className="flex-1 bg-white rounded-full py-3.5 sm:py-5 px-4 sm:px-8 text-center shadow-lg flex flex-col items-center justify-center">
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange tracking-tight leading-tight">
              <Counter value={150} suffix="+" />
            </span>
            <span className="text-xs sm:text-sm font-medium text-grey mt-0.5 sm:mt-1">
              {t("stats.onTime.label")}
            </span>
          </div>

          {/* 15 Trusted Globally */}
          <div className="flex-1 bg-white rounded-full py-3.5 sm:py-5 px-4 sm:px-8 text-center shadow-lg flex flex-col items-center justify-center">
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange tracking-tight leading-tight">
              <Counter value={15} />
            </span>
            <span className="text-xs sm:text-sm font-medium text-grey mt-0.5 sm:mt-1">
              {t("stats.trustedGlobally.label")}
            </span>
          </div>
        </div>

        {/* Moving Truck Image Container */}
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 md:mt-20">
          <div className="relative w-full aspect-16/10 sm:aspect-video md:aspect-21/9 overflow-hidden rounded-4xl md:rounded-5xl shadow-lg">
            <Image
              src="/images/homePage/movingTruck.jpg"
              alt={t("imageAlt")}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </div>
      </Animation>
    </section>
  );
}
