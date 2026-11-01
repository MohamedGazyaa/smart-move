"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Animation from "@/components/common/animation";

export default function OurServices() {
  const t = useTranslations("OurServices");

  const services = [
    {
      title: t("items.customerSolutions.title"),
      description: t("items.customerSolutions.description"),
      image: "/images/servicesPage/customerSolutionsService.jpg",
    },
    {
      title: t("items.freightForwarding.title"),
      description: t("items.freightForwarding.description"),
      image: "/images/servicesPage/freightForwardingService.jpg",
    },
  ];

  return (
    <section className="relative w-full bg-brand-gradient overflow-hidden pt-36 sm:pt-40 pb-16 sm:pb-20 md:pb-24">
      <Animation className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header — left aligned */}
        <div className="mb-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-white">{t("our")} </span>
            <span className="text-orange">{t("services")}</span>
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-white/80 text-sm sm:text-base font-normal mb-10 sm:mb-14">
          {t("subtitle")}
        </p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-4xl overflow-hidden shadow-xl flex flex-col"
            >
              {/* Text area at top */}
              <div className="px-6 pt-6 pb-4">
                <h3 className="text-orange font-bold text-lg sm:text-xl mb-1">
                  {service.title}
                </h3>
                <p className="text-navy-medium text-sm leading-snug max-w-xs">
                  {service.description}
                </p>
              </div>

              {/* Image — top corners rounded, bottom corners clipped by card */}
              <div className="relative w-full flex-1 min-h-56 sm:min-h-64 md:min-h-72 overflow-hidden rounded-t-5xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          ))}
        </div>
      </Animation>
    </section>
  );
}
