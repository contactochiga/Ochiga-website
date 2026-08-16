"use client";

// React binding for the shared Oyi Universal Interaction Shell docking
// engine (lib/oyi-shell/core/docking.mjs — the same source Ochiga
// Office vendors and drives its own orb with). This hook owns pointer
// events, React state and localStorage; docking.mjs stays pure and
// framework-agnostic so it doesn't fork between the two products.
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import * as docking from "@/lib/oyi-shell/core/docking.mjs";

const POSITION_KEY = "oyi_orb_anchor";
const MOBILE_BREAKPOINT = 640;
const ORB_SIZE = 54; // matches Office's .oyi-orb exactly — same shell, same geometry
const EDGE_MARGIN = 20;
const DRAG_THRESHOLD = 4;

export type OpenDirection = { horizontal: "left" | "right"; vertical: "up" | "down" };
type Position = { x: number; y: number };
type AnchorId = (typeof docking.ANCHOR_IDS)[number];

function dockingEnabled() {
  return typeof window !== "undefined" && window.innerWidth >= MOBILE_BREAKPOINT;
}

function bounds(panelHeight: number) {
  return {
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    size: ORB_SIZE,
    margin: EDGE_MARGIN,
    panelWidth: Math.min(400, window.innerWidth - 40),
    panelHeight: Math.min(panelHeight || 600, 600, window.innerHeight - 120),
    panelGap: 0,
  };
}

function resolveOpenDirectionForAnchor(anchor: AnchorId, position: Position, panelHeight: number): OpenDirection {
  const base = docking.panelOpenDirection(anchor);
  const vertical =
    base.vertical === "auto"
      ? docking.resolveVerticalOpenDirection({
          orbY: position.y,
          orbSize: ORB_SIZE,
          panelHeight: Math.min(panelHeight || 600, 600),
          viewportHeight: window.innerHeight,
          gap: 0,
        })
      : base.vertical;
  return { horizontal: base.horizontal, vertical };
}

const ORB_SIZE_EXPORT = ORB_SIZE;

/**
 * Inline positioning style for the panel/minimized bar, so they share
 * whichever corner of the orb they should visually extend from — the
 * same "surface replaces the orb in place" behavior as Office's
 * positionOyiSurfaces(). Returns undefined (caller keeps its default
 * bottom-right CSS classes) until the orb has an explicit dock
 * position, i.e. before the visitor has ever dragged it.
 */
export function dockedSurfaceStyle(
  position: Position | null,
  openDirection: OpenDirection
): CSSProperties | undefined {
  if (!position || typeof window === "undefined") return undefined;
  const style: CSSProperties = {};
  if (openDirection.horizontal === "right") {
    style.left = position.x;
    style.right = "auto";
  } else {
    style.right = window.innerWidth - (position.x + ORB_SIZE_EXPORT);
    style.left = "auto";
  }
  if (openDirection.vertical === "down") {
    style.top = position.y;
    style.bottom = "auto";
  } else {
    style.bottom = window.innerHeight - (position.y + ORB_SIZE_EXPORT);
    style.top = "auto";
  }
  return style;
}

export function useDockedOrb(panelHeight: number) {
  const [position, setPosition] = useState<Position | null>(null);
  const [openDirection, setOpenDirection] = useState<OpenDirection>({ horizontal: "left", vertical: "up" });
  const [dragging, setDragging] = useState(false);
  const dragState = useRef<{ pointerId: number; originX: number; originY: number; startX: number; startY: number; moved: boolean } | null>(null);
  const lastDragMoved = useRef(false);

  useEffect(() => {
    if (!dockingEnabled()) return;
    try {
      const raw = window.localStorage.getItem(POSITION_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { anchor?: AnchorId };
      if (saved.anchor && (docking.ANCHOR_IDS as readonly string[]).includes(saved.anchor)) {
        const anchors = docking.anchorPositions(bounds(panelHeight));
        const next = anchors[saved.anchor];
        setPosition(next);
        setOpenDirection(resolveOpenDirectionForAnchor(saved.anchor, next, panelHeight));
      }
    } catch {
      // localStorage unavailable or corrupt — stay in the default corner.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (!dockingEnabled() || !position) return;
      const resolved = docking.resolveDockedState(position, bounds(panelHeight));
      setPosition(resolved.position);
      setOpenDirection(resolved.openDirection);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panelHeight]);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      if (!dockingEnabled()) return;
      const rect = event.currentTarget.getBoundingClientRect();
      dragState.current = {
        pointerId: event.pointerId,
        originX: rect.left,
        originY: rect.top,
        startX: event.clientX,
        startY: event.clientY,
        moved: false,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
      setPosition((current) => current || docking.projectToNearestEdge({ x: rect.left, y: rect.top }, bounds(panelHeight)));
    },
    [panelHeight]
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      const drag = dragState.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;
      if (!drag.moved && Math.hypot(dx, dy) > DRAG_THRESHOLD) drag.moved = true;
      if (!drag.moved) return;
      const next = docking.projectToNearestEdge({ x: drag.originX + dx, y: drag.originY + dy }, bounds(panelHeight));
      setPosition(next);
    },
    [panelHeight]
  );

  const endDrag = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      const drag = dragState.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      lastDragMoved.current = drag.moved;
      setDragging(false);
      if (drag.moved) {
        setPosition((current) => {
          if (!current) return current;
          const resolved = docking.resolveDockedState(current, bounds(panelHeight));
          setOpenDirection(resolved.openDirection);
          try {
            window.localStorage.setItem(POSITION_KEY, JSON.stringify({ anchor: resolved.anchor }));
          } catch {
            // Position just won't persist across reloads — not worth surfacing.
          }
          return resolved.position;
        });
      }
      dragState.current = null;
    },
    [panelHeight]
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
    openDirection,
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    consumeWasDragged,
    orbSize: ORB_SIZE,
  };
}
