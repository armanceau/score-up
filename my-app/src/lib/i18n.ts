import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import des traductions
import frCommun from '../locales/fr/commun.json';
import frNavigation from '../locales/fr/navigation.json';
import frJeu from '../locales/fr/jeu.json';
import frEquipes from '../locales/fr/equipes.json';
import frProfil from '../locales/fr/profil.json';

import enCommun from '../locales/en/commun.json';
import enNavigation from '../locales/en/navigation.json';
import enJeu from '../locales/en/jeu.json';
import enEquipes from '../locales/en/equipes.json';
import enProfil from '../locales/en/profil.json';

import esCommun from '../locales/es/commun.json';
import esNavigation from '../locales/es/navigation.json';
import esJeu from '../locales/es/jeu.json';
import esEquipes from '../locales/es/equipes.json';
import esProfil from '../locales/es/profil.json';

const resources = {
  fr: {
    commun: frCommun,
    navigation: frNavigation,
    jeu: frJeu,
    equipes: frEquipes,
    profil: frProfil,
  },
  en: {
    commun: enCommun,
    navigation: enNavigation,
    jeu: enJeu,
    equipes: enEquipes,
    profil: enProfil,
  },
  es: {
    commun: esCommun,
    navigation: esNavigation,
    jeu: esJeu,
    equipes: esEquipes,
    profil: esProfil,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr', // Langue par défaut
    lng: 'fr', // Langue initiale
    
    interpolation: {
      escapeValue: false, // React échappe déjà les valeurs
    },

    detection: {
      // Options pour la détection automatique de la langue
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },

    // Configuration des namespaces
    defaultNS: 'commun',
    ns: ['commun', 'navigation', 'jeu', 'equipes', 'profil'],
  });

export default i18n;