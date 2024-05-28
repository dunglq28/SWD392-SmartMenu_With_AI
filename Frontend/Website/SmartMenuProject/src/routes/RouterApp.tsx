import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Products from "../pages/Products";
import Branch from "../pages/Branch";
import Sales from "../pages/Sales";
import Menu from "../pages/Menu";
import Services from "../pages/Services";
import Settings from "../pages/Settings";
import New from "../pages/New";

interface RouteItem {
  path: string;
  component: () => JSX.Element;
  layout?: React.ComponentType<any> | null;
}

export const publicRoutes: RouteItem[] = [
  { path: "/", component: Home, layout: null },
  { path: "/home", component: Home },
  { path: "/products", component: Products },
  { path: "/branch", component: Branch },
  { path: "/sales", component: Sales },
  { path: "/menu", component: Menu },
  { path: "/services", component: Services },
  { path: "/settings", component: Settings },
  { path: "/new", component: New },
];

export const privateRoutes = [];
