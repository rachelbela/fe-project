import ErrorBoundary from "@/components/error-boundary";
import PageError from "@/pages/sys/error/PageError";
import Login from "@/pages/sys/login";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router";
import { ERROR_ROUTE } from "./error-routes";
import DashboardLayout from "@/layout/dashboard";
import { useUserPermission } from "@/store/userInfoSlice";

const PUBLIC_ROUTE: RouteObject = {
  path: "/login",
  element: (
    <ErrorBoundary fallback={<PageError />}>
      <Login />
    </ErrorBoundary>
  ),
};

function Router() {
  const permissions = useUserPermission();
  console.log("permissions", permissions);

  const permissionRoutes: RouteObject[] = [];
  const PROTECTED_ROUTE: RouteObject = {
    path: "/",
    element: <DashboardLayout />,
    children: [...permissionRoutes],
  };
  const routes = [PUBLIC_ROUTE, ERROR_ROUTE, PROTECTED_ROUTE];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default Router;
