"use client";

import { useTranslations } from "next-intl";
import Animation from "@/components/common/animation";

function HubDetails({ className = "" }: { className?: string }) {
  const t = useTranslations("Contact.hub");

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <div className="flex flex-col items-center lg:items-start">
        <h3 className="text-white font-bold text-base sm:text-lg">
          {t("addressLabel")}
        </h3>
        <p className="text-white/80 text-sm sm:text-base mt-1 max-w-sm">
          {t("addressValue")}
        </p>
      </div>

      <div className="flex flex-col items-center lg:items-start">
        <h3 className="text-white font-bold text-base sm:text-lg">
          {t("hoursLabel")}
        </h3>
        <p className="text-white/80 text-sm sm:text-base mt-1">
          {t("hoursValue")}
        </p>
      </div>
    </div>
  );
}

export default function Location() {
  const t = useTranslations("Contact.hub");

  const address = t("addressValue");
  const encodedAddress = encodeURIComponent(address);
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="relative w-full bg-brand-gradient overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Header Info */}
          <Animation className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight leading-none">
              {t("title")}
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-white/80 max-w-md leading-relaxed font-normal">
              {t("subtitle")}
            </p>

            {/* Desktop: Address & Hours placed inside left column */}
            <HubDetails className="hidden lg:flex mt-8 sm:mt-12 text-left" />
          </Animation>

          {/* Map + Mobile Address & Hours */}
          <Animation
            delay={0.15}
            className="lg:col-span-7 w-full flex flex-col items-center"
          >
            <div className="relative w-full aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 rounded-5xl overflow-hidden shadow-2xl bg-white/5">
              <iframe
                title={t("mapAriaLabel")}
                src={mapEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Mobile: Address & Hours placed below the Google Map */}
            <HubDetails className="flex lg:hidden mt-8 text-center items-center" />
          </Animation>
        </div>
      </div>
    </section>
  );
}
