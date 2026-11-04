"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Animation from "@/components/common/animation";

export default function ShippingPartners() {
  const t = useTranslations("ShippingPartners");

  return (
    <section className="relative w-full bg-brand-gradient overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28">
      {/*
        Mobile order:  Title → Commitment → Image → Reach
        Desktop order: Title → [Commitment | Reach] → Image
        Achieved by making all four blocks direct flex-wrap children
        and swapping order with Tailwind `order-*` utilities.
      */}
      <Animation className="relative z-10 w-full flex flex-wrap justify-center items-start text-center">
        {/* 1. Title — full width always */}
        <h1 className="order-1 w-full text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase leading-none px-4 pt-0">
          <span className="text-white">{t("titleTrusted")} </span>
          <span className="text-orange">{t("titlePartners")} </span>
          <span className="text-white">{t("titleWorldwide")}</span>
        </h1>

        {/* 2. Our Commitment — mobile: below title | desktop: left half */}
        <div className="order-2 w-full sm:w-1/2 mt-8 sm:mt-10 md:mt-12 px-6 sm:px-8 md:px-12">
          <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-2 sm:mb-3">
            {t("commitmentTitle")}
          </h3>
          <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
            {t("commitmentText")}
          </p>
        </div>

        {/* 3. Image — mobile: after commitment | desktop: below both columns */}
        <div className="order-3 sm:order-4 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-16 md:mt-20">
          <Image
            src="/images/industriesPage/shippingPartners.jpg"
            alt={t("imageAlt")}
            width={1200}
            height={800}
            className="w-full h-auto rounded-3xl sm:rounded-4xl md:rounded-5xl"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </div>

        {/* 4. Industry Reach — mobile: after image | desktop: right half */}
        <div className="order-4 sm:order-3 w-full sm:w-1/2 mt-8 sm:mt-10 md:mt-12 px-6 sm:px-8 md:px-12">
          <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-2 sm:mb-3">
            {t("reachTitle")}
          </h3>
          <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
            {t("reachText")}
          </p>
        </div>
      </Animation>
    </section>
  );
}
