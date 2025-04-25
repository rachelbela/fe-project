import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IconifyIcon from "@/components/ui/iconify-icon";
import { useTranslation } from "react-i18next";

function MultiLanguage() {
  const { i18n, t } = useTranslation();
  const handleToggleLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  console.log("当前语言===>", i18n.language);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex space-x-0.5 items-center">
          <span className="text-xs">{t(`sys:language.${i18n.language}`)}</span>
          <IconifyIcon icon="icon-park-outline:down" width="18" height="18" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            handleToggleLanguage("zh");
          }}
        >
          {t("sys:language.zh")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleToggleLanguage("en");
          }}
        >
          {t("sys:language.en")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleToggleLanguage("jp");
          }}
        >
          {t("sys:language.jp")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MultiLanguage;
