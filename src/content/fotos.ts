// Espaços de foto do site. Coloque o arquivo em public/fotos/ e preencha
// `arquivo` (ex.: "fachada.jpg"). Enquanto estiver vazio, o site mostra um
// espaço reservado com a dica de qual foto vai ali.

export const fotos = {
  fachada: {
    arquivo: "",
    alt: "Fachada da SuperDeli",
    dica: "Fachada da loja, de dia, na horizontal",
  },
  forno: {
    arquivo: "",
    alt: "Pães saindo do forno",
    dica: "Forno aberto com uma fornada de pão",
  },
  salao: {
    arquivo: "",
    alt: "Salão da SuperDeli",
    dica: "Salão com as mesas, na horizontal",
  },
  vitrine: {
    arquivo: "",
    alt: "Vitrine de pães e doces",
    dica: "Vitrine cheia, de frente",
  },
  equipe: {
    arquivo: "",
    alt: "Equipe da SuperDeli",
    dica: "Equipe reunida no balcão",
  },
  "pao-frances": {
    arquivo: "",
    alt: "Pão francês",
    dica: "Cesto de pão francês",
  },
  "pao-delicia": {
    arquivo: "",
    alt: "Pão delícia",
    dica: "Bandeja de pão delícia",
  },
  "bolo-aipim": {
    arquivo: "",
    alt: "Bolo de aipim",
    dica: "Fatia de bolo de aipim",
  },
  "buffet-cafe": {
    arquivo: "",
    alt: "Buffet do café da manhã",
    dica: "Buffet do café montado",
  },
  "buffet-almoco": {
    arquivo: "",
    alt: "Buffet do almoço",
    dica: "Buffet do almoço, de cima",
  },
  "buffet-raizes": {
    arquivo: "",
    alt: "Buffet de raízes e cuscuz",
    dica: "Travessas de aipim e cuscuz",
  },
  "mini-salgados": {
    arquivo: "",
    alt: "Mini salgados",
    dica: "Bandeja de mini salgados",
  },
  pudim: { arquivo: "", alt: "Pudim", dica: "Pudim inteiro com calda" },
  cestas: { arquivo: "", alt: "Cesta de café da manhã", dica: "Cesta montada, de frente" },
  "suco-laranja": {
    arquivo: "",
    alt: "Suco de laranja",
    dica: "Copo de suco com laranjas",
  },
  "cafe-leite": {
    arquivo: "",
    alt: "Café com leite",
    dica: "Xícara de café com leite",
  },
} satisfies Record<string, { arquivo: string; alt: string; dica: string }>;

export type FotoId = keyof typeof fotos;
