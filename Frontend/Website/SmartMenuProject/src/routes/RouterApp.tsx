import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

interface RouteItem {
  path: string;
  component: () => JSX.Element;
  layout?: React.ComponentType<any> | null;
}

export const publicRoutes: RouteItem[] = [
  { path: "/", component: Login, layout: null },
  { path: "/home", component: Home }
];

export const privateRoutes = [];
