import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { faker } from "@faker-js/faker";
import UncertainHeightVirtualList, {
  VariableSizeListRef,
} from "@/components/uncertain-height-virtual-list";

enum Role {
  CUSTOMER = "customer",
  STAFF = "staff",
}

interface Message {
  id: number;
  role: Role;
  content: string;
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
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const [list, setList] = useState<Message[]>(
    new Array(1000).fill(0).map((_, index) => ({
      id: index,
      role: ["customer", "staff"][Math.random() > 0.5 ? 0 : 1] as Role,
      content: faker.lorem.paragraph(),
    }))
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

  return (
    <div className="flex flex-1 flex-col border bg-white p-8">
      <UncertainHeightVirtualList
        ref={listRef}
        containerHeight={500}
        itemCount={list.length}
        itemData={list}
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
  );
}

export default CustomerChat;
