import React, { useEffect, useRef } from 'react';
import './Cursor.css';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const onMove = e => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1;
      ring.current.y += (pos.current.y - ring.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      dotRef.current?.classList.add('cursor--hover');
      ringRef.current?.classList.add('cursor--hover');
    };
    const onLeaveLink = () => {
      dotRef.current?.classList.remove('cursor--hover');
      ringRef.current?.classList.remove('cursor--hover');
    };

    window.addEventListener('mousemove', onMove);
    raf.current = requestAnimationFrame(animate);

    const attachHover = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    };
    attachHover();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  if (window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      <div className="cursor__dot" ref={dotRef} />
      <div className="cursor__ring" ref={ringRef} />
    </>
  );
}
