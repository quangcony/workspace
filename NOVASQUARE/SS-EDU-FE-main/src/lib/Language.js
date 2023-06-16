import { I18n } from "i18n-js";
import en from "../languages/English.json";
import ja from "../languages/Japanese.json";
import vie from "../languages/Vietnamese.json";

const i18n = new I18n();

i18n.fallbacks = true;
i18n.translations = { ja, en, vie };
// i18n.locale = "en";
i18n.missingTranslation = function (string) {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    return "Missing";
  }
};

export const i18nConfig = (langCode = "ja") => {
  i18n.locale = langCode;
};

export default i18n;