import { useEffect, useRef } from 'react';

const NODE_COUNT = 80;
const CONNECTION_DIST = 160;
const NODE_RADIUS_MIN = 1.5;
const NODE_RADIUS_MAX = 3;
const SPEED = 0.3;
const LINE_COLOR_BASE = [134, 210, 194];

export default function NetworkBackground() {
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function createNodes() {
      const nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * SPEED,
          vy: (Math.random() - 0.5) * SPEED,
          r: NODE_RADIUS_MIN + Math.random() * (NODE_RADIUS_MAX - NODE_RADIUS_MIN),
        });
      }
      nodesRef.current = nodes;
    }

    function getContentBounds() {
      const shell = document.querySelector('.site-shell');
      if (!shell) return { left: 0, right: width };
      const rect = shell.getBoundingClientRect();
      return { left: rect.left, right: rect.right };
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const { left, right } = getContentBounds();
      const nodes = nodesRef.current;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];

        a.x += a.vx;
        a.y += a.vy;

        if (a.x < -10) a.x = width + 10;
        if (a.x > width + 10) a.x = -10;
        if (a.y < -10) a.y = height + 10;
        if (a.y > height + 10) a.y = -10;

        let alpha = 0.6;
        if (a.x > left && a.x < right) {
          const depth = Math.min(a.x - left, right - a.x) / ((right - left) / 2);
          alpha = 0.6 * (1 - depth * 0.85);
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const lineAlpha = (1 - dist / CONNECTION_DIST) * 0.25;
            let zoneFade = 1;
            const mx = (a.x + b.x) / 2;
            if (mx > left && mx < right) {
              const depth = Math.min(mx - left, right - mx) / ((right - left) / 2);
              zoneFade = 1 - depth * 0.85;
            }
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${LINE_COLOR_BASE[0]}, ${LINE_COLOR_BASE[1]}, ${LINE_COLOR_BASE[2]}, ${lineAlpha * zoneFade})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(134, 210, 194, ${alpha.toFixed(2)})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    function handleResize() {
      resize();
      nodesRef.current.forEach((n) => {
        if (n.x > width) n.x = width * Math.random();
        if (n.y > height) n.y = height * Math.random();
      });
    }

    resize();
    createNodes();

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (motionQuery.matches) {
      draw();
      cancelAnimationFrame(animRef.current);
    } else {
      draw();
    }

    function handleMotionChange() {
      cancelAnimationFrame(animRef.current);
      if (!motionQuery.matches) {
        draw();
      }
    }

    window.addEventListener('resize', handleResize);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="network-bg"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
