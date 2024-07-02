import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import các file ngôn ngữ
import translationAdminEN from "./locales/en/admin.json";
import translationAdminVI from "./locales/vi/admin.json";
import translationClientEN from "./locales/en/client.json";
import translationClientVI from "./locales/vi/client.json";
import translationCommonEN from "./locales/en/common.json";
import translationCommonVI from "./locales/vi/common.json";

const resources = {
  en: {
    admin: translationAdminEN,
    client: translationClientEN,
    common: translationCommonEN,
  },
  vi: {
    admin: translationAdminVI,
    client: translationClientVI,
    common: translationCommonVI,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi", // Ngôn ngữ mặc định
  fallbackLng: "vi", // Ngôn ngữ dự phòng
  ns: ['admin', 'client', 'common'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
