import type { NextConfig } from "next";

// Site estático (pasta out/). Para virar dinâmico no futuro (ex.: cardápio
// vindo do banco), basta remover `output: "export"`.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
