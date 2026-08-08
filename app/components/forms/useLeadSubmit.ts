"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { LeadType } from "@/lib/leads/types";

export type SubmitState = "idle" | "submitting" | "success" | "error";

export function useLeadSubmit(leadType: LeadType) {
  const formStartedAt = useMemo(() => String(Date.now()), []);
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [requestId, setRequestId] = useState("");
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  // Accessible focus handling: move focus to the error summary whenever
  // validation fails, so screen-reader users land on the problem instead
  // of staying wherever they were.
  useEffect(() => {
    if (state === "error" && errorSummaryRef.current) {
      errorSummaryRef.current.focus();
    }
  }, [state]);

  const submit = useCallback(
    async (fields: Record<string, unknown>) => {
      setState("submitting");
      setError("");
      setFieldErrors({});

      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            leadType,
            formStartedAt,
            pageUrl: typeof window !== "undefined" ? window.location.pathname : "",
            ...fields,
          }),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok || !data.ok) {
          setError(data.error || "Something went wrong. Please try again.");
          setFieldErrors(data.fieldErrors || {});
          setRequestId(data.requestId || "");
          setState("error");
          return { ok: false as const };
        }

        setRequestId(data.requestId || "");
        setState("success");
        return { ok: true as const };
      } catch {
        setError("We could not reach the server. Please check your connection and try again.");
        setState("error");
        return { ok: false as const };
      }
    },
    [leadType, formStartedAt]
  );

  return { state, error, fieldErrors, requestId, submit, errorSummaryRef, formStartedAt };
}
