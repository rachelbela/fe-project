import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

function DarkModeSwitch() {
  const [value, setValue] = useState(false);
  const htmlRef = useRef<HTMLHtmlElement | null>(null);

  useEffect(() => {
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setValue(isDarkMode);
    const el = document.getElementsByTagName("html")[0];
    if (el) {
      htmlRef.current = el;
    }
  }, []);

  useEffect(() => {
    if (htmlRef.current) {
      if (value) {
        // 黑暗模式
        htmlRef.current.classList.add("dark");
        htmlRef.current.classList.remove("light");
        htmlRef.current.setAttribute("style", "color-scheme: dark");
      } else {
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
          <Icon icon="tabler:moon" width="16" height="16" />
        ) : (
          <Icon icon="flowbite:sun-outline" width="16" height="16" />
        )}
      </Button>
    </div>
  );
}

export default DarkModeSwitch;
