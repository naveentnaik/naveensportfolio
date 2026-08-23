import React, { useEffect, useRef } from "react";
import styles from "./ParticleField.module.css";

const PARTICLE_DENSITY = 14000; // px^2 per particle
const MAX_PARTICLES = 110;
const LINK_DISTANCE = 130;
const CURSOR_RADIUS = 160;
const PARALLAX_STRENGTH = 26;

export const ParticleField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const container = canvas.parentElement;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let frameId = null;
    let running = true;

    const pointer = { x: null, y: null, active: false };

    const rand = (min, max) => min + Math.random() * (max - min);

    const createParticles = () => {
      const count = Math.min(
        MAX_PARTICLES,
        Math.max(24, Math.round((width * height) / PARTICLE_DENSITY))
      );
      particles = Array.from({ length: count }, () => {
        const depth = rand(0.25, 1); // 0 = far, 1 = near — drives size/speed/opacity
        return {
          x: rand(0, width),
          y: rand(0, height),
          baseX: 0,
          baseY: 0,
          vx: rand(-0.12, 0.12) * depth,
          vy: rand(-0.12, 0.12) * depth,
          depth,
          radius: rand(1, 2.2) * depth + 0.4,
        };
      });
      particles.forEach((p) => {
        p.baseX = p.x;
        p.baseY = p.y;
      });
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const parallaxX = pointer.active ? ((pointer.x - cx) / cx) : 0;
      const parallaxY = pointer.active ? ((pointer.y - cy) / cy) : 0;

      for (const p of particles) {
        p.baseX += p.vx;
        p.baseY += p.vy;

        if (p.baseX < 0 || p.baseX > width) p.vx *= -1;
        if (p.baseY < 0 || p.baseY > height) p.vy *= -1;
        p.baseX = Math.min(Math.max(p.baseX, 0), width);
        p.baseY = Math.min(Math.max(p.baseY, 0), height);

        let x = p.baseX + parallaxX * PARALLAX_STRENGTH * p.depth;
        let y = p.baseY + parallaxY * PARALLAX_STRENGTH * p.depth;

        if (pointer.active) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CURSOR_RADIUS && dist > 0.01) {
            const force = ((CURSOR_RADIUS - dist) / CURSOR_RADIUS) * 18 * p.depth;
            x += (dx / dist) * force;
            y += (dy / dist) * force;
          }
        }

        p.x = x;
        p.y = y;

        const opacity = 0.18 + p.depth * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 108, 255, ${opacity})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.16 * Math.min(a.depth, b.depth);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(200, 195, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      if (running) frameId = requestAnimationFrame(step);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        const opacity = 0.18 + p.depth * 0.5;
        ctx.beginPath();
        ctx.arc(p.baseX, p.baseY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 108, 255, ${opacity})`;
        ctx.fill();
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        running = false;
        if (frameId) cancelAnimationFrame(frameId);
      } else if (!reduceMotion) {
        if (!running) {
          running = true;
          frameId = requestAnimationFrame(step);
        }
      }
    };

    const handleResize = () => {
      resize();
      // Reassigning canvas.width/height (inside resize()) always clears the
      // bitmap. The rAF loop repaints every frame regardless, but the
      // reduced-motion path has no loop, so it must redraw explicitly here.
      if (reduceMotion) drawStatic();
    };

    handleResize();
    if (!reduceMotion) {
      frameId = requestAnimationFrame(step);
    }

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    container.addEventListener("mousemove", onPointerMove);
    container.addEventListener("mouseleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      running = false;
      if (frameId) cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", onPointerMove);
      container.removeEventListener("mouseleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
};
