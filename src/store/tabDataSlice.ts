import { routesTable } from "@/config/routes";
import { createStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export interface Tab {
  pathname: string;
  name: string;
}

interface State {
  tabs: Tab[];
  curTab: Tab | null;
}

interface Action {
  activateTab: (pathname: string) => void;
  removeTab: (pathname: string) => {
    needSwitchRoute: boolean;
    toTab: Tab | null;
  };
}

export type TabDataStore = ReturnType<typeof createTabDataStore>;
export const createTabDataStore = (initProps?: Partial<State>) => {
  const DEFAULT_PROPS: State = {
    tabs: [],
    curTab: null,
  };
  return createStore<State & Action>()(
    persist(
      (set, get) => ({
        ...DEFAULT_PROPS,
        ...initProps,
        activateTab: (pathname: string) => {
          const oldTabs = get().tabs;
          // 组装tab信息
          const name = routesTable.find((v) => v.pathname === pathname)?.name;
          if (!name) {
            console.log("找不到路由表中的信息");
            return oldTabs;
          }
          const newTab = {
            pathname,
            name,
          };
          // 检查是否新增tab
          const isExist = oldTabs.find((v) => v.pathname === pathname);
          if (isExist) {
            set(() => ({ curTab: newTab }));
          } else {
            set(() => ({ tabs: [...oldTabs, newTab], curTab: newTab }));
          }
        },
        removeTab: (pathname: string) => {
          const oldTabs = get().tabs;
          // 如果tab只剩一个，忽略
          if (oldTabs.length <= 1) {
            return {
              needSwitchRoute: false,
              toTab: get().curTab,
            };
          } else {
            // 检查删除的tab和当前tab的关系，如果是当前的tab,那么当前tab需要更新，否则当前tab不变
            const curTab = get().curTab;
            if (curTab?.pathname === pathname) {
              // 后面是否还有tab
              const curTabIndex = oldTabs.findIndex(
                (v) => v.pathname === pathname
              );
              if (curTabIndex < oldTabs.length - 1) {
                const next = oldTabs[curTabIndex + 1];
                const newTabs = oldTabs.filter((v) => v.pathname !== pathname);
                set({ tabs: newTabs, curTab: next });
                return {
                  needSwitchRoute: true,
                  toTab: get().curTab,
                };
              } else {
                const prev = oldTabs[curTabIndex - 1];
                const newTabs = oldTabs.filter((v) => v.pathname !== pathname);
                set({ tabs: newTabs, curTab: prev });
                return {
                  needSwitchRoute: true,
                  toTab: get().curTab,
                };
              }
            } else {
              const newTabs = oldTabs.filter((v) => v.pathname !== pathname);
              set({ tabs: newTabs });
              return {
                needSwitchRoute: false,
                toTab: get().curTab,
              };
            }
          }
        },
      }),
      {
        name: "tabData",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
};
