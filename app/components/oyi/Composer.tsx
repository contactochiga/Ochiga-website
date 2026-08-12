"use client";

import { useState, type FormEvent } from "react";
import { IconCamera, IconMic, IconSend } from "./icons";

export function Composer({
  onSend,
  onStartVoice,
  onStartCamera,
  disabled,
}: {
  onSend: (text: string) => void;
  onStartVoice: () => void;
  onStartCamera: () => void;
  disabled: boolean;
}) {
  const [value, setValue] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
  };

  return (
    <form onSubmit={submit} className="flex items-end gap-2 border-t border-ochiga-white/10 px-3 py-3">
      <button
        type="button"
        onClick={onStartCamera}
        aria-label="Show Oyi something with your camera"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ochiga-grey-500 transition-colors duration-fast hover:bg-ochiga-graphite hover:text-ochiga-white"
      >
        <IconCamera className="h-[18px] w-[18px]" />
      </button>
      <button
        type="button"
        onClick={onStartVoice}
        aria-label="Talk to Oyi"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ochiga-grey-500 transition-colors duration-fast hover:bg-ochiga-graphite hover:text-ochiga-white"
      >
        <IconMic className="h-[18px] w-[18px]" />
      </button>
      <label htmlFor="oyi-composer-input" className="sr-only">
        Message Oyi
      </label>
      <input
        id="oyi-composer-input"
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Ask Oyi anything…"
        autoComplete="off"
        className="min-w-0 flex-1 rounded-full border border-ochiga-white/10 bg-ochiga-graphite px-4 py-2.5 text-sm text-ochiga-white placeholder:text-ochiga-grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-oyi-blue"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label="Send"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ochiga-red text-ochiga-white transition-colors duration-fast hover:bg-ochiga-red-bright disabled:cursor-not-allowed disabled:opacity-40"
      >
        <IconSend className="h-[16px] w-[16px]" />
      </button>
    </form>
  );
}
