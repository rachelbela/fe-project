import ErrorBoundary from "@/components/error-boundary";
import PageError from "@/pages/sys/error/PageError";
import Login from "@/pages/sys/login";
import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider,
} from "react-router";
import { ERROR_ROUTE } from "./error-routes";
import DashboardLayout from "@/layout/dashboard";
import Workbench from "@/pages/dashboard/workbench";
import Analysis from "@/pages/dashboard/analysis";
import UserManagement from "@/pages/userManagement";
import CostCenter from "@/pages/costCenter";
import SystemSetting from "@/pages/systemSetting";
import SystemHomepage from "@/pages/systemHomepage";
import MessageCenter from "@/pages/messageCenter";
import AddUser from "@/pages/userManagement/userAdd";
import MerchantCertification from "@/pages/merchantCertification";

const PUBLIC_ROUTE: RouteObject = {
  path: "/login",
  element: (
    <ErrorBoundary fallback={<PageError />}>
      <Login />
    </ErrorBoundary>
  ),
};

function Router() {
  const PROTECTED_ROUTE: RouteObject = {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        children: [
          {
            path: "/dashboard/workbench",
            element: <Workbench />,
          },
          {
            path: "/dashboard/analysis",
            element: <Analysis />,
          },
        ],
      },
      {
        path: "/userManagement",
        element: <UserManagement />,
      },
      {
        path: "/userManagement/addUser",
        element: <AddUser />,
      },
      {
        path: "//merchantCertification",
        element: <MerchantCertification />,
      },
      {
        path: "/costCenter",
        element: <CostCenter />,
      },
      {
        path: "/systemSetting",
        element: <SystemSetting />,
      },
      {
        path: "/systemHomepage",
        element: <SystemHomepage />,
      },
      {
        path: "/messageCenter",
        element: <MessageCenter />,
      },
    ],
  };
  const routes = [PUBLIC_ROUTE, ERROR_ROUTE, PROTECTED_ROUTE];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default Router;
