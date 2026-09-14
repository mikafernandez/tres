import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Das Entwickler-Abzeichen verdeckt die linke untere Ecke der Seite. */
  devIndicators: false,
  /* Ohne diese Angabe sucht Turbopack die Sperrdatei ausserhalb des Projekts. */
  turbopack: { root: __dirname },
};

export default nextConfig;
