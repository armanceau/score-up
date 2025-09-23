"use client";

import { createContext, useContext, ReactNode } from "react";
import { Jeu } from "./jeux";

interface JeuxContextValue {
  jeux: Jeu[];
}

const JeuxContext = createContext<JeuxContextValue | undefined>(undefined);

export function JeuxProvider({
  children,
  jeuxInitiaux,
}: {
  children?: ReactNode;
  jeuxInitiaux: Jeu[];
}) {
  return (
    <JeuxContext.Provider value={{ jeux: jeuxInitiaux }}>
      {children}
    </JeuxContext.Provider>
  );
}

export function useJeux() {
  const context = useContext(JeuxContext);
  if (!context) throw new Error("useJeux must be used within JeuxProvider");
  return context;
}
