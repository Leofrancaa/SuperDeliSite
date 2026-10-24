import type { Info } from "@/content/loja";

/** Mostra o valor; se ainda não foi confirmado, marca com um selo discreto. */
export function Valor({
  info,
  vazio = "a confirmar",
}: {
  info: Info;
  vazio?: string;
}) {
  return (
    <>
      {info.valor || vazio}
      {!info.confirmado && info.valor && (
        <span className="selo"> a confirmar</span>
      )}
    </>
  );
}
