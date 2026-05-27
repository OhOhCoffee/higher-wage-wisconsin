"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { sendJoinEmail } from "@/app/actions/sendJoinEmail";

const inputClass =
  "w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white";
const labelClass =
  "block text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-1";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="self-start bg-primary text-white text-sm font-semibold px-8 py-3 rounded hover:opacity-85 transition-opacity disabled:opacity-50"
    >
      {pending ? "Sending…" : "Submit"}
    </button>
  );
}

export default function JoinForm() {
  const [state, formAction] = useActionState(sendJoinEmail, {});

  if (state.success) {
    return (
      <div className="py-8 text-center">
        <p className="text-lg font-semibold">Thanks! We&apos;ll be in touch.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
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
          className={inputClass}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-neutral-600 cursor-pointer">
        <input
          name="newsletter"
          type="checkbox"
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
          className={clsx(inputClass, "resize-none")}
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  );
}
