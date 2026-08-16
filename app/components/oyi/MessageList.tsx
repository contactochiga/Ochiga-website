"use client";

import { useEffect, useRef } from "react";
import type { OyiMessage } from "@/lib/oyi/types";

function bubbleClasses(role: OyiMessage["role"]) {
  if (role === "visitor") {
    return "ml-auto bg-ochiga-white text-ochiga-black";
  }
  if (role === "system") {
    return "mx-auto bg-transparent text-ochiga-grey-500 text-xs text-center border border-ochiga-white/10";
  }
  return "mr-auto bg-ochiga-graphite text-ochiga-white";
}

export function MessageList({ messages, thinking }: { messages: OyiMessage[]; thinking: boolean }) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages.length, thinking]);

  return (
    <div
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
    >
      {messages.length === 0 && !thinking ? (
        <p className="mx-auto max-w-[220px] pt-8 text-center text-sm text-ochiga-grey-500">
          Ask about Development, Oyi, Ochiga Private, or partnerships — Oyi is listening.
        </p>
      ) : null}
      {messages.map((message) => (
        <div
          key={message.id}
          className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${bubbleClasses(message.role)}`}
        >
          {message.text}
          {message.suggestions && message.suggestions.length > 0 ? (
            <div className="mt-2.5 border-t border-ochiga-white/10 pt-2.5">
              <p className="text-[10px] uppercase tracking-wide text-ochiga-grey-300">You might also ask</p>
              <ul className="mt-1 space-y-1">
                {message.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-xs text-ochiga-grey-300">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {message.knowledgeReferences && message.knowledgeReferences.length > 0 ? (
            <div className="mt-2.5 border-t border-ochiga-white/10 pt-2.5">
              <p className="text-[10px] uppercase tracking-wide text-ochiga-grey-300">References</p>
              <ul className="mt-1 space-y-1">
                {message.knowledgeReferences.map((ref, index) => (
                  <li key={index} className="text-xs text-ochiga-grey-300">
                    {ref.title}
                    {ref.source ? <span className="text-ochiga-grey-500"> · {ref.source}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ))}
      {thinking ? (
        <div className="mr-auto flex max-w-[85%] items-center gap-1.5 rounded-lg bg-ochiga-graphite px-3.5 py-3">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ochiga-grey-300 [animation-delay:-0.2s] motion-reduce:animate-none" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ochiga-grey-300 motion-reduce:animate-none" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ochiga-grey-300 [animation-delay:0.2s] motion-reduce:animate-none" />
        </div>
      ) : null}
      <div ref={endRef} />
    </div>
  );
}
