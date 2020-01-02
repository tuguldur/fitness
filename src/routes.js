import Blank from "views/Blank.jsx";
import info from "views/info.jsx";
import users from "views/users.jsx";
import extension from "views/extension.jsx";
import service from "views/service.jsx";

var dashRoutes = [
  {
    path: "/info",
    name: "Мэдээлэл шалгах",
    icon: "shopping_credit-card",
    component: info
  },
  {
    path: "/users",
    name: "Хэрэглэгч",
    icon: "users_single-02",
    component: users
  },
  {
    path: "/extension",
    name: "Сунгалт",
    icon: "arrows-1_refresh-69",
    component: extension
  },
  {
    path: "/service",
    name: "Үйлчилгээ",
    icon: "objects_support-17",
    component: service
  },
  {
    path: "/type",
    name: "Төрөл",
    icon: "design_bullet-list-67",
    component: Blank
  },
  {
    path: "/calculate",
    name: "Тооцоо",
    icon: "business_money-coins",
    component: Blank
  },
  {
    path: "/notes",
    name: "Шинэчлэлтийн тэмдэглэл",
    icon: "files_paper",
    component: Blank
  },
  {
    pro: true,
    path: "/admin",
    name: "Админ",
    icon: "objects_diamond",
    component: Blank
  }
];
export default dashRoutes;
