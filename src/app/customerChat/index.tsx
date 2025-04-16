import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { faker } from "@faker-js/faker";
import UncertainHeightVirtualList, {
  VariableSizeListRef,
} from "@/components/uncertain-height-virtual-list";
import chatData from "@/mock/chatData.json";
import { addMessageToChatHistory, getChatHistory } from "@/store/chatHistoryDB";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import dayjs from "dayjs";

enum Role {
  CUSTOMER = "customer",
  STAFF = "staff",
}

export interface Message {
  id: number;
  role: Role;
  content: string;
  create_at: number;
}

function Item({
  index,
  data,
  setHeight,
}: {
  index: number;
  data: Message[];
  setHeight: (index: number, height: number) => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const item = data[index];

  useEffect(() => {
    if (itemRef.current) {
      // 计算高度
      setHeight(index, itemRef.current.getBoundingClientRect().height);
    }
  }, [index, setHeight]);

  return (
    <div ref={itemRef} key={index} className={`flex items-center`}>
      <div
        className={`${
          item.role === Role.CUSTOMER
            ? "bg-blue-100 justify-start"
            : "bg-green-100 justify-end"
        } mb-4 rounded-lg p-4 text-sm`}
      >
        {item.content}
      </div>
    </div>
  );
}

function CustomerChat() {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [customerInfo] = useState({
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    id: 1,
  });
  const [filteredData, setFilteredData] = useState<Message[]>(
    chatData as Message[]
  );
  const listRef = useRef<VariableSizeListRef | null>(null);

  // 存放高度数组
  const heightsRef = useRef<{ [key: number]: number }>({});
  // 预估高度
  const estimatedItemHeight = 40;

  const setHeight = (index: number, height: number) => {
    if (heightsRef.current[index] !== height) {
      heightsRef.current[index] = height;
      listRef.current?.resetHeight();
    }
  };

  const getHeight = (index: number) => {
    return heightsRef.current[index] ?? estimatedItemHeight;
  };

  useEffect(() => {
    addMessageToChatHistory({ id: 1, history: chatData });
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearch = (keyword: string) => {
    // Perform search logic here
    setKeywords(keyword);
    getChatHistory((messages) => {
      const currentHistory = messages.find(
        (item: Message) => item.id === customerInfo.id
      );
      const filteredHistory = currentHistory.history.filter((item: Message) =>
        item.content.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredData(filteredHistory);
    });
  };

  const renderFilteredDataItemContent = (content: string) => {
    const startIndex = content.toLowerCase().indexOf(keywords.toLowerCase());
    const endIndex = startIndex + keywords.length;
    const beforeKeyword = content.slice(0, startIndex);
    const keyword = content.slice(startIndex, endIndex);
    const afterKeyword = content.slice(endIndex);
    return (
      <div className="text-xs">
        {beforeKeyword}
        <span className="text-red-500 font-bold">{keyword}</span>
        {afterKeyword}
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-1 flex-row   ">
        <div className="flex flex-1 flex-col m-8 p-4 bg-white border-gray-200 border-1 border-solid rounded-lg shadow-md">
          <div className="mb-4 flex items-center border-b-1 pb-2 justify-between">
            <div className="flex space-x-2 items-center">
              <img
                src={customerInfo.avatar}
                alt=""
                className="w-6 h-6 rounded-full"
              />
              <div className="text-sm">{customerInfo.name}</div>
            </div>
          </div>
          <UncertainHeightVirtualList
            ref={listRef}
            containerHeight={500}
            itemCount={chatData.length}
            itemData={chatData}
            getItemHeight={getHeight}
          >
            {({
              index,
              style,
              data,
            }: {
              index: number;
              style: React.CSSProperties;
              data: Message[];
            }) => {
              return (
                <div
                  className="w-1/3"
                  style={{
                    ...style,
                    right: data[index].role === Role.CUSTOMER ? "auto" : 0,
                    left: data[index].role === Role.CUSTOMER ? 0 : "auto",
                  }}
                >
                  <Item index={index} data={data} setHeight={setHeight} />
                </div>
              );
            }}
          </UncertainHeightVirtualList>
          <div className="mt-8 flex space-x-2">
            <Input type="text" value={value} onChange={handleInput} />
            <Button>{t("send")}</Button>
          </div>
        </div>
        <div className="border my-8 mr-8 p-4 rounded-lg shadow-md bg-white w-[250px]">
          <Command>
            <CommandInput
              value={keywords}
              placeholder={t("search-chat-hisory")}
              onValueChange={handleSearch}
            />
            {keywords.length !== 0 && (
              <CommandList className="max-h-[560px] overflow-y-auto">
                {filteredData?.length === 0 && (
                  <CommandEmpty>{t("no-results-found")}</CommandEmpty>
                )}
                <CommandGroup heading={t("search-result")}>
                  {filteredData?.map((item) => (
                    <CommandItem key={item.id}>
                      <div>
                        <div className="text-xs text-gray-500 ">
                          {dayjs(item.create_at).format("YYYY-MM-DD HH:MM:ss")}
                        </div>
                        {renderFilteredDataItemContent(item.content)}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            )}
          </Command>
        </div>
      </div>
    </>
  );
}

export default CustomerChat;
