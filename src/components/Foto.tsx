import { fotos, type FotoId } from "@/content/fotos";

/** Foto da loja ou, enquanto não houver arquivo, um espaço reservado com a dica. */
export function Foto({
  id,
  className = "",
}: {
  id: FotoId;
  className?: string;
}) {
  const f = fotos[id];
  if (f.arquivo)
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={`foto ${className}`}
        src={`/fotos/${f.arquivo}`}
        alt={f.alt}
        loading="lazy"
      />
    );
  return (
    <div
      className={`foto foto-vazia ${className}`}
      role="img"
      aria-label={f.alt}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7h3l2-2h6l2 2h3v12H4z" />
        <circle cx="12" cy="13" r="3.5" />
      </svg>
      <span>{f.dica}</span>
    </div>
  );
}
