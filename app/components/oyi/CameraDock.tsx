"use client";

import { useEffect, useState } from "react";
import { useCameraStream } from "./useCameraStream";
import { IconCamera, IconSwitchCamera } from "./icons";

type CameraDockProps = {
  sendVisualFrame: (imageDataUrl: string, prompt?: string) => Promise<{ ok: boolean }>;
  onClose: () => void;
};

const STATUS_COPY: Record<string, string> = {
  idle: "Starting camera…",
  requesting: "Requesting camera access…",
  preview: "Show Oyi what you'd like it to see, then capture.",
  analyzing: "Oyi is looking…",
  denied: "Camera access was denied. You can still type or talk.",
  unavailable: "Camera isn't supported in this browser.",
  error: "Camera couldn't start — try again.",
};

export function CameraDock({ sendVisualFrame, onClose }: CameraDockProps) {
  const camera = useCameraStream();
  const [prompt, setPrompt] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    camera.start();
    return () => camera.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const capture = async () => {
    const frame = camera.captureFrame();
    if (!frame) return;
    setAnalyzing(true);
    camera.setState("analyzing");
    await sendVisualFrame(frame, prompt.trim() || undefined);
    setPrompt("");
    setAnalyzing(false);
    camera.setState("preview");
  };

  const showPreview = camera.state === "preview" || camera.state === "analyzing";

  return (
    <div className="flex flex-col gap-3 border-t border-ochiga-white/10 px-4 py-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-ochiga-black">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={camera.videoRef}
          playsInline
          muted
          className={`h-full w-full object-cover ${showPreview ? "opacity-100" : "opacity-0"}`}
        />
        {!showPreview ? (
          <div className="absolute inset-0 flex items-center justify-center text-center text-xs text-ochiga-grey-500">
            {STATUS_COPY[camera.state]}
          </div>
        ) : null}
        {camera.state === "analyzing" ? (
          <div className="absolute inset-0 flex items-center justify-center bg-ochiga-black/60 text-sm text-ochiga-white">
            Oyi is looking…
          </div>
        ) : null}
        <div className="absolute right-2 top-2 flex gap-1.5">
          <button
            type="button"
            onClick={() => camera.switchCamera()}
            aria-label="Switch camera"
            disabled={!showPreview}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-ochiga-black/60 text-ochiga-white disabled:opacity-40"
          >
            <IconSwitchCamera className="h-4 w-4" />
          </button>
        </div>
      </div>

      <label className="sr-only" htmlFor="oyi-visual-prompt">
        What should Oyi look for?
      </label>
      <input
        id="oyi-visual-prompt"
        type="text"
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        placeholder="Optional — what should Oyi look for?"
        className="rounded border border-ochiga-white/10 bg-ochiga-graphite px-3 py-2 text-sm text-ochiga-white placeholder:text-ochiga-grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-oyi-blue"
      />

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onClose}
          className="text-xs text-ochiga-grey-500 underline-offset-2 hover:text-ochiga-white hover:underline"
        >
          Back to text
        </button>
        <button
          type="button"
          onClick={capture}
          disabled={!showPreview || analyzing}
          className="flex items-center gap-2 rounded bg-ochiga-red px-4 py-2 text-sm font-medium text-ochiga-white transition-colors duration-fast hover:bg-ochiga-red-bright disabled:cursor-not-allowed disabled:opacity-40"
        >
          <IconCamera className="h-4 w-4" />
          Show Oyi
        </button>
      </div>
      <p role="status" aria-live="polite" className="sr-only">
        {STATUS_COPY[camera.state]}
      </p>
    </div>
  );
}
