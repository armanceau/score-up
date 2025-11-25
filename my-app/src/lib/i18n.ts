import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import frCommun from "../locales/fr/commun.json";
import frNavigation from "../locales/fr/navigation.json";
import frJeu from "../locales/fr/jeu.json";
import frEquipes from "../locales/fr/equipes.json";
import frProfil from "../locales/fr/profil.json";
import frAuthentification from "../locales/fr/authentification.json";
import frConditionUtilisation from "../locales/fr/conditions-utilisation.json";
import frPolitiqueConfidentialite from "../locales/fr/politique-confidentialite.json";
import frFormulaire from "../locales/fr/formulaire.json";

import enCommun from "../locales/en/commun.json";
import enNavigation from "../locales/en/navigation.json";
import enJeu from "../locales/en/jeu.json";
import enEquipes from "../locales/en/equipes.json";
import enProfil from "../locales/en/profil.json";
import enAuthenfictication from "../locales/en/authentification.json";
import enConditionUtilisation from "../locales/en/conditions-utilisation.json";
import enPolitiqueConfidentialite from "../locales/en/politique-confidentialite.json";
import enFormulaire from "../locales/en/formulaire.json";

const resources = {
  fr: {
    commun: frCommun,
    navigation: frNavigation,
    jeu: frJeu,
    equipes: frEquipes,
    profil: frProfil,
    authentification: frAuthentification,
    conditionsUtilisation: frConditionUtilisation,
    politiqueConfidentialite: frPolitiqueConfidentialite,
    formulaire: frFormulaire,
  },
  en: {
    commun: enCommun,
    navigation: enNavigation,
    jeu: enJeu,
    equipes: enEquipes,
    profil: enProfil,
    authentification: enAuthenfictication,
    conditionsUtilisation: enConditionUtilisation,
    politiqueConfidentialite: enPolitiqueConfidentialite,
    formulaire: enFormulaire,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "fr", // Langue par défaut
    lng: "fr", // Langue initiale

    interpolation: {
      escapeValue: false, // React échappe déjà les valeurs
    },

    detection: {
      // Options pour la détection automatique de la langue
      order: ["localStorage", "navigator", "htmlTag"],
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage"],
    },

    // Configuration des namespaces
    defaultNS: "commun",
    ns: [
      "commun",
      "navigation",
      "jeu",
      "equipes",
      "profil",
      "authentification",
      "conditionsUtilisation",
      "politiqueConfidentialite",
      "formulaire",
    ],
  });

export default i18n;
