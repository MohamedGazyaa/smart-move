import Image from "next/image";
import { useTranslations } from "next-intl";
import Animation from "@/components/common/animation";

export default function OurWork() {
  const t = useTranslations("OurWork");

  return (
    <section className="relative w-full bg-brand-gradient overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28">
      <Animation className="relative z-10 w-full flex flex-col items-center text-center">
        {/* Title */}
        <div className="inline-flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-none px-4">
            <span className="text-white">{t("titleOur")} </span>
            <span className="text-orange">{t("titleWork")}</span>
          </h2>
          <span className="h-0.5 sm:h-1 w-full bg-white rounded-full mt-1.5 sm:mt-2" />
        </div>

        {/* Subtitle */}
        <p className="mt-3 sm:mt-4 text-white/80 text-sm sm:text-base md:text-lg font-normal max-w-xl px-4">
          {t("subtitle")}
        </p>

        {/* Images row */}
        <div className="mt-10 sm:mt-12 md:mt-16 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 items-stretch">
          {/* Left — wider landscape image */}
          <div className="w-full sm:w-2/3 relative aspect-video sm:aspect-auto sm:min-h-64 md:min-h-80 lg:min-h-96 rounded-3xl sm:rounded-4xl md:rounded-5xl overflow-hidden flex-shrink-0">
            <Image
              src="/images/industriesPage/work1.jpg"
              alt={t("image1Alt")}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, 66vw"
            />
          </div>

          {/* Right — narrower image */}
          <div className="w-full sm:flex-1 relative aspect-4/3 sm:aspect-auto rounded-3xl sm:rounded-4xl md:rounded-5xl overflow-hidden">
            <Image
              src="/images/industriesPage/work2.jpg"
              alt={t("image2Alt")}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, 34vw"
            />
          </div>
        </div>
      </Animation>
    </section>
  );
}
