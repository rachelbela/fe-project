import { routesTable } from "@/config/routes";
import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Breadcrumb {
  name: string;
  link: string;
}

interface State {
  breadcrumbData: Breadcrumb[];
}

interface Action {
  activateBreacrumb: (breadcrumbData: Breadcrumb[]) => void;
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
        activateBreacrumb: (breadcrumbData: Breadcrumb[]) => {
          set({ breadcrumbData });
        },
      }),
      {
        name: "breadcrumbData",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
};
