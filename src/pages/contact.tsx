// src/pages/contact.tsx
import type { NextPage } from "next";
import type { PageHeaderConfig } from "@/types/page";
import { useState, useRef, useEffect, type FormEvent } from "react";

type WithHeader = NextPage & { pageHeader?: PageHeaderConfig };

const Contact: WithHeader = () => {
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    setSending(true);
    setMsg(null);

    const data = Object.fromEntries(new FormData(form) as any);

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    const t = setTimeout(() => ac.abort(), 20000);

    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: ac.signal,
      });

      let ok = r.ok;
      try {
        const j = await r.clone().json();
        ok = ok && (j.ok === true || j.status === "ok");
      } catch {
        const txt = await r.text();
        ok = ok && /^ok/i.test(txt);
      }

      if (ok) {
        setMsg("Sent. Thanks—we’ll reply soon.");
        form.reset();
      } else {
        setMsg(`Error ${r.status}`);
      }
    } catch (err: any) {
      setMsg(err?.name === "AbortError" ? "Network timeout" : (err?.message || "Network error"));
    } finally {
      clearTimeout(t);
      setSending(false);
    }
  }

  useEffect(() => () => abortRef.current?.abort(), []);

  return (
    <div>
      {/* Form only. Header and bullets come from PageHeader via _app.tsx */}
      <form onSubmit={onSubmit} className="mx-auto max-w-md p-6 space-y-4 text-[#e8e5e2]">
        <input
          name="name"
          required
          placeholder="Your name"
          className="w-full border border-[#e8e5e2]/30 bg-[#333333] placeholder-[#e8e5e2]/70 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#0e7dc2]"
          disabled={sending}
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Your email"
          className="w-full border border-[#e8e5e2]/30 bg-[#333333] placeholder-[#e8e5e2]/70 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#0e7dc2]"
          disabled={sending}
        />

        {/* Optional topic selector to align with header bullets */}
        <select
          name="topic"
          className="w-full border border-[#e8e5e2]/30 bg-[#333333] text-[#e8e5e2] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#0e7dc2]"
          defaultValue=""
          disabled={sending}
        >
          <option value="" disabled>
            What’s this about?
          </option>
          <option value="Printing quote">Printing quote</option>
          <option value="Graphic design brief">Graphic design brief</option>
          <option value="Signage survey or install">Signage survey or install</option>
          <option value="Corporate stationery reorder">Corporate stationery reorder</option>
          <option value="Medical supply reorder">Medical supply reorder</option>
          <option value="General question">General question</option>
        </select>

        <textarea
          name="message"
          required
          placeholder="Message"
          className="w-full border border-[#e8e5e2]/30 bg-[#333333] placeholder-[#e8e5e2]/70 p-3 rounded min-h-[140px] focus:outline-none focus:ring-2 focus:ring-[#0e7dc2]"
          disabled={sending}
        />
        {/* Honeypot */}
        <input name="company" className="hidden" tabIndex={-1} autoComplete="off" />

        <button
          type="submit"
          disabled={sending}
          className="w-full inline-flex items-center justify-center gap-2 rounded px-4 py-3 text-[#e8e5e2] bg-[#0e7dc2] shadow active:translate-y-px transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? (
            <>
              <span className="h-4 w-4 border-2 border-[#e8e5e2]/70 border-t-transparent rounded-full animate-spin" />
              Sending…
            </>
          ) : (
            "Send"
          )}
        </button>

        {msg && <p className={/Sent/.test(msg) ? "text-[#268600] font-bold" : "text-red-500"}>{msg}</p>}
      </form>
    </div>
  );
};

Contact.pageHeader = {
  title: "Get in touch",
  items: [
    "Printing quotes",
    "Graphic design briefs",
    "Signage surveys & installs",
    "Corporate stationery reorders",
    "Medical supply reorders",
    "General questions",
  ],
  description: "Contact Print Impact in Perth.",
  canonical: "/contact",
  emitStructuredData: true,
};

export default Contact;
