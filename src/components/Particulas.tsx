"use client";

// Campo de partículas (farinha e trigo) que muda de forma conforme a seção:
// marca → espiga de trigo → pão → prato → molduras de foto → pino do mapa.
// Cada seção declara a forma em data-forma; o tom (escuro/claro) muda a cor.
import { useEffect, useRef } from "react";
import * as THREE from "three";

export type Forma =
  "marca" | "trigo" | "pao" | "prato" | "molduras" | "pino" | "poeira";
type Tom = "escuro" | "claro" | "folha";

type Layout = { x: number; y: number; altura: number };

const W = 480;
const H = 300;

// Desenha a forma num canvas 2D; os pixels preenchidos viram partículas.
function desenhar(ctx: CanvasRenderingContext2D, forma: Forma, fonte: string) {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#fff";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const cx = W / 2;
  const cy = H / 2;
  switch (forma) {
    case "marca": {
      ctx.font = `800 118px ${fonte}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("superdeli", cx, cy + 6, W - 10);
      break;
    }
    case "trigo": {
      // espiga: talo, grãos em pares bem separados e praganas no alto
      ctx.save();
      ctx.translate(cx, cy + 6);
      ctx.rotate(-0.38);
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, 142);
      ctx.quadraticCurveTo(4, 60, 0, -84);
      ctx.stroke();
      for (let i = 0; i < 6; i++) {
        const y = -78 + i * 30;
        for (const lado of [-1, 1]) {
          ctx.save();
          ctx.translate(lado * 13, y + (lado > 0 ? 12 : 0));
          ctx.rotate(lado * 0.5);
          ctx.beginPath();
          ctx.ellipse(0, 0, 8.5, 16, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      ctx.beginPath();
      ctx.ellipse(0, -100, 7.5, 15, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 1.6;
      for (let i = 0; i < 4; i++) {
        const y = -90 + i * 30;
        for (const lado of [-1, 1]) {
          ctx.beginPath();
          ctx.moveTo(lado * 16, y);
          ctx.lineTo(lado * 38, y - 34);
          ctx.stroke();
        }
      }
      ctx.beginPath();
      ctx.moveTo(0, -114);
      ctx.lineTo(0, -142);
      ctx.stroke();
      ctx.restore();
      break;
    }
    case "pao": {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.ellipse(0, 0, 190, 92, 0, 0, Math.PI * 2);
      ctx.fill();
      // cortes do pão
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 16;
      for (const x of [-95, -15, 65]) {
        ctx.beginPath();
        ctx.moveTo(x - 30, 48);
        ctx.quadraticCurveTo(x + 5, 0, x + 40, -50);
        ctx.stroke();
      }
      ctx.restore();
      break;
    }
    case "prato": {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(0, 0, 112, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(0, 0, 78, 0, Math.PI * 2);
      ctx.stroke();
      // garfo
      ctx.lineWidth = 9;
      ctx.beginPath();
      ctx.moveTo(-170, -40);
      ctx.lineTo(-170, 120);
      ctx.stroke();
      ctx.lineWidth = 4;
      for (const d of [-17, 0, 17]) {
        ctx.beginPath();
        ctx.moveTo(-170 + d, -110);
        ctx.lineTo(-170 + d, -50);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(-187, -50);
      ctx.quadraticCurveTo(-170, -28, -153, -50);
      ctx.stroke();
      // faca
      ctx.beginPath();
      ctx.moveTo(170, -110);
      ctx.quadraticCurveTo(196, -40, 172, 10);
      ctx.lineTo(170, -110);
      ctx.fill();
      ctx.lineWidth = 9;
      ctx.beginPath();
      ctx.moveTo(171, 10);
      ctx.lineTo(171, 120);
      ctx.stroke();
      ctx.restore();
      break;
    }
    case "molduras": {
      ctx.lineWidth = 6;
      const quadros: [number, number, number, number][] = [
        [40, 40, 170, 120],
        [230, 30, 110, 150],
        [360, 60, 90, 90],
        [70, 180, 120, 90],
        [210, 200, 160, 80],
      ];
      for (const [x, y, w, h] of quadros) {
        ctx.strokeRect(x, y, w, h);
      }
      // sol e montanha dentro do primeiro quadro (ícone de foto)
      ctx.beginPath();
      ctx.arc(80, 75, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(50, 152);
      ctx.lineTo(110, 95);
      ctx.lineTo(150, 130);
      ctx.lineTo(170, 112);
      ctx.lineTo(200, 152);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case "pino": {
      ctx.save();
      ctx.translate(cx, cy - 10);
      ctx.beginPath();
      ctx.arc(0, -40, 82, Math.PI * 0.85, Math.PI * 2.15);
      ctx.lineTo(0, 130);
      ctx.closePath();
      ctx.fill();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(0, -40, 34, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      break;
    }
  }
}

function amostrar(forma: Forma, n: number, fonte: string): Float32Array {
  if (forma === "poeira") {
    // farinha espalhada pela tela inteira (seções com muito conteúdo)
    const out = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      out[i * 3] = Math.random() - 0.5;
      out[i * 3 + 1] = Math.random() - 0.5;
      out[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
    }
    return out;
  }
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  desenhar(ctx, forma, fonte);
  const dados = ctx.getImageData(0, 0, W, H).data;
  const cheios: number[] = [];
  for (let y = 0; y < H; y += 1)
    for (let x = 0; x < W; x += 1)
      if (dados[(y * W + x) * 4 + 3] > 128) cheios.push(x, y);
  const total = cheios.length / 2;
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const k = Math.floor(Math.random() * total) * 2;
    // centraliza e normaliza para altura 1 (y para cima)
    out[i * 3] = (cheios[k] + Math.random() - W / 2) / H;
    out[i * 3 + 1] = -(cheios[k + 1] + Math.random() - H / 2) / H;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
  }
  return out;
}

// Onde cada forma fica na tela (frações da altura/largura visível).
function layoutDe(forma: Exclude<Forma, "poeira">, largo: boolean): Layout {
  if (!largo) {
    const alto: Record<Exclude<Forma, "poeira">, Layout> = {
      marca: { x: 0, y: 0.18, altura: 0.32 },
      trigo: { x: 0.05, y: 0.22, altura: 0.5 },
      pao: { x: 0, y: 0.24, altura: 0.3 },
      prato: { x: 0, y: 0.24, altura: 0.36 },
      molduras: { x: 0, y: 0.24, altura: 0.34 },
      pino: { x: 0, y: 0.22, altura: 0.42 },
    };
    return alto[forma];
  }
  const l: Record<Exclude<Forma, "poeira">, Layout> = {
    marca: { x: 0, y: 0.1, altura: 0.68 },
    trigo: { x: 0.26, y: 0, altura: 0.95 },
    pao: { x: 0.27, y: 0.02, altura: 0.5 },
    prato: { x: -0.22, y: 0.02, altura: 0.52 },
    molduras: { x: 0.23, y: 0.02, altura: 0.5 },
    pino: { x: 0.26, y: 0, altura: 0.8 },
  };
  return l[forma];
}

const PALETA: Record<Tom, { a: THREE.Color; b: THREE.Color; alfa: number }> = {
  escuro: {
    a: new THREE.Color("#f6ecd6"),
    b: new THREE.Color("#e9a62f"),
    alfa: 0.95,
  },
  folha: {
    a: new THREE.Color("#f2ead2"),
    b: new THREE.Color("#e9a62f"),
    alfa: 0.9,
  },
  claro: {
    a: new THREE.Color("#9b4a1c"),
    b: new THREE.Color("#c98a22"),
    alfa: 0.6,
  },
};

export function Particulas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const reduzir = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return; // sem WebGL: o site continua normal, só sem as partículas
    }
    document.documentElement.classList.add("webgl");
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);

    const cena = new THREE.Scene();
    const fov = 35;
    const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 50);
    camera.position.z = 1 / Math.tan(((fov / 2) * Math.PI) / 180); // altura visível = 2

    const largoInicial = window.innerWidth >= 900;
    const N = largoInicial ? 12000 : 5500;
    const pos = new Float32Array(N * 3);
    const alvo = new Float32Array(N * 3);
    const vel = new Float32Array(N);
    const fase = new Float32Array(N);
    const mistura = new Float32Array(N);
    const tam = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
      vel[i] = 0.035 + Math.random() * 0.055;
      fase[i] = Math.random() * Math.PI * 2;
      mistura[i] = Math.random() < 0.72 ? 0 : 1;
      tam[i] = 0.6 + Math.random() * 1.1;
    }
    const geo = new THREE.BufferGeometry();
    const atributoPos = new THREE.BufferAttribute(pos, 3);
    atributoPos.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute("position", atributoPos);
    geo.setAttribute("aMistura", new THREE.BufferAttribute(mistura, 1));
    geo.setAttribute("aTam", new THREE.BufferAttribute(tam, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uCorA: { value: PALETA.escuro.a.clone() },
        uCorB: { value: PALETA.escuro.b.clone() },
        uAlfa: { value: PALETA.escuro.alfa },
        uPixel: { value: renderer.getPixelRatio() },
        uEscala: { value: 1 },
      },
      vertexShader: /* glsl */ `
        attribute float aMistura;
        attribute float aTam;
        uniform float uPixel;
        uniform float uEscala;
        varying float vMistura;
        void main() {
          vMistura = aMistura;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = aTam * uEscala * uPixel * (5.0 / -mv.z);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uCorA;
        uniform vec3 uCorB;
        uniform float uAlfa;
        varying float vMistura;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.1, d) * uAlfa;
          gl_FragColor = vec4(mix(uCorA, uCorB, vMistura), a);
        }
      `,
    });
    const pontos = new THREE.Points(geo, material);
    cena.add(pontos);

    const fonte = getComputedStyle(document.body).fontFamily || "sans-serif";
    const cache = new Map<Forma, Float32Array>();
    let forma: Forma = "marca";
    let tom: Tom = "escuro";
    let largura = 1;
    let altura = 1;

    function aplicarAlvo() {
      let base = cache.get(forma);
      if (!base) {
        base = amostrar(forma, N, fonte);
        cache.set(forma, base);
      }
      const largo = largura >= 900;
      const aspecto = largura / altura;
      if (forma === "poeira") {
        for (let i = 0; i < N; i++) {
          alvo[i * 3] = base[i * 3] * aspecto * 2.2;
          alvo[i * 3 + 1] = base[i * 3 + 1] * 2.2;
          alvo[i * 3 + 2] = base[i * 3 + 2];
        }
        if (reduzir) pos.set(alvo);
        return;
      }
      const lay = layoutDe(forma, largo);
      // altura da forma em unidades de mundo (tela tem 2 de altura)
      let h = lay.altura * 2;
      const larguraForma = h * (W / H);
      const max = aspecto * 2 * (largo ? 0.92 : 0.9);
      if (larguraForma > max) h *= max / larguraForma;
      const ox = lay.x * aspecto * 2;
      const oy = lay.y * 2;
      for (let i = 0; i < N; i++) {
        alvo[i * 3] = base[i * 3] * h + ox;
        alvo[i * 3 + 1] = base[i * 3 + 1] * h + oy;
        alvo[i * 3 + 2] = base[i * 3 + 2];
      }
      if (reduzir) pos.set(alvo);
    }

    function redimensionar() {
      largura = window.innerWidth;
      altura = window.innerHeight;
      renderer.setSize(largura, altura, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = largura / altura;
      camera.updateProjectionMatrix();
      material.uniforms.uEscala.value = Math.max(
        0.75,
        Math.min(1.25, altura / 800),
      );
      aplicarAlvo();
    }

    // Mouse/dedo empurra as partículas de leve.
    const mouse = { x: 9, y: 9, ativo: false };
    function mover(e: PointerEvent) {
      const aspecto = largura / altura;
      mouse.x = (e.clientX / largura - 0.5) * 2 * aspecto;
      mouse.y = -(e.clientY / altura - 0.5) * 2;
      mouse.ativo = true;
    }
    function sair() {
      mouse.ativo = false;
    }

    // Seção ativa = a que cruza o meio da tela.
    const secoes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-forma]"),
    );
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          const novaForma = el.dataset.forma as Forma;
          const novoTom = (el.dataset.tom as Tom) ?? "escuro";
          document.documentElement.dataset.tom = novoTom;
          if (novaForma !== forma) {
            forma = novaForma;
            // espalha um pouco antes de reagrupar: a "transição" entre formas
            if (!reduzir)
              for (let i = 0; i < N; i++) {
                pos[i * 3] += (Math.random() - 0.5) * 0.6;
                pos[i * 3 + 1] += (Math.random() - 0.5) * 0.6;
                pos[i * 3 + 2] += (Math.random() - 0.5) * 1.2;
              }
            aplicarAlvo();
          }
          tom = novoTom;
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    secoes.forEach((s) => observador.observe(s));

    let raf = 0;
    let t = 0;
    const corA = new THREE.Color();
    const corB = new THREE.Color();
    function quadro() {
      raf = requestAnimationFrame(quadro);
      if (document.hidden) return;
      t += 0.016;
      const raio = 0.18;
      for (let i = 0; i < N; i++) {
        const j = i * 3;
        const k = reduzir ? 1 : vel[i];
        let tx = alvo[j];
        let ty = alvo[j + 1];
        if (!reduzir) {
          tx += Math.sin(t * 0.9 + fase[i]) * 0.004;
          ty += Math.cos(t * 0.7 + fase[i]) * 0.004;
          if (mouse.ativo) {
            const dx = pos[j] - mouse.x;
            const dy = pos[j + 1] - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < raio * raio) {
              const f = (1 - Math.sqrt(d2) / raio) * 0.06;
              pos[j] += dx * f * 4;
              pos[j + 1] += dy * f * 4;
            }
          }
        }
        pos[j] += (tx - pos[j]) * k;
        pos[j + 1] += (ty - pos[j + 1]) * k;
        pos[j + 2] += (alvo[j + 2] - pos[j + 2]) * k;
      }
      atributoPos.needsUpdate = true;
      const p = PALETA[tom];
      corA.copy(material.uniforms.uCorA.value).lerp(p.a, 0.06);
      corB.copy(material.uniforms.uCorB.value).lerp(p.b, 0.06);
      material.uniforms.uCorA.value.copy(corA);
      material.uniforms.uCorB.value.copy(corB);
      // menos opaco atrás de texto: poeira e telas estreitas
      const fator =
        (forma === "poeira" ? 0.4 : 1) *
        (largura < 900 && forma !== "marca" ? 0.55 : 1);
      material.uniforms.uAlfa.value +=
        (p.alfa * fator - material.uniforms.uAlfa.value) * 0.06;
      if (!reduzir) {
        pontos.rotation.y = Math.sin(t * 0.15) * 0.06;
        pontos.rotation.x = Math.cos(t * 0.12) * 0.03;
      }
      renderer.render(cena, camera);
    }

    let iniciado = false;
    function iniciar() {
      if (iniciado) return;
      iniciado = true;
      redimensionar();
      quadro();
    }
    // espera a fonte carregar para desenhar a marca com ela
    document.fonts.ready.then(iniciar);
    window.setTimeout(iniciar, 1500);

    window.addEventListener("resize", redimensionar);
    window.addEventListener("pointermove", mover, { passive: true });
    window.addEventListener("pointerleave", sair);
    window.addEventListener("blur", sair);

    return () => {
      cancelAnimationFrame(raf);
      observador.disconnect();
      window.removeEventListener("resize", redimensionar);
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointerleave", sair);
      window.removeEventListener("blur", sair);
      geo.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      document.documentElement.classList.remove("webgl");
    };
  }, []);

  return <div ref={ref} className="particulas" aria-hidden="true" />;
}
