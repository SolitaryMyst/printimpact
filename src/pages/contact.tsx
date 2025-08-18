import { useState, FormEvent, useRef, useEffect } from "react";

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setMsg(null);

    const data = Object.fromEntries(new FormData(e.currentTarget) as any);

    // 20s timeout guard
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

      // accept JSON or text
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
        e.currentTarget.reset();
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

  // cancel in-flight if component unmounts
  useEffect(() => () => abortRef.current?.abort(), []);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center gap-6 my-8">
        <h1 className="text-3xl font-bold text-[#e8e5e2]">
          Get in touch
        </h1>
        <span className="mx-6">  </span>
        <span className="flex flex-wrap items-center gap-x-9 gap-y-3 text-xl text-[#e8e5e2] list-disc list-inside  mt-[0.5rem] p-0">
          Email for a qoute, or ask a question.
        </span>


      </div>
      <div className="h-px w-full bg-[#e8e5e2] my-4" />

      <form onSubmit={onSubmit} className="mx-auto max-w-md p-6 space-y-4 text-[#e8e5e2]">
        <input name="name" required placeholder="Your name" className="w-full border p-2 rounded" disabled={sending} />
        <input name="email" type="email" required placeholder="Your email" className="w-full border p-2 rounded" disabled={sending} />
        <textarea name="message" required placeholder="Message" className="w-full border p-2 rounded min-h-[120px]" disabled={sending} />
        <input name="company" className="hidden" tabIndex={-1} autoComplete="off" />
        <button
          type="submit"
          disabled={sending}
          className="w-full inline-flex items-center justify-center gap-2 rounded px-4 py-2 text-[#e8e5e2] bg-[#0e7dc2] shadow active:translate-y-px transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? (<><span className="h-4 w-4 border-2 border-[#e8e5e2]/70 border-t-transparent rounded-full animate-spin" />Sending…</>) : "Send"}
        </button>
        {msg && <p className={/Sent/.test(msg) ? "text-[#e8e5e2]" : "text-red-700"}>{msg}</p>}
      </form>
    </div>
  );
}
