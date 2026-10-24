import { Particulas } from "@/components/Particulas";
import { AtalhosCategorias, Catalogo } from "@/components/Catalogo";
import { Foto } from "@/components/Foto";
import { Valor } from "@/components/AConfirmar";
import { Marca } from "@/components/Marca";
import { horarios, loja, lojas, refeicoes } from "@/content/loja";
import type { FotoId } from "@/content/fotos";

const galeria: { id: FotoId; forma: string }[] = [
  { id: "fachada", forma: "larga" },
  { id: "vitrine", forma: "alta" },
  { id: "salao", forma: "" },
  { id: "equipe", forma: "larga" },
  { id: "buffet-almoco", forma: "" },
];

export default function Home() {
  const whats = loja.whatsapp.valor;
  const insta = loja.instagram.valor;
  const instaUrl = `https://instagram.com/${insta}`;
  return (
    <>
      <Particulas />
      <a className="pular" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="topo">
        <div className="topo-info">
          <span>Seg a sáb, 6h às 21h</span>
          <span className="so-largo">Domingos e feriados a partir das 6h30</span>
          <a href={instaUrl} target="_blank" rel="noopener noreferrer">
            @{insta}
          </a>
        </div>
        <div className="topo-linha">
          <a className="logo" href="#inicio" aria-label="SuperDeli, início">
            <Marca />
          </a>
          <nav aria-label="Seções">
            <a href="#padaria">Padaria</a>
            <a href="#cardapio">Cardápio</a>
            <a href="#cestas">Cestas</a>
            <a href="#buffet">Buffet</a>
            <a href="#fotos">A loja</a>
          </nav>
          <a className="botao botao-topo" href="#visite">
            Como chegar
          </a>
        </div>
      </header>

      <main id="conteudo">
        <section id="inicio" className="hero" data-forma="marca" data-tom="escuro">
          <h1 className="marca-hero">
            SuperDeli<span className="sr"> — delicatessen em Conceição do Jacuípe</span>
          </h1>
          <div className="hero-base">
            <div className="hero-texto">
              <p className="hero-slogan">{loja.slogan}</p>
              <p>
                Pães e doces, buffet do café da manhã ao almoço e cestas para presentear, em {loja.cidade}.
              </p>
            </div>
            <div className="acoes">
              <a className="botao" href="#cardapio">
                Ver o cardápio
              </a>
              <a className="botao botao-linha" href="#visite">
                Nossas lojas
              </a>
            </div>
          </div>
        </section>

        <section className="bloco claro atalhos-bloco" data-forma="poeira" data-tom="claro">
          <h2 className="sr">Categorias</h2>
          <AtalhosCategorias />
        </section>

        <section id="padaria" className="bloco padaria" data-forma="trigo" data-tom="escuro">
          <div className="coluna">
            <h2>Na SuperDeli tem pão francês fresquinho.</h2>
            <p className="abre">
              Pão francês, pão delícia, bolos e salgados saindo da nossa cozinha ao longo do dia. Passe cedo para o
              café ou no fim da tarde para levar para casa.
            </p>
            <Foto id="forno" className="foto-forno" />
          </div>
        </section>

        <section id="cardapio" className="bloco claro" data-tom="claro">
          <div className="cabeca" data-forma="pao" data-tom="claro">
            <h2>Cardápio</h2>
            <p className="abre">O que mais sai no balcão e no buffet. Os preços estão na loja.</p>
          </div>
          <div data-forma="poeira" data-tom="claro">
            <Catalogo />
          </div>
        </section>

        <section id="cestas" className="bloco cestas" data-forma="presente" data-tom="ouro">
          <div className="coluna coluna-direita">
            <div className="texto">
              <h2>Cestas para presentear.</h2>
              <p className="abre">
                Café da manhã, aniversário ou datas especiais: a gente monta a cesta. Veja as opções e encomende
                pelo Instagram.
              </p>
              <div className="acoes">
                <a className="botao botao-escuro" href={instaUrl} target="_blank" rel="noopener noreferrer">
                  Encomendar pelo Instagram
                </a>
                <a className="botao botao-linha" href={loja.links} target="_blank" rel="noopener noreferrer">
                  Outros contatos
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="buffet" className="bloco buffet" data-forma="prato" data-tom="escuro">
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
            <p className="abre">Um pouco do salão, da vitrine e de quem faz a SuperDeli.</p>
          </div>
          <div className="mosaico" data-forma="poeira" data-tom="claro">
            {galeria.map((g) => (
              <Foto key={g.id} id={g.id} className={g.forma} />
            ))}
          </div>
        </section>

        <section id="visite" className="bloco visite" data-forma="pino" data-tom="escuro">
          <div className="coluna">
            <h2>Nossas lojas.</h2>
            <ul className="lojas">
              {lojas.map((l) => (
                <li key={l.nome}>
                  <h3>{l.nome}</h3>
                  <p>
                    <Valor info={l.endereco} vazio="Endereço a confirmar" />
                    <br />
                    {loja.cidade}
                  </p>
                  <a href={l.mapa} target="_blank" rel="noopener noreferrer">
                    Abrir no mapa
                  </a>
                </li>
              ))}
            </ul>
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
              <a className="botao" href={instaUrl} target="_blank" rel="noopener noreferrer">
                @{insta}
              </a>
              {whats && (
                <a className="botao botao-linha" href={`https://wa.me/${whats}`} target="_blank" rel="noopener noreferrer">
                  Falar no WhatsApp
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
