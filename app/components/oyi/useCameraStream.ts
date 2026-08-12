"use client";

import { useCallback, useRef, useState } from "react";

export type CameraState = "idle" | "requesting" | "preview" | "analyzing" | "denied" | "unavailable" | "error";

// Live preview only; a frame is captured to a canvas and sent as a
// single still image on explicit request — never a continuous upload.
export function useCameraStream() {
  const [state, setState] = useState<CameraState>("idle");
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopTracks = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  const start = useCallback(
    async (mode: "user" | "environment" = facingMode) => {
      if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        setState("unavailable");
        return;
      }
      setState("requesting");
      try {
        stopTracks();
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: mode } });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => undefined);
        }
        setFacingMode(mode);
        setState("preview");
      } catch (error: any) {
        stopTracks();
        setState(error?.name === "NotAllowedError" || error?.name === "PermissionDeniedError" ? "denied" : "error");
      }
    },
    [facingMode, stopTracks]
  );

  const switchCamera = useCallback(() => {
    start(facingMode === "environment" ? "user" : "environment");
  }, [facingMode, start]);

  const stop = useCallback(() => {
    stopTracks();
    setState("idle");
  }, [stopTracks]);

  const captureFrame = useCallback((): string | null => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return null;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.85);
  }, []);

  return { state, videoRef, facingMode, start, stop, switchCamera, captureFrame, setState };
}
