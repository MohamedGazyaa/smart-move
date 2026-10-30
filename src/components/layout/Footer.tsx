"use client";

import { useState, useId } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  CloseButton,
} from "@headlessui/react";
import { useTranslations } from "next-intl";

/* ─── Social icon SVGs (inline, brand-neutral) ─── */
function IconFacebook({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconTikTok({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

function IconX({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.918l4.243 5.61 5.833-5.61Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

/* ─── Shield with Checkmark Icon for ISO Certification ─── */
function IconShieldCheck({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 1.5l8.5 3v6.2c0 5.1-3.5 9.3-8.5 11.3C7 20 3.5 15.8 3.5 10.7V4.5l8.5-3zm-1.2 13.7l6-6-1.4-1.4-4.6 4.6-2.2-2.2-1.4 1.4 3.6 3.6z" />
    </svg>
  );
}

/* ─── Newsletter subscribe form ─── */
function SubscribeForm() {
  const t = useTranslations("Footer.newsletter");
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setMessage(t("invalidEmailMessage"));
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage(t("successMessage"));
        setEmail("");
      } else {
        setStatus("error");
        setMessage(t("errorMessage"));
      }
    } catch {
      setStatus("error");
      setMessage(t("errorMessage"));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label={t("heading")}
      className="w-full"
    >
      <div className="flex items-center gap-3">
        <label htmlFor={emailId} className="sr-only">
          {t("emailAriaLabel")}
        </label>
        <input
          id={emailId}
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder={t("emailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "success"}
          aria-describedby={message ? `${emailId}-status` : undefined}
          className="min-w-0 flex-1 rounded-full bg-white px-5 py-3 text-sm text-navy placeholder:text-grey focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-light disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="shrink-0 rounded-full bg-navy-medium px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-navy-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:opacity-60"
        >
          {status === "loading" ? "…" : t("submitButton")}
        </button>
      </div>

      {/* Status message */}
      {message && (
        <p
          id={`${emailId}-status`}
          role={status === "error" ? "alert" : "status"}
          aria-live="polite"
          className={`mt-3 text-sm ${
            status === "success" ? "text-yellow" : "text-white/70"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}

/* ─── Footer ─── */
export default function Footer() {
  const t = useTranslations("Footer");
  const [isCertOpen, setIsCertOpen] = useState(false);

  const socials = [
    { key: "facebook", href: "https://facebook.com", Icon: IconFacebook },
    { key: "instagram", href: "https://instagram.com", Icon: IconInstagram },
    { key: "tiktok", href: "https://tiktok.com", Icon: IconTikTok },
    { key: "x", href: "https://x.com", Icon: IconX },
  ] as const;

  return (
    <>
      <footer aria-label="Site footer" className="w-full bg-brand-gradient">
        {/* ── Main content ── */}
        <div className="w-full px-6 pb-8 pt-12 sm:px-10 lg:px-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            {/* Brand column */}
            <address className="not-italic lg:max-w-xs">
              <p className="text-2xl font-bold text-white font-proxima">
                {t("brand.name")}
              </p>
              <p className="mt-2 text-sm text-white/70">{t("brand.tagline")}</p>
              <a
                href={`mailto:${t("brand.email")}`}
                aria-label={t("brand.emailAriaLabel")}
                className="mt-5 inline-block text-sm text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {t("brand.email")}
              </a>

              {/* ISO Certification Button */}
              <button
                type="button"
                onClick={() => setIsCertOpen(true)}
                aria-label={t("cert.buttonAriaLabel")}
                className="mt-6 flex w-fit max-w-full items-center gap-3.5 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-left transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
              >
                <IconShieldCheck className="h-8 w-8 shrink-0 text-yellow" />
                <span className="flex flex-col gap-0.5">
                  <strong className="text-sm font-bold text-white font-proxima">
                    {t("cert.title")}
                  </strong>
                  <span className="text-xs text-white/70">
                    {t("cert.subtitle")}
                  </span>
                </span>
              </button>
            </address>

            {/* Newsletter column */}
            <section
              aria-labelledby="newsletter-heading"
              className="lg:max-w-md w-full"
            >
              <h2
                id="newsletter-heading"
                className="text-base font-semibold text-white font-proxima"
              >
                {t("newsletter.heading")}
              </h2>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                {t("newsletter.description")}
              </p>
              <div className="mt-5">
                <SubscribeForm />
              </div>
            </section>
          </div>

          {/* ── Bottom bar ── */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 sm:flex-row">
            <p className="text-sm text-white/60 order-2 sm:order-1">
              {t("legal.copyright")}
            </p>

            {/* Social links */}
            <nav
              aria-label={t("social.ariaLabel")}
              className="order-1 sm:order-2"
            >
              <ul role="list" className="flex items-center gap-5">
                {socials.map(({ key, href, Icon }) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t(`social.${key}` as Parameters<typeof t>[0])}
                      className="inline-flex text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </footer>

      {/* ── ISO Certificate Modal ── */}
      <Dialog
        open={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        className="relative z-50"
      >
        {/* Backdrop: naturally black */}
        <DialogBackdrop
          transition
          onClick={() => setIsCertOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ease-out data-closed:opacity-0"
        />

        {/* Modal Dialog Panel wrapper */}
        <div
          onClick={() => setIsCertOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto cursor-pointer"
        >
          <DialogPanel
            transition
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-full max-w-full flex-col items-end cursor-default transition-all duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
          >
            {/* Close button positioned above the image */}
            <CloseButton
              aria-label={t("cert.closeAriaLabel")}
              className="mb-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
            >
              <span
                className="material-icons text-xl leading-none"
                aria-hidden="true"
              >
                close
              </span>
            </CloseButton>

            {/* Certificate Image */}
            <Image
              src="/images/footer/ISO_Certificate.jpeg"
              alt={t("cert.imageAlt")}
              width={900}
              height={1200}
              priority
              className="h-auto w-auto max-w-full max-h-[70vh] sm:max-h-[80vh] rounded-xl object-contain shadow-2xl"
            />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
