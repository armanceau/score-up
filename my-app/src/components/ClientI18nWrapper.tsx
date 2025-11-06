'use client';

import React, { useEffect } from 'react';
import '../lib/i18n';

interface ClientI18nWrapperProps {
  children: React.ReactNode;
}

const ClientI18nWrapper: React.FC<ClientI18nWrapperProps> = ({ children }) => {
  useEffect(() => {
    // i18n est déjà initialisé via l'import
  }, []);

  return <>{children}</>;
};

export default ClientI18nWrapper;