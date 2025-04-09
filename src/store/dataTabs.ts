import { create } from "zustand";
export interface Tab {
  url: string;
  title: string;
}

interface State {
  tabs: Tab[];
}

interface Action {
  addTab: (tab: Tab) => void;
  removeTab: (tab: Tab) => void;
}

const initialState = {
  tabs: [],
};

export const useDataTabsStore = create<State & Action>((set, get) => ({
  ...initialState,
  addTab: (tab: Tab) => {
    const oldTabs = get().tabs;
    const isExist = oldTabs.find((v) => v.url === tab.url);
    const newTabs = isExist ? oldTabs : [...oldTabs, tab];
    set(() => ({ tabs: newTabs }));
  },
  removeTab: (tab: Tab) => {
    const newTabs = get().tabs.filter((v) => v.url !== tab.url);
    set({ tabs: newTabs });
  },
}));
