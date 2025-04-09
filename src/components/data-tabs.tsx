import { Tab, useDataTabsStore } from "@/store/dataTabs";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import SVGIcon from "@/components/ui/svgIcon";

function DataTabs() {
  const { tabs, addTab, removeTab } = useDataTabsStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("tabs====>", tabs);
    console.log("location====>", location);
    if (location?.state?.title) {
      const newTab = {
        url: location.pathname,
        title: location.state.title,
      };
      addTab(newTab);
    }
  }, [location]);

  const handleDelete = (tab: Tab) => {
    removeTab(tab);
    const lastTabUrl = tabs[tabs.length - 1].url;
    navigate(lastTabUrl);
  };

  return (
    <div className="flex space-x-1">
      {tabs.map((v) => (
        <div
          key={v.url}
          className="flex items-center space-x-1 hover:cursor-pointer"
        >
          <span>{v.title}</span>
          <div onClick={() => handleDelete(v)}>
            <SVGIcon name="delete" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default DataTabs;
