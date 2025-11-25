"use client";

import React, { useEffect } from "react";
import "../lib/i18n";

interface ClientI18nWrapperProps {
  children: React.ReactNode;
}

const ClientI18nWrapper: React.FC<ClientI18nWrapperProps> = ({ children }) => {
  useEffect(() => {}, []);

  return <>{children}</>;
};

export default ClientI18nWrapper;
