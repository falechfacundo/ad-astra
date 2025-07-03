import { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [i18n] = useTranslation("about");

  useEffect(() => {
    const navigatorLanguage = navigator.language.startsWith("es") ? "es" : "en";
    i18n.changeLanguage(navigatorLanguage);
    setLanguage(navigatorLanguage);
  }, [i18n]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
