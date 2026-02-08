import { useRef, useState } from "react";

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randSigned(minAbs, maxAbs) {
  return (Math.random() < 0.5 ? -1 : 1) * randBetween(minAbs, maxAbs);
}
function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}

export default function NoButton() {
  const btnRef = useRef(null);

  const [hasMoved, setHasMoved] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const margin = 12;
  const minJump = 50;
  const maxJump = 300;

  const doJumpFrom = (startX, startY, w, h) => {
    const dx = randSigned(minJump, maxJump);
    const dy = randSigned(minJump, maxJump);

    setPos({
      x: clamp(startX + dx, margin, window.innerWidth - w - margin),
      y: clamp(startY + dy, margin, window.innerHeight - h - margin),
    });
  };

  const onEnter = () => {
    const btn = btnRef.current;
    if (!btn) return;

    const r = btn.getBoundingClientRect();

    // First time: lock fixed at the exact same visual position, THEN jump
    if (!hasMoved) {
      setHasMoved(true);
      setPos({ x: r.left, y: r.top });

      // Jump right after React applies the fixed positioning
      requestAnimationFrame(() => {
        doJumpFrom(r.left, r.top, r.width, r.height);
      });
      return;
    }

    // Next times: jump from current fixed position
    doJumpFrom(pos.x, pos.y, r.width, r.height);
  };

  return (
    <button
      ref={btnRef}
      type="button"
      className="no-btn"
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onClick={onEnter}
      style={
        hasMoved
          ? { position: "fixed", left: pos.x, top: pos.y, zIndex: 9999 }
          : undefined
      }
    >
      No 🙈
    </button>
  );
}
