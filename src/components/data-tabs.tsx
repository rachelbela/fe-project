import { Tab, useDataTabsStore } from "@/store/dataTabs";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import SVGIcon from "@/components/ui/svgIcon";

function DataTabs() {
  const { tabs, activateTab, removeTab, curTab } = useDataTabsStore();
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
    navigate(pathname);
  };

  return (
    <div className="flex space-x-1">
      {tabs.map((v) => (
        <div
          key={v.pathname}
          className={`px-4 py-3 flex items-center space-x-1 hover:cursor-pointer ${
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
        </div>
      ))}
    </div>
  );
}

export default DataTabs;
