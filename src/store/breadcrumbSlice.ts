import { routesTable } from "@/config/routes";
import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Breadcrumb {
  name: string;
  url: string;
}

interface State {
  breadcrumbData: Breadcrumb[];
}

interface Action {
  activateBreacrumb: (pathname: string) => void;
}

export type BreadcrumbDataStore = ReturnType<typeof createBreadcrumbDataStore>;
export const createBreadcrumbDataStore = (initProps?: Partial<State>) => {
  const DEFAULT_PROPS: State = {
    breadcrumbData: [],
  };
  return createStore<State & Action>()(
    persist(
      (set) => ({
        ...DEFAULT_PROPS,
        ...initProps,
        activateBreacrumb: (pathname: string) => {},
      }),
      {
        name: "breadcrumbData",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
};
