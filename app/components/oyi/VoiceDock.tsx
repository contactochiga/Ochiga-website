"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMicrophoneRecorder } from "./useMicrophoneRecorder";
import { IconMic } from "./icons";

type VoiceDockProps = {
  sendVoiceAudio: (audioDataUrl: string) => Promise<{ ok: boolean; audioDataUrl?: string | null }>;
  onClose: () => void;
};

const STATUS_COPY: Record<string, string> = {
  idle: "Tap to talk to Oyi",
  requesting: "Requesting microphone…",
  listening: "Listening — tap to stop",
  processing: "Oyi is thinking…",
  speaking: "Oyi is responding…",
  denied: "Microphone access was denied. You can still type.",
  unavailable: "Voice isn't supported in this browser.",
  error: "Something went wrong — try again.",
};

export function VoiceDock({ sendVoiceAudio, onClose }: VoiceDockProps) {
  const recorder = useMicrophoneRecorder();
  const [speaking, setSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const status = speaking ? "speaking" : recorder.state;

  const toggleRecording = useCallback(async () => {
    if (recorder.state === "listening") {
      const audioDataUrl = await recorder.stop();
      if (!audioDataUrl) return;
      const result = await sendVoiceAudio(audioDataUrl);
      recorder.reset();
      if (result.ok && result.audioDataUrl && !muted) {
        setSpeaking(true);
        if (audioRef.current) {
          audioRef.current.src = result.audioDataUrl;
          audioRef.current.play().catch(() => setSpeaking(false));
        }
      }
      return;
    }
    if (recorder.state === "idle" || recorder.state === "denied" || recorder.state === "error") {
      recorder.start();
    }
  }, [muted, recorder, sendVoiceAudio]);

  useEffect(() => {
    return () => recorder.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disabled = recorder.state === "unavailable" || recorder.state === "processing" || speaking;

  return (
    <div className="flex flex-col items-center gap-3 border-t border-ochiga-white/10 px-4 py-5">
      <audio
        ref={audioRef}
        onEnded={() => setSpeaking(false)}
        onPause={() => setSpeaking(false)}
        muted={muted}
        className="hidden"
      />
      <button
        type="button"
        onClick={toggleRecording}
        disabled={disabled}
        aria-label={recorder.state === "listening" ? "Stop and send" : "Start talking"}
        aria-pressed={recorder.state === "listening"}
        className={`flex h-16 w-16 items-center justify-center rounded-full border transition-all duration-fast ease-editorial focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oyi-blue disabled:cursor-not-allowed disabled:opacity-40 ${
          recorder.state === "listening"
            ? "border-oyi-blue bg-oyi-blue/15 text-oyi-blue"
            : "border-ochiga-white/15 bg-ochiga-graphite text-ochiga-white hover:border-oyi-blue/60"
        }`}
      >
        <IconMic className={`h-6 w-6 ${recorder.state === "listening" ? "animate-pulse motion-reduce:animate-none" : ""}`} />
      </button>
      <p role="status" aria-live="polite" className="text-xs text-ochiga-grey-500">
        {STATUS_COPY[status] || STATUS_COPY.idle}
      </p>
      <div className="flex items-center gap-4 text-xs text-ochiga-grey-500">
        <button type="button" onClick={() => setMuted((v) => !v)} className="underline-offset-2 hover:text-ochiga-white hover:underline">
          {muted ? "Unmute Oyi" : "Mute Oyi"}
        </button>
        <button type="button" onClick={onClose} className="underline-offset-2 hover:text-ochiga-white hover:underline">
          Back to text
        </button>
      </div>
    </div>
  );
}
