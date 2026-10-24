import { Emblema } from "@/components/Emblema";
import { Marca } from "@/components/Marca";
import { Catalogo } from "@/components/Catalogo";
import { Foto } from "@/components/Foto";
import { Valor } from "@/components/AConfirmar";
import { horarios, loja, refeicoes } from "@/content/loja";
import type { FotoId } from "@/content/fotos";

const galeria: { id: FotoId; forma: string }[] = [
  { id: "fachada", forma: "larga" },
  { id: "vitrine", forma: "alta" },
  { id: "salao", forma: "" },
  { id: "equipe", forma: "larga" },
  { id: "buffet-almoco", forma: "" },
];

const faixa = ["Pão francês fresquinho", "Doces", "Cestas", "Café da manhã", "Almoço por quilo", "Salgados"];

function Trigo() {
  return (
    <svg className="trigo" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21V8M12 9c-2.5 0-4-1.6-4-4 2.5 0 4 1.6 4 4Zm0 0c2.5 0 4-1.6 4-4-2.5 0-4 1.6-4 4ZM12 13.5c-2.5 0-4-1.6-4-4 2.5 0 4 1.6 4 4Zm0 0c2.5 0 4-1.6 4-4-2.5 0-4 1.6-4 4ZM12 18c-2.5 0-4-1.6-4-4 2.5 0 4 1.6 4 4Zm0 0c2.5 0 4-1.6 4-4-2.5 0-4 1.6-4 4Z" />
    </svg>
  );
}

export default function Home() {
  const whats = loja.whatsapp.valor;
  const insta = loja.instagram.valor;
  return (
    <>
      <a className="pular" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="topo">
        <a href="#inicio" className="topo-marca" aria-label="SuperDeli, início">
          <Marca />
        </a>
        <nav aria-label="Seções">
          <a href="#padaria">Padaria</a>
          <a href="#cardapio">Cardápio</a>
          <a href="#buffet">Buffet</a>
          <a href="#loja">A loja</a>
        </nav>
        <a className="botao botao-pequeno" href="#visite">
          Como chegar
        </a>
      </header>

      <main id="conteudo">
        <section id="inicio" className="hero">
          <div className="hero-texto">
            <h1>{loja.slogan}</h1>
            <p className="abre">
              Pães e doces, buffet do café da manhã ao almoço e cestas para presentear. Na {loja.endereco.valor},
              em {loja.cidade}.
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
          <Emblema />
          <ul className="hero-info">
            <li>
              <strong>Segunda a sábado</strong>
              <span>6h às 21h</span>
            </li>
            <li>
              <strong>Domingos e feriados</strong>
              <span>a partir das 6h30</span>
            </li>
            <li>
              <strong>Endereço</strong>
              <span>{loja.endereco.valor}</span>
            </li>
          </ul>
        </section>

        <div className="faixa" aria-hidden="true">
          <div className="faixa-trilho">
            {[0, 1].map((k) => (
              <span key={k} className="faixa-grupo">
                {faixa.map((f) => (
                  <span key={f}>
                    {f}
                    <Trigo />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <section id="padaria" className="padaria">
          <Foto id="forno" className="padaria-foto" />
          <div className="padaria-texto">
            <h2>Na SuperDeli tem pão francês fresquinho.</h2>
            <p className="abre">
              Pão francês, pão delícia, bolos e salgados saindo da nossa cozinha ao longo do dia. Passe cedo para o
              café ou no fim da tarde para levar para casa.
            </p>
          </div>
        </section>

        <section id="cardapio" className="secao">
          <div className="cabeca">
            <h2>Cardápio</h2>
            <p className="abre">O que mais sai no balcão e no buffet. Os preços estão na loja.</p>
          </div>
          <Catalogo />
        </section>

        <section id="buffet" className="secao secao-nevoa">
          <div className="duas-colunas">
            <div className="cabeca">
              <h2>Do café da manhã ao almoço.</h2>
              <p className="abre">Buffet por quilo: você monta o prato e paga pelo peso.</p>
            </div>
            <ol className="dia">
              {refeicoes.map((r) => (
                <li key={r.nome}>
                  <div>
                    <h3>{r.nome}</h3>
                    <p>{r.texto}</p>
                  </div>
                  <span className="hora">
                    <Valor info={r.horas} />
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="loja" className="secao">
          <div className="cabeca">
            <h2>A loja</h2>
            <p className="abre">Um pouco do salão, da vitrine e de quem faz a SuperDeli.</p>
          </div>
          <div className="mosaico">
            {galeria.map((g) => (
              <Foto key={g.id} id={g.id} className={g.forma} />
            ))}
          </div>
        </section>

        <section id="visite" className="visite">
          <div className="duas-colunas">
            <div>
              <h2>Venha à SuperDeli.</h2>
              <address>
                <Valor info={loja.endereco} />
                <br />
                {loja.cidade}
              </address>
              <div className="acoes">
                <a className="botao botao-ouro" href={loja.mapa} target="_blank" rel="noopener noreferrer">
                  Abrir no mapa
                </a>
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
                {whats && (
                  <a className="botao botao-linha" href={`https://wa.me/${whats}`} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
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
          </div>
        </section>
      </main>

      <footer className="rodape">
        <Marca />
        <p>{loja.slogan}</p>
        <a href={loja.links} target="_blank" rel="noopener noreferrer">
          Todos os contatos
        </a>
      </footer>
    </>
  );
}
