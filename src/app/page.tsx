import { Particulas } from "@/components/Particulas";
import { Catalogo } from "@/components/Catalogo";
import { Foto } from "@/components/Foto";
import { Valor } from "@/components/AConfirmar";
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
        <a className="logo" href="#inicio" aria-label="Superdeli, início">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M2 22 16 8M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94ZM7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94ZM11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94ZM20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4ZM11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0ZM15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0ZM19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
          </svg>
          superdeli
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
          <h1 className="marca">
            superdeli
            <span className="sr">
              {" "}
              — padaria e delicatessen em Conceição do Jacuípe
            </span>
          </h1>
          <div className="hero-base">
            <p className="hero-texto">
              {loja.descricao} em {loja.cidade}. Do pão da manhã ao cuscuz do
              fim da tarde.
            </p>
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
            <h2>Feito aqui, todo dia.</h2>
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
          data-tom="folha"
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
              Um pouco do salão, da vitrine e de quem faz a Superdeli.
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
            <h2>Venha à Superdeli.</h2>
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
                  Instagram
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="rodape">
        <span>Superdeli, {loja.cidade}</span>
        <a href="#inicio">Voltar ao topo</a>
      </footer>
    </>
  );
}
