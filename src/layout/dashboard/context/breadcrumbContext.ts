import { BreadcrumbDataStore } from "@/store/breadcrumbSlice";
import { createContext } from "react";

export const BreadcrumbDataContext = createContext<BreadcrumbDataStore | null>(
  null
);
