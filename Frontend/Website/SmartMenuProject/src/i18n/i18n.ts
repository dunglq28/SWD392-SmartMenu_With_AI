import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        //đây là namespace
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
      translation: {
        "dashboard": "Bảng Thống Kê",
        "users":"Người Dùng",
        "branchs":"Chi Nhánh",
        "products":"Sản Phẩm",
        "menu":"Thực Đơn",
        "settings": "Cài Đặt",
        "new product":"Sản Phẩm Mới",
        "new":"Sản Phẩm Mới",
        "new branch":"Thương Hiệu Mới"
      }
    }
  };

  i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "vi",
    fallbackLng:"vi",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;