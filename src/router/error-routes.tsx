import SimpleLayout from "@/layout/simple";
import { lazy, Suspense } from "react";
import { Outlet, RouteObject } from "react-router";
import { Icon } from "@iconify/react";

const Page403 = lazy(() => import("@/pages/sys/error/Page403"));
const Page404 = lazy(() => import("@/pages/sys/error/Page404"));
const Page500 = lazy(() => import("@/pages/sys/error/Page500"));
/**
 * error routes
 * 403, 404, 500
 */
export const ERROR_ROUTE: RouteObject = {
  element: (
    <SimpleLayout>
      <Suspense
        fallback={
          <Icon icon="eos-icons:bubble-loading" width="24" height="24" />
        }
      >
        <Outlet />
      </Suspense>
    </SimpleLayout>
  ),
  children: [
    { path: "403", element: <Page403 /> },
    { path: "404", element: <Page404 /> },
    { path: "500", element: <Page500 /> },
  ],
};
