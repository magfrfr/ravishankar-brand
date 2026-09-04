"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING =
  "Hi! I'm here to help with any sales or marketing questions. What's on your mind?";

const STARTERS = [
  "How do I enter a new market?",
  "What is the SSS framework?",
  "How do I pick my first distributor?",
];

/** Renders **bold** spans within a line. */
function formatInline(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-navy-950">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

/** Splits model output into paragraphs and list items so answers don't
 * collapse into one wall of text. */
function MessageBody({ content }: { content: string }) {
  const blocks = content.split(/\n+/).filter((b) => b.trim().length > 0);
  return (
    <div className="space-y-2">
      {blocks.map((block, i) => {
        const item = block.match(/^\s*(?:(\d+)[.)]|[-•*])\s+([^]*)/);
        if (item) {
          return (
            <p key={i} className="flex gap-2">
              <span className="shrink-0 text-navy-400">
                {item[1] ? `${item[1]}.` : "–"}
              </span>
              <span>{formatInline(item[2])}</span>
            </p>
          );
        }
        return <p key={i}>{formatInline(block)}</p>;
      })}
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-label="Typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 bg-navy-400 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [teasing, setTeasing] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the keyboard in the conversation: focus the input when the panel
  // opens and again when a reply finishes (disabled inputs drop focus).
  useEffect(() => {
    if (open && !loading) inputRef.current?.focus();
  }, [open, loading]);

  // Teaser: the launcher introduces itself once, then tucks back in.
  // Hover can't be relied on — touch-first devices never fire it.
  useEffect(() => {
    const show = setTimeout(() => setTeasing(true), 1500);
    const hide = setTimeout(() => setTeasing(false), 6000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const fresh = messages.length === 1;

  async function sendMessage(preset?: string) {
    const text = (preset ?? input).trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!res.ok) throw new Error(`Chat request failed: ${res.status}`);
      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantContent = assistantContent + decoder.decode(value, { stream: true });
        const snapshot = assistantContent;
        setMessages((prev) =>
          prev.map((m, idx) =>
            idx === prev.length - 1
              ? { role: "assistant", content: snapshot }
              : m
          )
        );
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I ran into an issue. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Launcher — circle that stretches into a labelled pill on cursor
          hover (JS mouse events: CSS :hover is unreliable on touch-first
          machines) and by itself once after load. */}
      <button
        onClick={() => {
          setTeasing(false);
          setOpen((o) => !o);
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`fixed bottom-6 right-6 z-50 flex items-center h-14 px-[17px] rounded-full bg-navy-950 text-white transition-all duration-300 ${
          hovered || (teasing && !open)
            ? "scale-[1.05] shadow-xl ring-2 ring-amber-brand ring-offset-2"
            : "shadow-lg"
        }`}
        aria-label={open ? "Close chat" : "Ask Ravishankar"}
      >
        {open ? (
          <svg className="w-[22px] h-[22px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-[22px] h-[22px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
        <span
          className={`overflow-hidden whitespace-nowrap font-semibold text-[15px] transition-all duration-300 ${
            hovered || (teasing && !open)
              ? "max-w-[170px] opacity-100 ml-2.5 mr-1"
              : "max-w-0 opacity-0"
          }`}
        >
          {open ? "Close" : "Ask Ravishankar"}
        </span>
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.2 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed z-50 bg-white shadow-2xl border-2 border-navy-950 flex flex-col overflow-hidden max-sm:inset-x-3 max-sm:bottom-3 max-sm:h-[86dvh] sm:bottom-24 sm:right-6 sm:w-[410px]"
          >
            {/* Header */}
            <div className="bg-navy-950 px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-brand flex items-center justify-center text-navy-950 font-display font-extrabold">
                RR
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-[15px] leading-tight">
                  Ask Ravishankar
                </p>
                <p className="text-white/50 text-xs">
                  Sales &amp; Marketing Advisor
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 text-white/60 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 sm:max-h-[min(60vh,540px)] sm:min-h-[340px]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-[15.5px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-navy-950 text-white"
                        : "bg-blue-wash text-navy-800"
                    }`}
                  >
                    {msg.content ? (
                    <MessageBody content={msg.content} />
                  ) : (
                    <TypingDots />
                  )}
                  </div>
                </div>
              ))}

              {/* Starter questions on a fresh chat */}
              {fresh && !loading && (
                <div className="pt-1 space-y-2">
                  <p className="font-mono text-[11px] tracking-widest uppercase text-navy-400">
                    Try asking
                  </p>
                  {STARTERS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="block w-full text-left text-[14.5px] text-navy-800 border border-blue-light hover:border-navy-600 hover:bg-blue-wash px-4 py-2.5 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-blue-light p-3.5 flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="Ask a sales or marketing question…"
                className="flex-1 text-[15px] px-3.5 py-2.5 border border-blue-light bg-blue-wash text-navy-950 placeholder-navy-400 focus:outline-none focus:border-navy-600 focus:bg-white transition-colors"
                disabled={loading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="px-3.5 py-2.5 bg-navy-950 hover:bg-navy-800 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
                aria-label="Send"
              >
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
