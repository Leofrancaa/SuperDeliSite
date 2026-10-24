/**
 * Marca SuperDeli em texto (o "D" no quadrado dourado, como no letreiro).
 * Quando tiver o arquivo oficial do logo, troque por <img src="/logo.svg" />.
 */
export function Marca({ className = "" }: { className?: string }) {
  return (
    <span className={`marca ${className}`}>
      <span className="marca-nome">
        Super<span className="marca-d">D</span>eli
      </span>
      <span className="marca-sub">delicatessen</span>
    </span>
  );
}
