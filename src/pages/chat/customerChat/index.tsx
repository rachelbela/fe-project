import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { faker } from "@faker-js/faker";
import UncertainHeightVirtualList, {
  VariableSizeListRef,
} from "@/components/uncertain-height-virtual-list";
import { addMessageToChatHistory } from "@/store/chatHistoryDB";
import SearchModule from "./search-module";
import { CHAT_DATA } from "@/_mock/assets";

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

const customerInfo = {
  name: faker.person.fullName(),
  avatar: faker.image.avatar(),
  id: 1,
};

function CustomerChat() {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>("");
  const listRef = useRef<VariableSizeListRef | null>(null);

  // 存放高度数组
  const heightsRef = useRef<{ [key: number]: number }>({});
  // 预估高度
  const estimatedItemHeight = 150;

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
    addMessageToChatHistory({ id: 1, history: CHAT_DATA });
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleJumpToIndex = (index: number) => {
    if (listRef.current) {
      listRef.current.scrollToIndex(index);
    }
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
            itemCount={CHAT_DATA.length}
            itemData={CHAT_DATA}
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
          <SearchModule handleJumpToIndex={handleJumpToIndex} />
        </div>
      </div>
    </>
  );
}

export default CustomerChat;
