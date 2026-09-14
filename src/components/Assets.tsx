"use client";

import { createContext, useContext } from "react";
import type { Manifest } from "@/lib/assets";

const AssetsContext = createContext<Manifest>({ spin: 0, stills: [] });

export function AssetsProvider({
  value,
  children,
}: {
  value: Manifest;
  children: React.ReactNode;
}) {
  return (
    <AssetsContext.Provider value={value}>{children}</AssetsContext.Provider>
  );
}

export function useAssets(): Manifest {
  return useContext(AssetsContext);
}
