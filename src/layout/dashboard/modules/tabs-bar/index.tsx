import { createTabDataStore } from "@/store/tabDataSlice";
import { useRef } from "react";
import { TabDataContext } from "../../context/tabBarContext";
import Tabs from "./tabs";

function TabsBar() {
  const tabData = JSON.parse(sessionStorage.getItem("tabData")!)?.state;
  const tabbarStore = useRef(createTabDataStore(tabData)).current;
  return (
    <TabDataContext.Provider value={tabbarStore}>
      <Tabs />
    </TabDataContext.Provider>
  );
}

export default TabsBar;
