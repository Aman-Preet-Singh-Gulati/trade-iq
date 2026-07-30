"use client";

import React, { useState } from 'react';

interface NewsletterFormProps {
  layout?: 'inline' | 'stacked';
  placeholder?: string;
  inputClassName?: string;
  buttonClassName?: string;
  successClassName?: string;
  errorClassName?: string;
  buttonLabel?: string;
  buttonPendingLabel?: string;
}

const DEFAULTS = {
  inline: {
    inputClassName: "w-full bg-surface-container-lowest border border-outline-variant border-r-0 rounded-l p-2 outline-none focus:border-primary-fixed text-on-surface",
    buttonClassName: "bg-primary-fixed text-on-primary-fixed px-4 rounded-r font-label-caps text-[10px] hover:bg-primary-fixed-dim transition-colors disabled:opacity-70",
    buttonLabel: "JOIN",
    buttonPendingLabel: "WAIT",
    placeholder: "Email",
  },
  stacked: {
    inputClassName: "w-full bg-background/10 border border-white/20 text-white p-3.5 rounded-lg focus:outline-none focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed placeholder:text-white/40 transition-all backdrop-blur-sm",
    buttonClassName: "w-full bg-primary-fixed text-on-primary-fixed py-3.5 rounded-lg font-bold hover:bg-white transition-all shadow-md hover:-translate-y-0.5",
    buttonLabel: "Join The List",
    buttonPendingLabel: "Joining...",
    placeholder: "Professional Email",
  },
};

export default function NewsletterForm({
  layout = 'inline',
  placeholder,
  inputClassName,
  buttonClassName,
  successClassName = "text-[#4caf50] font-body-sm mt-2",
  errorClassName = "text-error font-body-sm mt-2",
  buttonLabel,
  buttonPendingLabel,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const defaults = DEFAULTS[layout];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website: "" }), // website is honeypot
      });

      const contentType = res.headers.get("content-type");
      let data: any = {};
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      }

      if (!res.ok) {
        throw new Error(data.error || `Server Error (${res.status}). Please try again.`);
      }

      setIsSuccess(true);
      setEmail("");
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const input = (
    <input
      required
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className={inputClassName ?? defaults.inputClassName}
      placeholder={placeholder ?? defaults.placeholder}
    />
  );

  const button = (
    <button
      type="submit"
      disabled={isSubmitting}
      className={buttonClassName ?? defaults.buttonClassName}
    >
      {isSubmitting ? (buttonPendingLabel ?? defaults.buttonPendingLabel) : (buttonLabel ?? defaults.buttonLabel)}
    </button>
  );

  return (
    <form onSubmit={handleSubscribe} className="flex flex-col">
      {layout === 'inline' ? (
        <div className="flex">
          {input}
          {button}
        </div>
      ) : (
        <div className="space-y-4">
          {input}
          {button}
        </div>
      )}

      {isSuccess && (
        <p className={successClassName}>Successfully subscribed!</p>
      )}

      {errorMessage && (
        <p className={errorClassName}>{errorMessage}</p>
      )}
    </form>
  );
}
