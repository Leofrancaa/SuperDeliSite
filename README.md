# Site da Superdeli

Site institucional da Superdeli (padaria, delicatessen e restaurante por quilo em
Conceição do Jacuípe, BA). Next.js gerando um site **estático** (pasta `out/`),
com um campo de partículas em three.js que forma a marca e muda de forma a cada
seção: espiga de trigo, pão, prato, molduras de foto e o pino do mapa.

## Rodar no computador

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # gera a pasta out/ (site estático)
```

## O que trocar antes de publicar

Tudo que é conteúdo fica em `src/content/`:

| Arquivo | O que tem |
|---|---|
| `loja.ts` | endereço, WhatsApp, Instagram, horários da loja e do buffet |
| `produtos.ts` | categorias e produtos do cardápio |
| `fotos.ts` | os espaços de foto do site |

- Campos com `confirmado: false` aparecem no site com o selo **a confirmar**.
  Coloque o valor real e mude para `true`.
- WhatsApp e Instagram só aparecem quando preenchidos.
- **Fotos:** coloque o arquivo em `public/fotos/` (ex.: `fachada.jpg`) e preencha
  `arquivo: "fachada.jpg"` em `fotos.ts`. Enquanto estiver vazio, o site mostra um
  espaço reservado com a dica de qual foto vai ali. Fotos na horizontal, até
  ~1600 px de largura e em JPG ficam leves.

## Publicar na Vercel

1. Suba esta pasta para o GitHub.
2. Na Vercel: **Add New → Project**, escolha o repositório e clique em **Deploy**.
   A Vercel reconhece o Next.js sozinha; não precisa configurar nada.

## Virar dinâmico depois

- Remova `output: "export"` de `next.config.ts`.
- Troque as listas de `src/content/` por dados do banco (ex.: o Supabase do painel),
  mantendo o mesmo formato, e os componentes continuam iguais.

## Acessibilidade e desempenho

- Sem WebGL, a marca aparece como texto normal e o site funciona igual.
- Com "reduzir movimento" ligado no sistema, as formas aparecem sem animação.
- Celular usa menos partículas; a animação pausa com a aba em segundo plano.
