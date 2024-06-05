import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard";
import User from "../pages/User";
import Branch from "../pages/Branch";
import Products from "../pages/Product";
import Menu from "../pages/Menu";
import Settings from "../pages/Setting";
import New from "../pages/New";

interface RouteItem {
  path: string;
  component: () => JSX.Element;
  layout?: React.ComponentType<any> | null;
}

export const publicRoutes: RouteItem[] = [
  { path: "/", component: Login, layout: null },
  { path: "/login", component: Login, layout: null },
  { path: "/dashboard", component: Dashboard },
  { path: "/users", component: User },
  { path: "/branch", component: Branch },
  { path: "/products", component: Products },
  { path: "/menu", component: Menu },
  { path: "/setting", component: Settings },
  { path: "/new", component: New },
];

export const privateRoutes: RouteItem[] = [

];
