import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import PROFILE_EN from '../locales/en/profile.json'
import PROFILE_VI from '../locales/vi/profile.json'

const resources = {
    en: {
        profile: PROFILE_EN,
      translation: {
        "dashboard": "Dashboard",
        "users":"Users",
        "branchs":"Branchs",
        "products":"Products",
        "menu":"Menu",
        "settings": "Settings",
        "new product":"New Product",
        "new":"New Product",
        "newBranch":"New Branch"
      }
    },
    vi: {
      profile: PROFILE_VI,
      translation: {
        "dashboard": "Bảng Thống Kê",
        "users":"Người Dùng",
        "branchs":"Chi Nhánh",
        "products":"Sản Phẩm",
        "menu":"Thực Đơn",
        "settings": "Cài Đặt",
        "new product":"Sản Phẩm Mới",
        "new":"Sản Phẩm Mới",
        "new branch":"Thương Hiệu Mới",
        "new store":"Chi Nhánh Mới"
      }
    }
  };

  i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "vi",
    fallbackLng:"vi",
    ns:['profile','translation'],
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;