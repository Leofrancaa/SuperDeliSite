// Dados da loja. Campos com `confirmado: false` aparecem no site com o selo
// "a confirmar": troque pelo valor real e mude para `true`.

export type Info = { valor: string; confirmado: boolean };

export const loja = {
  nome: "SuperDeli",
  slogan: "Deixamos seu dia mais gostoso.",
  cidade: "Conceição do Jacuípe, BA",
  endereco: { valor: "Rua Dois de Julho, Centro", confirmado: true } as Info,
  whatsapp: { valor: "", confirmado: false } as Info, // só números, ex.: 5575999999999
  instagram: { valor: "superdelibahia", confirmado: true } as Info,
  links: "https://linktr.ee/superdeliba",
  mapa: "https://www.google.com/maps/search/?api=1&query=SuperDeli+Rua+Dois+de+Julho+Concei%C3%A7%C3%A3o+do+Jacu%C3%ADpe+BA",
};

export const horarios: { dias: string; horas: Info }[] = [
  { dias: "Segunda a sábado", horas: { valor: "6h às 21h", confirmado: true } },
  { dias: "Domingos e feriados", horas: { valor: "6h30 às 11h e à tarde", confirmado: false } },
];

// Refeições do buffet, na ordem do dia.
export const refeicoes: { nome: string; texto: string; horas: Info }[] = [
  {
    nome: "Café da manhã",
    texto: "Cuscuz, pães, bolos, frutas e café para começar o dia, no buffet por quilo.",
    horas: { valor: "a partir das 6h", confirmado: false },
  },
  {
    nome: "Almoço",
    texto: "Comida caseira por quilo, com opções do dia.",
    horas: { valor: "11h às 14h30", confirmado: false },
  },
  {
    nome: "Raízes e cuscuz",
    texto: "Aipim, inhame, cuscuz e acompanhamentos para o fim da tarde.",
    horas: { valor: "fim da tarde", confirmado: false },
  },
];

// Unidades. A Loja 2 aparece nos posts do Instagram; complete a Loja 1.
export const lojas: { nome: string; endereco: Info; mapa: string }[] = [
  {
    nome: "Loja 2",
    endereco: { valor: "Rua Dois de Julho, Centro", confirmado: true },
    mapa: loja.mapa,
  },
  {
    nome: "Loja 1",
    endereco: { valor: "", confirmado: false },
    mapa: "https://www.google.com/maps/search/?api=1&query=SuperDeli+Concei%C3%A7%C3%A3o+do+Jacu%C3%ADpe+BA",
  },
];
