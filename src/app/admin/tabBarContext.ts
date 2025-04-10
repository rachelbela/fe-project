import { TabDataStore } from "@/store/tabDataSlice";
import { createContext } from "react";

export const TabDataContext = createContext<TabDataStore | null>(null);
