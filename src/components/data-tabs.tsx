import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import SVGIcon from "@/components/ui/svgIcon";
import { useContext } from "react";
import { TabDataContext } from "@/app/admin/tabBarContext";
import { useStore } from "zustand";

function DataTabs() {
  const store = useContext(TabDataContext);
  if (!store) throw new Error("Missing BearContext.Provider in the tree");
  const { tabs, activateTab, removeTab, curTab } = useStore(store);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    activateTab(location.pathname);
  }, [location]);

  const handleDelete = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    pathname: string
  ) => {
    e.stopPropagation();
    const { needSwitchRoute, toTab } = removeTab(pathname);
    if (needSwitchRoute && toTab) {
      navigate(toTab.pathname);
    }
  };

  const handleClick = (pathname: string) => {
    navigate({ pathname, search: location.search });
  };

  return (
    <div className="flex overflow-hidden">
      {tabs.map((v) => (
        <div
          key={v.pathname}
          className={`relative px-4 py-3 flex items-center space-x-1 hover:cursor-pointer ${
            v.pathname === curTab?.pathname ? "bg-[#F5F6F7]" : "bg-white"
          }`}
          onClick={() => {
            console.log("buhuo");
            handleClick(v.pathname);
          }}
        >
          <span className="text-[#666666] text-xs mr-2">{v.name}</span>
          {tabs.length > 1 && (
            <div onClick={(e) => handleDelete(e, v.pathname)}>
              <SVGIcon name="delete" size={12} />
            </div>
          )}
          {v.pathname !== curTab?.pathname && (
            <span className="absolute right-[1px] w-[1px] h-4 top-1/2 -translate-y-[50%] bg-[#ebebeb]"></span>
          )}
          {v.pathname === curTab?.pathname && (
            <>
              <div className="bg-[#F5F6F7] w-2 h-10 absolute left-[-8px] bottom-0">
                <span className="absolute top-0 left-0 bg-white w-2 h-10 rounded-br-xl"></span>
              </div>
              <div className="bg-[#F5F6F7] w-2 h-10 absolute right-[-8px] bottom-0 z-100">
                <span className="absolute top-0 left-0 w-2 h-10 bg-white rounded-bl-xl"></span>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default DataTabs;
