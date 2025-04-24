import { useRef } from "react";
import { BreadcrumbDataContext } from "../../context/breadcrumbContext";
import { createBreadcrumbDataStore } from "@/store/breadcrumbSlice";
import { SiteHeader } from "./site-header";

function HeaderIndex() {
  const breadcrumbData = JSON.parse(
    sessionStorage.getItem("breadcrumbData")!
  )?.state;
  const breadcrumbStore = useRef(
    createBreadcrumbDataStore(breadcrumbData)
  ).current;
  return (
    <BreadcrumbDataContext.Provider value={breadcrumbStore}>
      <SiteHeader />
    </BreadcrumbDataContext.Provider>
  );
}

export default HeaderIndex;
