import Image from "next/image";
import { useTranslations } from "next-intl";
import Animation from "@/components/common/animation";
import ContactForm from "@/components/contact/contactForm";
import Location from "@/components/contact/location";

export default function ContactPage() {
  const t = useTranslations("Contact");

  return (
    <>
      <section className="relative min-h-screen w-full bg-brand-gradient overflow-hidden flex items-center pt-28 sm:pt-32 pb-16">
        <div className="w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left panel: title, subtitle, courier image */}
            <Animation className="lg:col-span-7 flex flex-col items-center lg:items-start">
              <div className="px-4 text-center lg:text-left flex flex-col items-center lg:items-start">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight leading-none">
                  {t("title")}
                </h1>
                <p className="mt-3 text-xs sm:text-sm text-white/80 max-w-md leading-relaxed font-normal">
                  {t("subtitle")}
                </p>
              </div>

              {/* Courier image: balanced 7:5 proportions with max-w-lg to avoid over-stretching */}
              <div className="mt-5 relative w-full max-w-lg aspect-16/10 rounded-5xl sm:rounded-5xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/contactPage/courier.jpg"
                  alt={t("imageAlt")}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 512px"
                  className="object-cover object-center"
                />
              </div>
            </Animation>

            {/* Right panel: contact form */}
            <Animation
              delay={0.15}
              className="lg:col-span-5 flex justify-start lg:justify-end"
            >
              <div className="w-full max-w-md mt-4 sm:mt-16">
                <ContactForm />
              </div>
            </Animation>
          </div>
        </div>
      </section>

      <Location />
    </>
  );
}
