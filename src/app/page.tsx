import { Particulas } from "@/components/Particulas";
import { Catalogo } from "@/components/Catalogo";
import { Foto } from "@/components/Foto";
import { Valor } from "@/components/AConfirmar";
import { Marca } from "@/components/Marca";
import { horarios, loja, refeicoes } from "@/content/loja";
import type { FotoId } from "@/content/fotos";

const galeria: { id: FotoId; forma: string }[] = [
  { id: "fachada", forma: "larga" },
  { id: "vitrine", forma: "alta" },
  { id: "salao", forma: "" },
  { id: "equipe", forma: "" },
  { id: "buffet-almoco", forma: "larga" },
];

export default function Home() {
  const whats = loja.whatsapp.valor;
  const insta = loja.instagram.valor;
  return (
    <>
      <Particulas />
      <a className="pular" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="topo">
        <a className="logo" href="#inicio" aria-label="SuperDeli, início">
          <Marca />
        </a>
        <nav aria-label="Seções">
          <a href="#padaria">Padaria</a>
          <a href="#cardapio">Cardápio</a>
          <a href="#buffet">Buffet</a>
          <a href="#fotos">Fotos</a>
        </nav>
        <a className="botao botao-topo" href="#visite">
          Como chegar
        </a>
      </header>

      <main id="conteudo">
        <section
          id="inicio"
          className="hero"
          data-forma="marca"
          data-tom="escuro"
        >
          <h1 className="marca-hero">
            SuperDeli
            <span className="sr">
              {" "}
              — padaria e delicatessen em Conceição do Jacuípe
            </span>
          </h1>
          <div className="hero-base">
            <div className="hero-texto">
              <p className="hero-slogan">{loja.slogan}</p>
              <p>
                Pães e doces, buffet do café da manhã ao almoço e cestas para
                presentear. Na {loja.endereco.valor}, em {loja.cidade}.
              </p>
            </div>
            <div className="acoes">
              <a className="botao" href="#cardapio">
                Ver o cardápio
              </a>
              <a className="botao botao-linha" href="#visite">
                Horários e endereço
              </a>
            </div>
          </div>
        </section>

        <section
          id="padaria"
          className="bloco padaria"
          data-forma="trigo"
          data-tom="escuro"
        >
          <div className="coluna">
            <h2>Na SuperDeli tem pão francês fresquinho.</h2>
            <p className="abre">
              Pão francês, pão delícia, bolos e salgados preparados na nossa
              cozinha. Passe cedo para o café ou no fim da tarde para levar pão
              quentinho para casa.
            </p>
            <Foto id="forno" className="foto-forno" />
          </div>
        </section>

        <section id="cardapio" className="bloco claro" data-tom="claro">
          <div className="cabeca" data-forma="pao" data-tom="claro">
            <h2>Cardápio</h2>
            <p className="abre">
              O que mais sai no balcão e no buffet. Os preços estão na loja.
            </p>
          </div>
          <div data-forma="poeira" data-tom="claro">
            <Catalogo />
          </div>
        </section>

        <section
          id="buffet"
          className="bloco buffet"
          data-forma="prato"
          data-tom="ouro"
        >
          <div className="coluna coluna-direita">
            <div className="texto">
              <h2>Buffet por quilo, do café ao fim da tarde.</h2>
              <p className="abre">Você monta o prato e paga pelo peso.</p>
              <ol className="dia">
                {refeicoes.map((r) => (
                  <li key={r.nome}>
                    <span className="hora">
                      <Valor info={r.horas} />
                    </span>
                    <div>
                      <h3>{r.nome}</h3>
                      <p>{r.texto}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="fotos" className="bloco claro" data-tom="claro">
          <div className="cabeca" data-forma="molduras" data-tom="claro">
            <h2>A loja</h2>
            <p className="abre">
              Um pouco do salão, da vitrine e de quem faz a SuperDeli.
            </p>
          </div>
          <div className="mosaico" data-forma="poeira" data-tom="claro">
            {galeria.map((g) => (
              <Foto key={g.id} id={g.id} className={g.forma} />
            ))}
          </div>
        </section>

        <section
          id="visite"
          className="bloco visite"
          data-forma="pino"
          data-tom="escuro"
        >
          <div className="coluna">
            <h2>Venha à SuperDeli.</h2>
            <address>
              <Valor info={loja.endereco} />
              <br />
              {loja.cidade}
            </address>
            <table className="horarios">
              <caption>Horário de funcionamento</caption>
              <tbody>
                {horarios.map((h) => (
                  <tr key={h.dias}>
                    <th scope="row">{h.dias}</th>
                    <td>
                      <Valor info={h.horas} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="acoes">
              <a
                className="botao"
                href={loja.mapa}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir no mapa
              </a>
              {whats && (
                <a
                  className="botao botao-linha"
                  href={`https://wa.me/${whats}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar no WhatsApp
                </a>
              )}
              {insta && (
                <a
                  className="botao botao-linha"
                  href={`https://instagram.com/${insta}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{insta}
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="rodape">
        <Marca />
        <span className="rodape-slogan">{loja.slogan}</span>
        <a href={loja.links} target="_blank" rel="noopener noreferrer">
          Todos os contatos
        </a>
        <a href="#inicio">Voltar ao topo</a>
      </footer>
    </>
  );
}
