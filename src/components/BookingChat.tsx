"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Msg = { from: "bot" | "user"; text: string };

type StepKey = "name" | "phone" | "studentClass" | "school" | "preferredTime" | "message";

type StepDef = {
  key: StepKey;
  placeholder: string;
  validate?: (v: string) => string | null;
  optional?: boolean;
};

const stepDefs: StepDef[] = [
  {
    key: "name",
    placeholder: "Type your name…",
    validate: (v) => (v.trim().length < 2 ? "Hmm, that doesn't look like a name — could you try again?" : null),
  },
  {
    key: "phone",
    placeholder: "e.g. 9876543210",
    validate: (v) =>
      /^[+]?[\d\s-]{7,15}$/.test(v.trim()) ? null : "Oops — that doesn't look like a phone number. Could you double-check?",
  },
  {
    key: "studentClass",
    placeholder: "e.g. Class 10",
    validate: (v) => (v.trim().length < 1 ? "I need to know the class so ma'am can plan the best syllabus! 📖" : null),
  },
  {
    key: "school",
    placeholder: "e.g. Delhi Public School",
    validate: (v) => (v.trim().length < 2 ? "Could you share the school name? It helps ma'am personalise the lessons." : null),
  },
  {
    key: "preferredTime",
    placeholder: "e.g. Weekday evenings after 6pm",
    optional: true,
  },
  {
    key: "message",
    placeholder: "Anything at all — or just skip!",
    optional: true,
  },
];

/* ─── Smart reply helpers ─── */

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning! ☀️";
  if (h < 17) return "Good afternoon! 🌤️";
  return "Good evening! 🌙";
}

function nameReaction(name: string): string {
  const n = name.trim().split(/\s/)[0];
  const reactions = [
    `${n} — what a beautiful name! ✨ So glad you stopped by.`,
    `Lovely to meet you, ${n}! 😊 You've already made my day.`,
    `Hey ${n}! 🌿 Welcome welcome — you're in the right place.`,
    `${n}! I love it. Let's get you sorted with ma'am! 💚`,
  ];
  return pick(reactions);
}

function phoneReaction(): string {
  const reactions = [
    "Got it — that number is safe with us, pinky promise 🤞",
    "Perfect, saved it! Ma'am will reach out personally 📱",
    "Noted! That's the direct line to a brighter Biology future 😄",
  ];
  return pick(reactions);
}

function classReaction(cls: string): string {
  const low = cls.toLowerCase();
  if (low.includes("8")) return "Class 8 — the perfect time to fall in love with Biology! 🌱 The foundation starts here.";
  if (low.includes("9")) return "Class 9 — things are about to get really interesting! Tissues, cells, the works. 🔬";
  if (low.includes("10")) return "Ah, Class 10! Board year energy ⚡ Don't worry — ma'am knows exactly how to make it smooth.";
  if (low.includes("11")) return "Class 11 — welcome to the big leagues! 🧬 This is where Biology truly opens up.";
  if (low.includes("12")) return "Class 12 — the grand finale! 🎓 Ma'am will make sure you finish strong with flying colours.";
  if (low.includes("neet") || low.includes("competitive"))
    return "Competitive prep? Ma'am's NEET batches have a stellar track record 🏆 You're in great hands!";
  return `${cls} — wonderful! Ma'am has a perfectly tailored programme for that. 📚`;
}

function schoolReaction(school: string): string {
  const s = school.trim();
  const reactions = [
    `Oh nice, ${s}! Ma'am has worked with students from so many great schools. 🏫`,
    `${s} — awesome! Biology is going to feel so different with the right guidance. 💡`,
    `A student from ${s} — love it! Let's make Biology your superpower. 🦸`,
  ];
  return pick(reactions);
}

function timeReaction(time: string): string {
  if (!time) return "No worries! Ma'am will figure out the best time when she calls. 😊";
  const low = time.toLowerCase();
  if (low.includes("morning")) return "A morning person! Early bird gets the… cell division knowledge? 😄🌅";
  if (low.includes("evening") || low.includes("night")) return "Evenings work perfectly — that's when the brain is nicely warmed up! 🌆";
  if (low.includes("weekend") || low.includes("sunday") || low.includes("saturday"))
    return "Weekends — great choice! Nice and relaxed for a deep-dive session. 🧘";
  return `"${time}" — noted! Ma'am will match that perfectly. ⏰`;
}

function messageReaction(msg: string): string {
  if (!msg) return "All good — ma'am will cover everything on the call! 💬";
  const low = msg.toLowerCase();
  if (low.includes("weak") || low.includes("struggle") || low.includes("help") || low.includes("scared"))
    return "Hey — everyone starts somewhere, and you've just taken the bravest step by reaching out. Ma'am has a gift for turning confusion into clarity. 💪🌿";
  if (low.includes("neet") || low.includes("exam") || low.includes("competitive"))
    return "Competitive goals — I love the ambition! 🔥 Ma'am's exam strategy sessions are legendary.";
  if (low.includes("thank"))
    return "Aww, you're so sweet! 🥰 Thank YOU for trusting us with this.";
  if (msg.length > 50) return "That's super helpful context — I'll make sure ma'am reads every word before calling! 📝✨";
  return "Got it! Ma'am will factor all of this in. You're going to have a fantastic first chat. 🌟";
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ─── Component ─── */

export default function BookingChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [typing, setTyping] = useState(true);
  const [data, setData] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"chatting" | "sending" | "done" | "error">("chatting");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentStep = stepDefs[stepIndex];

  const pushBot = useCallback((text: string, delay = 650) => {
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text }]);
      setTyping(false);
      inputRef.current?.focus();
    }, delay);
  }, []);

  const pushBotMulti = useCallback((texts: string[]) => {
    let total = 0;
    texts.forEach((t, i) => {
      const delay = i === 0 ? 500 : 400 + t.length * 8;
      total += delay;
      setTimeout(() => {
        setMessages((m) => [...m, { from: "bot", text: t }]);
        if (i === texts.length - 1) {
          setTyping(false);
          inputRef.current?.focus();
        }
      }, total);
    });
    setTyping(true);
  }, []);

  // initial greeting
  useEffect(() => {
    pushBotMulti([
      `${getGreeting()} Welcome to Prithay Ray ma'am's Biology tuitions! 🧬`,
      "I'm her little assistant here to book you a free introductory call. It'll only take a minute — I promise I'm fun to talk to 😄",
      "So first things first — what's your name? 💚",
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, status]);

  const submitAll = async (finalData: Record<string, string>) => {
    setStatus("sending");
    setTyping(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });
      const json = await res.json();
      setTyping(false);
      if (!res.ok || !json.ok) {
        setStatus("error");
        setMessages((m) => [
          ...m,
          { from: "bot", text: json.error || "Oh no, something glitched on my end 😥 Could you try again?" },
        ]);
        return;
      }
      setStatus("done");
      const firstName = (finalData.name || "").trim().split(/\s/)[0];
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: `And we're all set, ${firstName}! 🎉🌿`,
        },
      ]);
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          {
            from: "bot",
            text: `Here's what happens next: Prithay ma'am will personally call you at ${finalData.phone} to chat about ${finalData.studentClass || "your"} Biology journey. She's genuinely excited to meet every new student!`,
          },
        ]);
      }, 800);
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          {
            from: "bot",
            text: "Until then — stay curious, keep questioning, and remember: every great biologist started exactly where you are right now. 🌱💚",
          },
        ]);
      }, 1800);
    } catch {
      setTyping(false);
      setStatus("error");
      setMessages((m) => [
        ...m,
        { from: "bot", text: "Hmm, looks like the internet hiccupped 🫠 Check your connection and give it another go!" },
      ]);
    }
  };

  const handleSend = () => {
    if (status !== "chatting" || typing) return;
    const value = input.trim();

    if (!currentStep.optional && currentStep.validate) {
      const err = currentStep.validate(value);
      if (err) {
        setError(err);
        return;
      }
    }

    setError(null);
    const shown = value || "—";
    setMessages((m) => [...m, { from: "user", text: shown }]);
    const newData = { ...data, [currentStep.key]: value };
    setData(newData);
    setInput("");

    // Build the smart reaction + next prompt
    const nextIndex = stepIndex + 1;
    const key = currentStep.key;

    let reaction = "";
    let nextPrompt = "";

    switch (key) {
      case "name":
        reaction = nameReaction(value);
        nextPrompt = "Now, what's the best phone number for ma'am to reach you on? 📞";
        break;
      case "phone":
        reaction = phoneReaction();
        nextPrompt = "Which class is the student currently in? Ma'am teaches Class 8 and above. 📚";
        break;
      case "studentClass":
        reaction = classReaction(value);
        nextPrompt = "And which school do you go to? 🏫";
        break;
      case "school":
        reaction = schoolReaction(value);
        nextPrompt = `When would be a good time for ma'am to call you, ${(newData.name || "").split(/\s/)[0]}? Morning, evening, weekends — whatever works! ⏰ (you can skip this too)`;
        break;
      case "preferredTime":
        reaction = timeReaction(value);
        nextPrompt = "Last one! Anything specific you'd like ma'am to know? Tough topics, goals, worries — anything at all. ✍️ (or skip!)";
        break;
      case "message":
        reaction = messageReaction(value);
        break;
    }

    if (nextIndex < stepDefs.length) {
      setStepIndex(nextIndex);
      if (reaction) {
        pushBotMulti([reaction, nextPrompt]);
      } else {
        pushBot(nextPrompt);
      }
    } else {
      // final step
      if (reaction) {
        setTyping(true);
        setTimeout(() => {
          setMessages((m) => [...m, { from: "bot", text: reaction }]);
        }, 500);
        setTimeout(() => {
          setMessages((m) => [
            ...m,
            { from: "bot", text: "Alright, let me save everything and get your appointment booked… 🔄" },
          ]);
          setTyping(false);
          submitAll(newData);
        }, 1400);
      } else {
        submitAll(newData);
      }
    }
  };

  const progress = Math.min(100, Math.round((stepIndex / stepDefs.length) * 100));

  return (
    <div className="glass overflow-hidden rounded-[2rem] border border-lime-300/20 shadow-2xl shadow-black/40">
      {/* header */}
      <div className="flex items-center gap-3 border-b border-lime-300/10 bg-emerald-950/50 px-5 py-4">
        <div className="relative">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-lime-300 to-emerald-500 text-xl pulse-ring">
            🧬
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-emerald-950 bg-lime-400" />
        </div>
        <div>
          <div className="font-semibold text-emerald-50">BioBot 🌿</div>
          <div className="text-xs text-lime-300/80">
            {typing ? "typing…" : "online · always happy to chat"}
          </div>
        </div>
      </div>

      {/* progress */}
      <div className="h-1 w-full bg-emerald-950/60">
        <div
          className="h-full bg-gradient-to-r from-lime-400 to-emerald-400 transition-all duration-500"
          style={{ width: `${status === "done" ? 100 : progress}%` }}
        />
      </div>

      {/* messages */}
      <div ref={scrollRef} className="h-[420px] space-y-3 overflow-y-auto px-5 py-6">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`pop max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow ${
                m.from === "user"
                  ? "rounded-br-md bg-gradient-to-br from-lime-400 to-emerald-500 text-emerald-950"
                  : "rounded-bl-md border border-lime-300/12 bg-emerald-900/50 text-emerald-50"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="pop flex gap-1 rounded-2xl rounded-bl-md border border-lime-300/12 bg-emerald-900/50 px-4 py-3">
              <Dot delay="0s" />
              <Dot delay="0.15s" />
              <Dot delay="0.3s" />
            </div>
          </div>
        )}
      </div>

      {/* input */}
      <div className="border-t border-lime-300/10 bg-emerald-950/40 px-4 py-4">
        {error && <div className="mb-2 px-2 text-xs text-rose-300">{error}</div>}
        {status === "done" ? (
          <div className="flex items-center justify-center gap-2 rounded-full bg-emerald-900/50 px-4 py-3 text-sm font-medium text-lime-300">
            ✅ Appointment booked — see you soon!
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={status === "sending" || typing}
              placeholder={currentStep?.placeholder || "Type your reply…"}
              className="flex-1 rounded-full border border-lime-300/15 bg-emerald-950/60 px-5 py-3 text-sm text-emerald-50 placeholder:text-emerald-100/35 outline-none transition focus:border-lime-300/50 focus:ring-2 focus:ring-lime-300/20 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={status === "sending" || typing}
              aria-label="Send"
              className="btn-sheen relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-lime-400 to-emerald-500 text-emerald-950 shadow-lg transition-transform duration-300 hover:scale-105 disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </div>
        )}
        {currentStep?.optional && status === "chatting" && !typing && (
          <button
            onClick={handleSend}
            className="mt-2 w-full text-center text-xs text-emerald-100/50 transition hover:text-lime-300"
          >
            Skip this step →
          </button>
        )}
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-lime-300/80"
      style={{ animationDelay: delay }}
    />
  );
}
