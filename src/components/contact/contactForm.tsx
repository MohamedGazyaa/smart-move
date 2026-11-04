"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const t = useTranslations("Contact.form");

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [serverError, setServerError] = useState<string>("");

  const validateForm = (values: FormState): FieldErrors => {
    const errs: FieldErrors = {};
    if (!values.email.trim()) {
      errs.email = t("errors.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errs.email = t("errors.emailInvalid");
    }
    if (!values.message.trim()) {
      errs.message = t("errors.messageRequired");
    }
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim() || undefined,
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data?.error || t("errors.genericError"));
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setServerError(t("errors.networkError"));
      setStatus("error");
    }
  };

  const inputBase =
    "w-full rounded-full border border-white/40 bg-transparent px-6 py-3.5 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-hidden focus:ring-1 focus:ring-white/40 transition-colors";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 w-full"
    >
      {/* Full Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-orange font-semibold text-sm">
          {t("fullName")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder={t("fullNamePlaceholder")}
          autoComplete="name"
          className={inputBase}
        />
      </div>

      {/* Email Address */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-orange font-semibold text-sm">
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder={t("emailPlaceholder")}
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`${inputBase} ${
            errors.email ? "border-red-400 focus:border-red-400" : ""
          }`}
        />
        {errors.email && (
          <p id="email-error" className="text-red-400 text-xs px-2">
            {errors.email}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-orange font-semibold text-sm">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder={t("messagePlaceholder")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`w-full rounded-3xl border border-white/40 bg-transparent px-6 py-4 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-hidden focus:ring-1 focus:ring-white/40 transition-colors resize-none ${
            errors.message ? "border-red-400 focus:border-red-400" : ""
          }`}
        />
        {errors.message && (
          <p id="message-error" className="text-red-400 text-xs px-2">
            {errors.message}
          </p>
        )}
      </div>

      {/* Feedback Messages */}
      {status === "error" && serverError && (
        <p className="text-red-400 text-sm">{serverError}</p>
      )}
      {status === "success" && (
        <p className="text-green-400 text-sm font-semibold">
          {t("successMessage")}
        </p>
      )}

      {/* Send Message Button - Centered on mobile, left-aligned on sm+ */}
      <div className="pt-2 flex justify-center sm:justify-start">
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-fit rounded-full bg-navy-medium hover:bg-navy-light disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-base px-10 py-3.5 shadow-md hover:shadow-lg transition-colors duration-200 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
        >
          {status === "loading" ? t("sending") : t("sendMessage")}
        </button>
      </div>
    </form>
  );
}
