"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "oyi_bubble_position";
const BUBBLE_SIZE = 60;
const MARGIN = 16;

type Position = { x: number; y: number };

function clamp(position: Position): Position {
  const maxX = window.innerWidth - BUBBLE_SIZE - MARGIN;
  const maxY = window.innerHeight - BUBBLE_SIZE - MARGIN;
  return {
    x: Math.min(Math.max(position.x, MARGIN), Math.max(MARGIN, maxX)),
    y: Math.min(Math.max(position.y, MARGIN), Math.max(MARGIN, maxY)),
  };
}

// Draggable, viewport-clamped, snaps to the nearer left/right edge on
// release, remembered for the current browser tab session only.
//
// `position` is null until the visitor has actually moved the bubble (or
// a moved position was restored from sessionStorage) — the resting state
// is anchored with plain CSS (bottom-right), never a JS-computed pixel
// value, so there is nothing for server/client rendering to disagree on.
export function useDraggableBubble() {
  const [position, setPosition] = useState<Position | null>(null);
  const [dragging, setDragging] = useState(false);
  const dragState = useRef<{ pointerId: number; offsetX: number; offsetY: number; moved: boolean } | null>(null);
  const lastDragMoved = useRef(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (raw) setPosition(clamp(JSON.parse(raw)));
    } catch {
      // sessionStorage unavailable or corrupt — stay in the default corner.
    }

    const onResize = () => setPosition((current) => (current ? clamp(current) : current));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const persist = useCallback((next: Position) => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // sessionStorage unavailable (private mode etc.) — position just won't persist.
    }
  }, []);

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    dragState.current = {
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    // The first pointer-down establishes an explicit pixel position (from
    // the bubble's current on-screen rect) so a click-without-much-movement
    // doesn't jump the bubble before the real drag distance is known.
    setPosition((current) => current || clamp({ x: rect.left, y: rect.top }));
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    drag.moved = true;
    const next = clamp({ x: event.clientX - drag.offsetX, y: event.clientY - drag.offsetY });
    setPosition(next);
  }, []);

  const endDrag = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      const drag = dragState.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      lastDragMoved.current = drag.moved;
      setDragging(false);
      if (drag.moved) {
        setPosition((current) => {
          if (!current) return current;
          const center = current.x + BUBBLE_SIZE / 2;
          const snappedX = center < window.innerWidth / 2 ? MARGIN : window.innerWidth - BUBBLE_SIZE - MARGIN;
          const snapped = clamp({ x: snappedX, y: current.y });
          persist(snapped);
          return snapped;
        });
      }
      dragState.current = null;
    },
    [persist]
  );

  // Consumed once by the click handler right after pointerup, so a real
  // drag never also triggers "open the panel".
  const consumeWasDragged = useCallback(() => {
    const value = lastDragMoved.current;
    lastDragMoved.current = false;
    return value;
  }, []);

  return {
    position,
    dragging,
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    consumeWasDragged,
  };
}
