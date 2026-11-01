"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Animation from "@/components/common/animation";
import { Link } from "@/i18n/navigation";

export default function ShippingExperts() {
  const t = useTranslations("ShippingExperts");

  return (
    <section className="relative w-full bg-brand-gradient overflow-hidden py-16 sm:py-20 md:py-24">
      <Animation className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
          {/* Left — text content */}
          <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase leading-tight">
              <span className="text-white">{t("trusted")} </span>
              <span className="text-orange">{t("global")}</span>
              <br />
              <span className="text-white">{t("shippingExperts")}</span>
            </h2>

            <p className="mt-6 text-white/80 text-sm sm:text-base leading-relaxed max-w-sm">
              {t("description")}
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-navy px-8 py-3 text-white font-semibold text-base hover:bg-navy-medium transition-colors duration-200"
            >
              {t("cta")}
            </Link>
          </div>

          {/* Right — image card */}
          <div className="flex-1 relative rounded-4xl overflow-hidden shadow-2xl aspect-4/3 w-full">
            <Image
              src="/images/servicesPage/freightForwardingService.jpg"
              alt={t("imageAlt")}
              fill
              className="object-cover object-center scale-125"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Bottom pill label */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[85%] bg-navy-medium/80 backdrop-blur-sm rounded-full px-6 py-3 text-center">
              <p className="text-white text-xs sm:text-sm italic font-medium whitespace-nowrap">
                {t("imageLabel")}
              </p>
            </div>
          </div>
        </div>
      </Animation>
    </section>
  );
}
