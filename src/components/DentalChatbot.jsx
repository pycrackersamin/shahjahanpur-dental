import { useEffect, useRef, useState } from "react";
import { sendChatMessage } from "../lib/chatbotApi";
import BrandMark from "./BrandMark";

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  content: "Hello! I’m the Shahjahanpur Dental assistant. Tell me what is bothering you, and I can share general information and help you decide what to do next.",
};

function DentalChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    if (window.innerWidth >= 768) inputRef.current?.focus();
  }, [isOpen, messages, isLoading]);

  const submitMessage = async (event) => {
    event?.preventDefault();
    const content = input.trim();
    if (!content || isLoading) return;

    const userMessage = { id: `user-${Date.now()}`, role: "user", content };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const reply = await sendChatMessage(nextMessages);
      setMessages((current) => [...current, { id: `assistant-${Date.now()}`, role: "assistant", content: reply }]);
    } catch (error) {
      setMessages((current) => [...current, { id: `error-${Date.now()}`, role: "assistant", content: error.message, isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const bookAppointment = () => {
    setIsOpen(false);
    window.setTimeout(() => document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const clearConversation = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-[70] sm:bottom-6 sm:right-6">
      {isOpen ? (
        <section className="flex h-[min(650px,calc(100dvh-2rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white shadow-2xl shadow-slate-950/20 sm:h-[620px] sm:w-[390px]" aria-label="Dental assistant chat">
          <header className="flex items-center gap-3 bg-gradient-to-r from-clinic-700 to-clinic-500 px-4 py-4 text-white">
            <BrandMark className="size-10 bg-white/15 shadow-none" />
            <div className="min-w-0 flex-1">
              <h2 className="truncate font-bold">Dental Assistant</h2>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-blue-100"><span className="size-2 rounded-full bg-emerald-300" />General guidance, not a diagnosis</p>
            </div>
            <button type="button" onClick={clearConversation} className="grid size-9 place-items-center rounded-full text-blue-100 transition hover:bg-white/10 hover:text-white" aria-label="Clear conversation" title="Clear conversation">
              <svg viewBox="0 0 24 24" className="size-4.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4h8v2m-9 0 1 15h8l1-15" /></svg>
            </button>
            <button type="button" onClick={() => setIsOpen(false)} className="grid size-9 place-items-center rounded-full text-blue-100 transition hover:bg-white/10 hover:text-white" aria-label="Close dental assistant">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 6 12 12M18 6 6 18" /></svg>
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto bg-slate-50 px-4 py-5" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[86%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${message.role === "user" ? "rounded-br-md bg-clinic-600 text-white" : message.isError ? "rounded-bl-md border border-red-100 bg-red-50 text-red-700" : "rounded-bl-md border border-slate-100 bg-white text-slate-700"}`}>
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-slate-100 bg-white px-4 py-4 shadow-sm" aria-label="Dental assistant is thinking">
                  {[0, 1, 2].map((dot) => <span key={dot} className="size-2 animate-pulse rounded-full bg-clinic-400" style={{ animationDelay: `${dot * 160}ms` }} />)}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 bg-white p-3.5">
            <button type="button" onClick={bookAppointment} className="mb-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 text-sm font-bold text-clinic-700 transition hover:bg-blue-100">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2v4m12-4v4M3 9h18M5 4h14a2 2 0 0 1 2 2v15H3V6a2 2 0 0 1 2-2Z" /></svg>
              Book an Appointment
            </button>
            <form onSubmit={submitMessage} className="flex items-end gap-2">
              <label className="sr-only" htmlFor="dental-chat-input">Describe your dental concern</label>
              <textarea id="dental-chat-input" ref={inputRef} value={input} onChange={(event) => setInput(event.target.value.slice(0, 600))} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); submitMessage(); } }} rows="1" maxLength="600" placeholder="Describe your dental concern…" className="max-h-28 min-h-12 flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-clinic-500 focus:bg-white focus:ring-3 focus:ring-blue-100" />
              <button type="submit" disabled={!input.trim() || isLoading} className="grid size-12 shrink-0 place-items-center rounded-xl bg-clinic-600 text-white transition hover:bg-clinic-700 disabled:cursor-not-allowed disabled:bg-slate-300" aria-label="Send message">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" /></svg>
              </button>
            </form>
            <p className="mt-2 text-center text-[10px] leading-4 text-slate-400">For general information only. This assistant does not diagnose or prescribe medicine.</p>
          </div>
        </section>
      ) : (
        <button type="button" onClick={() => setIsOpen(true)} className="group flex min-h-14 items-center gap-3 rounded-full bg-clinic-600 px-4 py-3 text-white shadow-xl shadow-blue-900/25 transition hover:-translate-y-1 hover:bg-clinic-700" aria-label="Open dental assistant">
          <span className="grid size-9 place-items-center rounded-full bg-white/15"><svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" /><path d="M8 9h8M8 13h5" /></svg></span>
          <span className="pr-1 text-sm font-bold">Ask Dental Assistant</span>
        </button>
      )}
    </div>
  );
}

export default DentalChatbot;
