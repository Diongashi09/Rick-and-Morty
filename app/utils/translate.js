export const translations = {
    en: require("../locales/en.json"),
    de: require("../locales/de.json")
  };
  
export const translate = (key, lang = "en") => {
  return translations[lang][key] || key; // Fallback to the key if translation is not found
}; 