import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

function DarkModeSwitch() {
  const [value, setValue] = useState<boolean>();
  const htmlRef = useRef<HTMLHtmlElement | null>(null);

  useEffect(() => {
    // 用户手动切换模式后会存在本地，保存用户习惯
    const userSelectTheme = localStorage.getItem("theme");
    if (userSelectTheme === "dark") {
      setValue(true);
    } else if (userSelectTheme === "light") {
      setValue(false);
    } else {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setValue(isDarkMode);
    }
    // 获取html根元素
    const el = document.getElementsByTagName("html")[0];
    if (el) {
      htmlRef.current = el;
    }
  }, []);

  useEffect(() => {
    if (htmlRef.current) {
      if (value === true) {
        // 黑暗模式
        htmlRef.current.classList.add("dark");
        htmlRef.current.classList.remove("light");
        htmlRef.current.setAttribute("style", "color-scheme: dark");
      } else if (value === false) {
        // 白天模式
        htmlRef.current.classList.add("light");
        htmlRef.current.classList.remove("dark");
        htmlRef.current.setAttribute("style", "color-scheme: light");
      }
    }
  }, [value, htmlRef.current]);

  const handleToggle = () => {
    const newValue = !value;
    setValue(newValue);
    localStorage.setItem("theme", newValue ? "dark" : "light");
  };
  return (
    <div className="flex justify-end items-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        className="w-7 h-7"
      >
        {value ? (
          <Icon icon="flowbite:sun-outline" width="16" height="16" />
        ) : (
          <Icon icon="tabler:moon" width="16" height="16" />
        )}
      </Button>
    </div>
  );
}

export default DarkModeSwitch;
