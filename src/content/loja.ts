// Dados da loja. Troque os campos marcados com `confirmado: false` pelos
// valores reais e mude para `true` (o selo "a confirmar" some do site).

export type Info = { valor: string; confirmado: boolean };

export const loja = {
  nome: "Superdeli",
  descricao: "Padaria, delicatessen e restaurante por quilo",
  cidade: "Conceição do Jacuípe, Bahia",
  endereco: { valor: "Endereço da loja, Centro", confirmado: false } as Info,
  whatsapp: { valor: "", confirmado: false } as Info, // só números, ex.: 5575999999999
  instagram: { valor: "", confirmado: false } as Info, // sem @, ex.: superdeli
  mapa: "https://www.google.com/maps/search/?api=1&query=Superdeli+Concei%C3%A7%C3%A3o+do+Jacu%C3%ADpe+BA",
};

export const horarios: { dias: string; horas: Info }[] = [
  { dias: "Segunda a sexta", horas: { valor: "6h às 21h", confirmado: false } },
  { dias: "Sábado", horas: { valor: "6h às 21h", confirmado: false } },
  {
    dias: "Domingo",
    horas: { valor: "6h às 13h e 16h às 20h", confirmado: false },
  },
];

// Refeições do buffet, na ordem do dia.
export const refeicoes: { nome: string; texto: string; horas: Info }[] = [
  {
    nome: "Café da manhã",
    texto:
      "Cuscuz, ovos, frutas, pães, bolos e café passado na hora, no buffet por quilo.",
    horas: { valor: "6h às 10h", confirmado: false },
  },
  {
    nome: "Almoço",
    texto:
      "Comida caseira por quilo: arroz, feijão, carnes, saladas e acompanhamentos do dia.",
    horas: { valor: "11h às 14h30", confirmado: false },
  },
  {
    nome: "Raízes e cuscuz",
    texto:
      "Aipim, inhame, batata-doce, cuscuz e o que combina com eles, para o fim do dia.",
    horas: { valor: "16h às 20h", confirmado: false },
  },
];
