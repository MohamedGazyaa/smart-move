"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Animation from "@/components/common/animation";

export default function ServicesSection() {
  const t = useTranslations("Services");

  const services = [
    {
      title: t("items.freight.title"),
      description: t("items.freight.description"),
      image: "/images/homePage/freightService.jpg",
    },
    {
      title: t("items.logistics.title"),
      description: t("items.logistics.description"),
      image: "/images/homePage/logisticsService.jpg",
    },
    {
      title: t("items.support.title"),
      description: t("items.support.description"),
      image: "/images/homePage/supportService.jpg",
    },
  ];

  return (
    <section className="relative w-full bg-brand-gradient overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28">
      {/* Animated content wrapper */}
      <Animation className="relative z-10 w-full flex flex-col items-center text-center">
        {/* Main Title with connected white underline */}
        <div className="inline-flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide leading-tight flex items-center justify-center gap-2 sm:gap-3 px-1">
            <span className="text-white">{t("our")}</span>
            <span className="text-orange">{t("services")}</span>
          </h2>
          <span className="h-0.5 sm:h-1 w-full bg-white rounded-full mt-1.5 sm:mt-2" />
        </div>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-xs sm:text-base md:text-lg text-white/90 font-normal max-w-xl text-center px-4">
          {t("subtitle")}
        </p>

        {/* Services Grid */}
        <div className="mt-10 sm:mt-12 md:mt-16 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {services.map((service) => (
              <div
                key={service.title}
                className="flex flex-col items-center text-center group"
              >
                {/* Service Image Card */}
                <div className="relative w-full aspect-4/3 sm:aspect-16/11 overflow-hidden rounded-4xl shadow-xl transition-transform duration-300 group-hover:scale-[1.02]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  />
                </div>

                {/* Service Title */}
                <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl md:text-2xl font-bold text-orange tracking-wide">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="mt-2 text-xs sm:text-sm text-white/90 font-normal max-w-xs leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Animation>
    </section>
  );
}
