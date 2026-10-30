"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  CloseButton,
} from "@headlessui/react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

interface NavItem {
  label: string;
  href: string;
}

export default function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.industries"), href: "/industries" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const isItemActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleNavClick = () => setSidebarOpen(false);

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent"
      >
        <div className="flex h-24 w-full items-center justify-between px-6 sm:px-10 lg:px-16">
          {/* ── Mobile: burger (left) ── */}
          <button
            type="button"
            aria-label={t("openMenuAriaLabel")}
            aria-expanded={sidebarOpen}
            aria-controls="mobile-sidebar"
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2 text-white transition-colors hover:bg-white/10 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white lg:hidden cursor-pointer"
          >
            <span
              className="material-icons text-2xl leading-none"
              aria-hidden="true"
            >
              menu
            </span>
          </button>

          {/* ── Logo ── */}
          {/* Mobile: centered absolutely; Desktop: normal flow left */}
          <Link
            href="/"
            aria-label={t("logoAriaLabel")}
            className="absolute left-1/2 -translate-x-1/2 inline-flex items-center rounded-sm transition-opacity hover:opacity-90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy lg:static lg:translate-x-0"
          >
            <Image
              src="/images/logo.svg"
              alt={t("logoAlt")}
              width={160}
              height={120}
              priority
              className="h-14 w-auto sm:h-16 lg:h-20"
            />
          </Link>

          {/* ── Desktop navigation ── */}
          <nav aria-label={t("navAriaLabel")} className="hidden lg:block">
            <ul role="list" className="flex items-center gap-3">
              {navItems.map((item) => {
                const active = isItemActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-semibold text-white transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy ${
                        active
                          ? "bg-grey border border-transparent"
                          : "border border-white bg-transparent hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ── Mobile: spacer to balance the burger ── */}
          <div aria-hidden="true" className="w-10 lg:hidden" />
        </div>
      </header>

      {/* ── Mobile sidebar ── */}
      <Dialog
        id="mobile-sidebar"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        className="relative z-50 lg:hidden"
      >
        {/* Backdrop */}
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/75 backdrop-blur-sm duration-300 ease-in-out data-closed:opacity-0"
        />

        {/* Sidebar panel */}
        <div className="fixed inset-y-0 left-0 flex">
          <DialogPanel
            transition
            className="relative flex w-72 flex-col bg-navy duration-300 ease-in-out data-closed:-translate-x-full"
          >
            {/* Sidebar header: logo + close button */}
            <div className="flex items-center justify-between px-5 pt-6 pb-5">
              <Link
                href="/"
                aria-label={t("logoAriaLabel")}
                onClick={handleNavClick}
                className="inline-flex items-center rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
              >
                <Image
                  src="/images/logo.svg"
                  alt={t("logoAlt")}
                  width={120}
                  height={90}
                  className="h-12 w-auto"
                />
              </Link>

              {/* Close button */}
              <CloseButton
                aria-label={t("closeMenuAriaLabel")}
                className="inline-flex items-center justify-center rounded-md p-2 text-white transition-colors hover:bg-white/10 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
              >
                <span
                  className="material-icons text-xl leading-none"
                  aria-hidden="true"
                >
                  close
                </span>
              </CloseButton>
            </div>

            {/* Separator */}
            <hr aria-hidden="true" className="border-white/15 mx-5" />

            {/* Sidebar nav */}
            <nav
              aria-label={t("navAriaLabel")}
              className="flex-1 overflow-y-auto px-4 py-6"
            >
              <ul role="list" className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const active = isItemActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={handleNavClick}
                        className={`flex w-full items-center rounded-full px-5 py-2.5 text-sm font-bold text-white transition-colors duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white ${
                          active
                            ? "bg-grey"
                            : "border border-white/30 bg-transparent hover:bg-white/10"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
