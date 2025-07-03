import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import about_en from "./en/about.json";
import about_es from "./es/about.json";
import faq_en from "./en/faq.json";
import faq_es from "./es/faq.json";
import header_es from "./es/components/header.json";
import header_en from "./en/components/header.json";
import footer_es from "./es/components/footer.json";
import footer_en from "./en/components/footer.json";
import hero_en from "./en/components/hero.json";
import hero_es from "./es/components/hero.json";
import projects_es from "./es/components/projects.json";
import projects_en from "./en/components/projects.json";
import applybtn_en from "./en/components/atoms/applybtn.json";
import applybtn_es from "./es/components/atoms/applybtn.json";
import development_es from "./es/components/atoms/development.json";
import development_en from "./en/components/atoms/development.json";
import services_es from "./es/components/atoms/services.json";
import services_en from "./en/components/atoms/services.json";
import references_es from "./es/components/references.json";
import references_en from "./en/components/references.json";
import contact_en from "./en/components/contact.json";
import contact_es from "./es/components/contact.json";
import velocityscroll_es from "./es/components/velocityscroll.json";
import velocityscroll_en from "./en/components/velocityscroll.json";
import careers_en from "./en/careers.json";
import careers_es from "./es/careers.json";
import frontend_es from "./es/components/frontend.json";
import frontend_en from "./en/components/frontend.json";
import servicescomp_en from "./en/components/servicescomp.json";
import servicescomp_es from "./es/components/servicescomp.json";
import newsletter_es from "./es/components/newsletter.json";
import newsletter_en from "./en/components/newsletter.json";

// Detectar el idioma del navegador
const browserLanguage = navigator.language || navigator.languages[0];
const defaultLanguage = browserLanguage.startsWith("es") ? "es" : "en";

const resources = {
  en: {
    about: about_en,
    faq: faq_en,
    careers: careers_en,
    header: header_en,
    footer: footer_en,
    hero: hero_en,
    projects: projects_en,
    references: references_en,
    contact: contact_en,
    velocityscroll: velocityscroll_en,
    applybtn: applybtn_en,
    development: development_en,
    servicescomp: servicescomp_en,
    services: services_en,
    newsletter: newsletter_en,
    frontend: frontend_en,
  },
  es: {
    about: about_es,
    faq: faq_es,
    careers: careers_es,
    header: header_es,
    footer: footer_es,
    hero: hero_es,
    projects: projects_es,
    references: references_es,
    contact: contact_es,
    velocityscroll: velocityscroll_es,
    applybtn: applybtn_es,
    development: development_es,
    servicescomp: servicescomp_es,
    services: services_es,
    newsletter: newsletter_es,
    frontend: frontend_es,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage, // idioma detectado
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

const I18nProvider = ({ children }) => {
  return <>{children}</>;
};

export default I18nProvider;
