"use client";

import { useState } from "react";
import clsx from "clsx";

export default function JoinForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    newsletter: false,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const target = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up to a form backend (e.g. Resend, Formspree, or a Next.js API route)
    console.log("Form submitted:", form);
    setSubmitted(true);
  }

  const inputClass =
    "w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 bg-white";
  const labelClass = "block text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-1";

  if (submitted) {
    return (
      <div className="py-8 text-center">
        <p className="text-lg font-semibold">Thanks! We&apos;ll be in touch.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="firstName">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={form.firstName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="lastName">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            value={form.lastName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="email">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-neutral-600 cursor-pointer">
        <input
          name="newsletter"
          type="checkbox"
          checked={form.newsletter}
          onChange={handleChange}
          className="w-4 h-4 accent-neutral-800"
        />
        Sign up for news and updates
      </label>

      <div>
        <label className={labelClass} htmlFor="message">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className={clsx(inputClass, "resize-none")}
        />
      </div>

      <button
        type="submit"
        className="self-start bg-neutral-900 text-white text-sm font-semibold px-8 py-3 rounded hover:bg-neutral-700 transition-colors"
      >
        Submit
      </button>
    </form>
  );
}
