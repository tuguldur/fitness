import Blank from "views/Blank.jsx";
import Info from "views/Info.jsx";
import Users from "views/Users.jsx";
import Extension from "views/Extension.jsx";

var dashRoutes = [
  {
    path: "/info",
    name: "Мэдээлэл шалгах",
    icon: "shopping_credit-card",
    component: Info
  },
  {
    path: "/users",
    name: "Хэрэглэгч",
    icon: "users_single-02",
    component: Users
  },
  {
    path: "/extension",
    name: "Сунгалт",
    icon: "arrows-1_refresh-69",
    component: Extension
  },
  {
    path: "/service",
    name: "Үйлчилгээ",
    icon: "objects_support-17",
    component: Blank
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
