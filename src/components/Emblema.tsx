"use client";

// O "D" dourado da marca, com a espiga de trigo feita de partículas de
// farinha que se juntam ao abrir a página. Leve: canvas só do tamanho do
// quadrado, three.js carregado depois da página e pausado fora da tela.
import { useEffect, useRef } from "react";

const W = 300;
const H = 300;

function desenharTrigo(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#fff";
  ctx.lineCap = "round";
  ctx.save();
  ctx.translate(W / 2, H / 2 + 8);
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(0, 120);
  ctx.lineTo(0, -70);
  ctx.stroke();
  for (let i = 0; i < 5; i++) {
    const y = -62 + i * 30;
    for (const lado of [-1, 1]) {
      ctx.save();
      ctx.translate(lado * 17, y + 10);
      ctx.rotate(lado * 0.55);
      ctx.beginPath();
      ctx.ellipse(0, 0, 11, 21, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
  ctx.beginPath();
  ctx.ellipse(0, -88, 10, 21, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function pontosDoTrigo(n: number): Float32Array {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  desenharTrigo(ctx);
  const dados = ctx.getImageData(0, 0, W, H).data;
  const cheios: number[] = [];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (dados[(y * W + x) * 4 + 3] > 128) cheios.push(x, y);
  const out = new Float32Array(n * 3);
  const total = cheios.length / 2;
  for (let i = 0; i < n; i++) {
    const k = Math.floor(Math.random() * total) * 2;
    out[i * 3] = (cheios[k] + Math.random() - W / 2) / (W / 2);
    out[i * 3 + 1] = -(cheios[k + 1] + Math.random() - H / 2) / (H / 2);
    out[i * 3 + 2] = 0;
  }
  return out;
}

export function Emblema() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let parar = () => {};
    let cancelado = false;

    import("three").then((THREE) => {
      if (cancelado) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      } catch {
        return; // sem WebGL fica o desenho em SVG
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      el.appendChild(renderer.domElement);
      const cena = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
      camera.position.z = 2;

      const N = window.innerWidth < 700 ? 1600 : 2600;
      const alvo = pontosDoTrigo(N);
      const pos = new Float32Array(N * 3);
      const vel = new Float32Array(N);
      for (let i = 0; i < N; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = 1.1 + Math.random() * 0.6;
        pos[i * 3] = Math.cos(a) * r;
        pos[i * 3 + 1] = Math.sin(a) * r;
        vel[i] = 0.03 + Math.random() * 0.05;
      }
      if (reduzir) pos.set(alvo);
      const geo = new THREE.BufferGeometry();
      const attr = new THREE.BufferAttribute(pos, 3);
      geo.setAttribute("position", attr);
      const material = new THREE.PointsMaterial({
        color: "#fffaf0",
        size: 2.4 * renderer.getPixelRatio(),
        sizeAttenuation: false,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
      });
      cena.add(new THREE.Points(geo, material));

      const mouse = { x: 9, y: 9 };
      const mover = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        mouse.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      };
      const sair = () => {
        mouse.x = 9;
        mouse.y = 9;
      };
      el.addEventListener("pointermove", mover);
      el.addEventListener("pointerleave", sair);

      const tamanho = () => {
        const { width, height } = el.getBoundingClientRect();
        renderer.setSize(width, height, false);
      };
      tamanho();
      const ro = new ResizeObserver(tamanho);
      ro.observe(el);

      let visivel = true;
      const io = new IntersectionObserver(([e]) => (visivel = e.isIntersecting));
      io.observe(el);

      let raf = 0;
      let t = 0;
      const quadro = () => {
        raf = requestAnimationFrame(quadro);
        if (!visivel || document.hidden) return;
        t += 0.016;
        for (let i = 0; i < N; i++) {
          const j = i * 3;
          let tx = alvo[j];
          let ty = alvo[j + 1];
          if (!reduzir) {
            tx += Math.sin(t + i) * 0.004;
            ty += Math.cos(t * 0.8 + i) * 0.004;
            const dx = pos[j] - mouse.x;
            const dy = pos[j + 1] - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 0.06) {
              pos[j] += dx * 0.12;
              pos[j + 1] += dy * 0.12;
            }
          }
          pos[j] += (tx - pos[j]) * vel[i];
          pos[j + 1] += (ty - pos[j + 1]) * vel[i];
        }
        attr.needsUpdate = true;
        renderer.render(cena, camera);
      };
      quadro();
      el.classList.add("com-particulas");

      parar = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        el.removeEventListener("pointermove", mover);
        el.removeEventListener("pointerleave", sair);
        geo.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        el.classList.remove("com-particulas");
      };
    });

    return () => {
      cancelado = true;
      parar();
    };
  }, []);

  return (
    <div ref={host} className="emblema">
      {/* desenho estático: aparece sem WebGL e enquanto as partículas carregam */}
      <svg className="emblema-svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21V8" />
        <path d="M12 9c-2.5 0-4-1.6-4-4 2.5 0 4 1.6 4 4Zm0 0c2.5 0 4-1.6 4-4-2.5 0-4 1.6-4 4Z" />
        <path d="M12 13.5c-2.5 0-4-1.6-4-4 2.5 0 4 1.6 4 4Zm0 0c2.5 0 4-1.6 4-4-2.5 0-4 1.6-4 4Z" />
        <path d="M12 18c-2.5 0-4-1.6-4-4 2.5 0 4 1.6 4 4Zm0 0c2.5 0 4-1.6 4-4-2.5 0-4 1.6-4 4Z" />
      </svg>
    </div>
  );
}
