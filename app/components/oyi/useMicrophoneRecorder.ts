"use client";

import { useCallback, useRef, useState } from "react";

export type MicrophoneState =
  | "idle"
  | "requesting"
  | "listening"
  | "processing"
  | "denied"
  | "unavailable"
  | "error";

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

// Turn-based voice capture: explicit start/stop around one utterance,
// not a continuous stream — matches the Backend's turn-based voice-turn
// contract honestly rather than implying realtime streaming.
export function useMicrophoneRecorder() {
  const [state, setState] = useState<MicrophoneState>("idle");
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const stopTracks = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const start = useCallback(async () => {
    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      setState("unavailable");
      return;
    }
    setState("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "";
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorderRef.current = recorder;
      recorder.start();
      setState("listening");
    } catch (error: any) {
      stopTracks();
      setState(error?.name === "NotAllowedError" || error?.name === "PermissionDeniedError" ? "denied" : "error");
    }
  }, [stopTracks]);

  const stop = useCallback((): Promise<string | null> => {
    return new Promise((resolve) => {
      const recorder = recorderRef.current;
      if (!recorder || recorder.state === "inactive") {
        resolve(null);
        return;
      }
      setState("processing");
      recorder.onstop = async () => {
        stopTracks();
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        chunksRef.current = [];
        if (!blob.size) {
          resolve(null);
          return;
        }
        try {
          resolve(await blobToDataUrl(blob));
        } catch {
          resolve(null);
        }
      };
      recorder.stop();
    });
  }, [stopTracks]);

  const cancel = useCallback(() => {
    recorderRef.current?.stop();
    stopTracks();
    chunksRef.current = [];
    setState("idle");
  }, [stopTracks]);

  const reset = useCallback(() => setState("idle"), []);

  return { state, start, stop, cancel, reset };
}
