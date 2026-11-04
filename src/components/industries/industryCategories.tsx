import Image from "next/image";
import { useTranslations } from "next-intl";
import Animation from "@/components/common/animation";

export default function IndustryCategories() {
  const t = useTranslations("IndustryCategories");

  const items = [
    {
      image: "/images/industriesPage/automotive.jpg",
      altKey: "image1Alt" as const,
      labelKey: "label1" as const,
      descKey: "desc1" as const,
    },
    {
      image: "/images/industriesPage/pharmaceuticals.jpg",
      altKey: "image2Alt" as const,
      labelKey: "label2" as const,
      descKey: "desc2" as const,
    },
    {
      image: "/images/industriesPage/manufacturing.jpg",
      altKey: "image3Alt" as const,
      labelKey: "label3" as const,
      descKey: "desc3" as const,
    },
    {
      image: "/images/industriesPage/agriculture.png",
      altKey: "image4Alt" as const,
      labelKey: "label4" as const,
      descKey: "desc4" as const,
    },
  ];

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

        {/* Cards */}
        <div className="mt-10 sm:mt-12 md:mt-16 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 md:gap-8">
          {items.map((item) => (
            <div key={item.labelKey} className="flex flex-col gap-4">
              {/* Image */}
              <div className="relative w-full aspect-video rounded-3xl sm:rounded-4xl overflow-hidden">
                <Image
                  src={item.image}
                  alt={t(item.altKey)}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>

              {/* Label + description — left-aligned */}
              <div className="text-left px-1">
                <h3 className="text-orange font-bold text-base sm:text-lg md:text-xl">
                  {t(item.labelKey)}
                </h3>
                <p className="mt-1 text-white/80 text-sm sm:text-base leading-relaxed">
                  {t(item.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Animation>
    </section>
  );
}

