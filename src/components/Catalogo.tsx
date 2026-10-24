"use client";

import { useState } from "react";
import { categorias, produtos, type Categoria } from "@/content/produtos";
import { Foto } from "./Foto";

export function Catalogo() {
  const [cat, setCat] = useState<Categoria>("padaria");
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
