import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function CustomerChat() {
  const [value, setValue] = useState<string>("");
  const [lang, setLang] = useState("zh");
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSend = () => {};
  return (
    <div className="flex flex-1 flex-col border w-120 bg-white p-8">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6"></div>
        <div style={{ height: "480px" }}></div>
      </div>
      <div className="w-10 mb-2 text-sm">
        <Select value={lang} onValueChange={setLang}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="选择一种语言" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="zh">中文</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="hk">繁体</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-[400px] flex space-x-2">
        <Input type="text" value={value} onChange={handleInput} />
        <Button>发送</Button>
      </div>
    </div>
  );
}

export default CustomerChat;
