import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

function MultiLanguage() {
  const { i18n, t } = useTranslation();
  const handleToggleLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex space-x-0.5 items-center">
          <Icon icon="flowbite:language-outline" width="18" height="18" />
          <Icon icon="icon-park-outline:down" width="18" height="18" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            handleToggleLanguage("zh");
          }}
        >
          {t("chinese")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleToggleLanguage("en");
          }}
        >
          {t("english")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleToggleLanguage("ja");
          }}
        >
          {t("japanese")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleToggleLanguage("ko");
          }}
        >
          {t("korean")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MultiLanguage;
