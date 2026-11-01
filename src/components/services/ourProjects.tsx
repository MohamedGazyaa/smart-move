"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Animation from "@/components/common/animation";

export default function OurProjects() {
  const t = useTranslations("OurProjects");

  const projects = [
    {
      title: t("items.industrialFreight.title"),
      description: t("items.industrialFreight.description"),
      images: [
        {
          src: "/images/servicesPage/industrialFreight1.png",
          alt: t("items.industrialFreight.image1Alt"),
        },
        {
          src: "/images/servicesPage/industrialFreight2.jpg",
          alt: t("items.industrialFreight.image2Alt"),
        },
      ],
    },
    {
      title: t("items.perishableGoods.title"),
      description: t("items.perishableGoods.description"),
      images: [
        {
          src: "/images/servicesPage/perishableGoods1.jpg",
          alt: t("items.perishableGoods.image1Alt"),
        },
        {
          src: "/images/servicesPage/perishableGoods2.jpg",
          alt: t("items.perishableGoods.image2Alt"),
        },
      ],
    },
  ];

  return (
    <section className="relative w-full bg-brand-gradient overflow-hidden py-16 sm:py-20 md:py-24">
      <Animation className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header — centered */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase leading-tight">
            <span className="text-white">{t("our")} </span>
            <span className="text-orange">{t("projects")}</span>
          </h2>
          <p className="mt-3 text-white/80 text-sm sm:text-base">
            {t("subtitle")}
          </p>
        </div>

        {/* Project rows */}
        <div className="flex flex-col gap-10 sm:gap-14">
          {projects.map((project) => (
            <div key={project.title}>
              {/* Images grid — on mobile stacked with text injected between */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Image 1 */}
                <div className="relative aspect-[4/3] rounded-4xl overflow-hidden">
                  <Image
                    src={project.images[0].src}
                    alt={project.images[0].alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Text — mobile only, centered between the two images */}
                <div className="md:hidden flex flex-col items-center text-center justify-center py-2">
                  <h3 className="text-orange font-bold text-lg">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-white/80 text-sm leading-relaxed max-w-sm">
                    {project.description}
                  </p>
                </div>

                {/* Image 2 */}
                <div className="relative aspect-[4/3] rounded-4xl overflow-hidden">
                  <Image
                    src={project.images[1].src}
                    alt={project.images[1].alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Text — desktop only, below images left aligned */}
              <div className="hidden md:block mt-5">
                <h3 className="text-orange font-bold text-xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-white/80 text-sm leading-relaxed max-w-md">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Animation>
    </section>
  );
}

