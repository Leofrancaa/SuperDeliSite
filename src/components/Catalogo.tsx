"use client";

import { useEffect, useState } from "react";
import { categorias, produtos, type Categoria } from "@/content/produtos";
import type { FotoId } from "@/content/fotos";
import { Foto } from "./Foto";

export function Catalogo() {
  const [cat, setCat] = useState<Categoria>("padaria");
  useEffect(() => {
    const abrir = (e: Event) => setCat((e as CustomEvent<Categoria>).detail);
    window.addEventListener("superdeli:categoria", abrir);
    return () => window.removeEventListener("superdeli:categoria", abrir);
  }, []);
  const lista = produtos.filter((p) => p.categoria === cat);
  return (
    <div className="catalogo">
      <div className="abas" role="tablist" aria-label="Categorias do cardápio">
        {categorias.map((c) => (
          <button
            key={c.id}
            role="tab"
            id={`aba-${c.id}`}
            aria-selected={cat === c.id}
            aria-controls="lista-produtos"
            className="aba"
            onClick={() => setCat(c.id)}
          >
            {c.nome}
          </button>
        ))}
      </div>
      <ul
        id="lista-produtos"
        role="tabpanel"
        aria-labelledby={`aba-${cat}`}
        className="produtos"
        key={cat}
      >
        {lista.map((p, i) => (
          <li
            key={p.nome}
            className={`produto ${i === 0 ? "produto-grande" : ""}`}
          >
            <Foto id={p.foto} />
            <div className="produto-texto">
              <h3>{p.nome}</h3>
              <p>{p.texto}</p>
              <span className="medida">{p.medida}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const fotoDaCategoria: Record<Categoria, FotoId> = {
  padaria: "pao-frances",
  buffet: "buffet-almoco",
  salgados: "mini-salgados",
  cestas: "cestas",
  bebidas: "suco-laranja",
};

/** Atalhos com foto para cada categoria: abrem o cardápio já na aba certa. */
export function AtalhosCategorias() {
  return (
    <ul className="atalhos">
      {categorias.map((c) => (
        <li key={c.id}>
          <a
            href="#cardapio"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("superdeli:categoria", { detail: c.id }))
            }
          >
            <Foto id={fotoDaCategoria[c.id]} className="atalho-foto" />
            <span>{c.nome}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
