// Catálogo do site. Para virar dinâmico, esta lista pode vir do banco
// (Supabase) sem mudar os componentes: basta manter o mesmo formato.
import type { FotoId } from "./fotos";

export type Categoria = "padaria" | "buffet" | "salgados" | "cestas" | "bebidas";

export const categorias: { id: Categoria; nome: string }[] = [
  { id: "padaria", nome: "Padaria" },
  { id: "buffet", nome: "Buffet" },
  { id: "salgados", nome: "Salgados e doces" },
  { id: "cestas", nome: "Cestas" },
  { id: "bebidas", nome: "Bebidas" },
];

export type Produto = {
  nome: string;
  categoria: Categoria;
  texto: string;
  medida: string;
  foto: FotoId;
};

export const produtos: Produto[] = [
  {
    nome: "Pão francês",
    categoria: "padaria",
    texto: "Casquinha fina e miolo macio, do jeito que a gente come todo dia.",
    medida: "unidade",
    foto: "pao-frances",
  },
  {
    nome: "Pão delícia",
    categoria: "padaria",
    texto: "Pãozinho doce e fofo, que derrete na boca.",
    medida: "por quilo",
    foto: "pao-delicia",
  },
  {
    nome: "Bolo de aipim",
    categoria: "padaria",
    texto: "Receita baiana, úmido e com casquinha dourada.",
    medida: "por quilo",
    foto: "bolo-aipim",
  },
  {
    nome: "Buffet do café da manhã",
    categoria: "buffet",
    texto: "Cuscuz, ovos, frutas, pães e bolos para começar o dia.",
    medida: "por quilo",
    foto: "buffet-cafe",
  },
  {
    nome: "Buffet do almoço",
    categoria: "buffet",
    texto: "Comida caseira variada, servida por quilo.",
    medida: "por quilo",
    foto: "buffet-almoco",
  },
  {
    nome: "Raízes e cuscuz",
    categoria: "buffet",
    texto: "Aipim, inhame, batata-doce e cuscuz no fim da tarde.",
    medida: "por quilo",
    foto: "buffet-raizes",
  },
  {
    nome: "Mini salgados",
    categoria: "salgados",
    texto: "Coxinha, risole e companhia, pequenos e saindo quentes.",
    medida: "por quilo",
    foto: "mini-salgados",
  },
  {
    nome: "Pudim",
    categoria: "salgados",
    texto: "Sobremesa clássica, lisinho e com calda de caramelo.",
    medida: "unidade",
    foto: "pudim",
  },
  {
    nome: "Cestas para presentear",
    categoria: "cestas",
    texto: "Cestas de café da manhã e de presente. Consulte as opções na loja.",
    medida: "sob encomenda",
    foto: "cestas",
  },
  {
    nome: "Suco de laranja",
    categoria: "bebidas",
    texto: "Laranja espremida na hora.",
    medida: "500 ml",
    foto: "suco-laranja",
  },
  {
    nome: "Café com leite",
    categoria: "bebidas",
    texto: "Para acompanhar o pão quentinho.",
    medida: "copo",
    foto: "cafe-leite",
  },
];
