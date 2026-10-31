"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Animation from "@/components/common/animation";

export default function HeroSection() {
  const t = useTranslations("Hero");

  const cards = [
    {
      title: t("cards.airFreight.title"),
      description: t("cards.airFreight.description"),
    },
    {
      title: t("cards.seaFreight.title"),
      description: t("cards.seaFreight.description"),
    },
    {
      title: t("cards.warehousing.title"),
      description: t("cards.warehousing.description"),
    },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-navy">
      {/* Background image - stationary */}
      <Image
        src="/images/homePage/heroBackground.jpg"
        alt="Smart Move Shipping Hero Background"
        fill
        priority
        className="object-cover object-center pointer-events-none select-none"
        sizes="100vw"
        quality={90}
      />

      {/* Subtle overlay to ensure high contrast & crisp text readability - stationary */}
      <div
        className="absolute inset-0 bg-navy/25 pointer-events-none"
        aria-hidden="true"
      />

      {/* Animated content wrapper */}
      <Animation className="relative z-10 flex-1 flex flex-col justify-between w-full">
        {/* Hero Central Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12 max-w-6xl mx-auto my-auto w-full">
          <div className="flex flex-col items-center">
            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase leading-none">
              <span className="flex items-baseline justify-center gap-2 sm:gap-3 md:gap-4 whitespace-nowrap">
                <span className="text-white">{t("reliable")}</span>
                <span className="text-orange">{t("shipping")}</span>
              </span>
              <span className="block whitespace-nowrap text-white">
                {t("deliveredGlobally")}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-normal max-w-2xl px-2">
              {t("subtitle")}
            </p>

            {/* CTA Button */}
            <div className="mt-6 sm:mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-navy-medium hover:bg-navy-light text-white text-base sm:text-lg font-semibold px-8 sm:px-10 py-3 sm:py-3.5 shadow-lg shadow-black/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
              >
                {t("getQuote")}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Feature Cards - side by side on all screen sizes */}
        <div className="w-full max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-16">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 items-center">
            {cards.map((card) => (
              <div
                key={card.title}
                className="rounded-3xl sm:rounded-4xl bg-white/30 backdrop-blur-md border border-white/40 shadow-lg px-2 sm:px-4 md:px-6 py-3 sm:py-5 md:py-6 lg:py-7 flex flex-col items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3 transition-transform duration-300 hover:-translate-y-1"
              >
                {/* White badge with orange category label */}
                <div className="w-full max-w-xs bg-white text-center py-1.5 sm:py-2 md:py-2.5 px-1.5 sm:px-3 md:px-4 rounded-full shadow-xs flex items-center justify-center">
                  <span className="text-orange font-bold text-xs sm:text-sm md:text-base tracking-tight sm:tracking-wide">
                    {card.title}
                  </span>
                </div>

                {/* Translucent pill badge with description */}
                <div className="w-full max-w-xs border border-white/60 bg-white/10 text-center py-1 sm:py-1.5 px-1.5 sm:px-3 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-medium tracking-normal block truncate">
                    {card.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Animation>
    </section>
  );
}
