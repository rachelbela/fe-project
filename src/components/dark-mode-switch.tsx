import { useState } from "react";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Icon } from "@iconify/react";

function DarkModeSwitch() {
  const [dark, setDark] = useState(false);

  const handleToggle = (value: boolean) => {
    const el = document.getElementsByTagName("html")[0];
    setDark(value);
    if (el) {
      if (value) {
        el.classList.add("dark");
        el.classList.remove("light");
        el.setAttribute("style", "color-scheme: dark");
      } else {
        el.classList.add("light");
        el.classList.remove("dark");
        el.setAttribute("style", "color-scheme: light");
      }
    }
  };
  return (
    <div className="flex-1 flex justify-end items-center">
      <Switch
        id="airplane-mode"
        checked={dark}
        onCheckedChange={handleToggle}
        className="mr-1"
      />
      <Label htmlFor="airplane-mode">
        {dark ? (
          <Icon icon="tabler:moon" width="16" height="16" />
        ) : (
          <Icon icon="flowbite:sun-outline" width="16" height="16" />
        )}
      </Label>
    </div>
  );
}

export default DarkModeSwitch;
