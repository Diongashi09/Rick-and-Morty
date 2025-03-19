"use client";

import { translate } from "../utils/translate";

export default function Footer({ language, switchLanguage }) {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 text-center border-t border-gray-700">
      <span className="mr-2">{translate("language", language)}: </span>
      <button
        onClick={switchLanguage}
        className="px-3 py-1 bg-gray-700 text-white rounded"
      >
        {language === "en" ? "🇩🇪 Deutsch" : "🇬🇧 English"}
      </button>
    </footer>
  );
}
