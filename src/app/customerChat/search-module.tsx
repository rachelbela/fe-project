import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Command, CommandInput } from "@/components/ui/command";
import dayjs from "dayjs";
import { getChatHistory } from "@/store/chatHistoryDB";
import { Message } from ".";
import chatData from "@/mock/chatData.json";
import UncertainHeightVirtualList, {
  VariableSizeListRef,
} from "@/components/uncertain-height-virtual-list";

function Item({
  index,
  data,
  keyword,
  setHeight,
  onClick,
}: {
  index: number;
  data: Message[];
  keyword: string;
  setHeight: (index: number, height: number) => void;
  onClick: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const item = data[index];

  useEffect(() => {
    if (itemRef.current) {
      // 计算高度
      setHeight(index, itemRef.current.getBoundingClientRect().height);
    }
  }, [index, setHeight]);

  const renderFilteredDataItemContent = (content: string, keyword: string) => {
    const startIndex = content.toLowerCase().indexOf(keyword.toLowerCase());
    const endIndex = startIndex + keyword.length;
    const beforeKeyword = content.slice(0, startIndex);
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
    <div
      ref={itemRef}
      key={index}
      className={`flex items-center gap-2 hover:bg-gray-100 cursor-pointer p-2 rounded-md`}
      onClick={onClick}
    >
      <div>
        id: {item.id}
        <div className="text-xs text-gray-500 ">
          {dayjs(item.create_at).format("YYYY-MM-DD HH:MM:ss")}
        </div>
        {renderFilteredDataItemContent(item.content, keyword)}
      </div>
    </div>
  );
}

function SearchModule({
  handleJumpToIndex,
}: {
  handleJumpToIndex: (index: number) => void;
}) {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>(
    chatData as Message[]
  );
  const listRef = useRef<VariableSizeListRef>(null);
  const heightsRef = useRef<number[]>([]);
  const estimatedItemHeight = 40;

  const setHeight = (index: number, height: number) => {
    if (heightsRef.current[index] !== height) {
      heightsRef.current[index] = height;
      if (listRef.current) {
        listRef.current.resetHeight();
      }
    }
  };
  const getHeight = (index: number) => {
    return heightsRef.current[index] || estimatedItemHeight;
  };

  const handleSearch = (keyword: string, customerId: number = 1) => {
    // Perform search logic here
    setKeyword(keyword);
    getChatHistory((messages) => {
      const currentHistory = messages.find(
        (item: Message) => item.id === customerId
      );
      const filteredHistory = currentHistory.history.filter((item: Message) =>
        item.content.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredData(filteredHistory);
    });
  };

  const handleOnClick = (index: number) => {
    handleJumpToIndex(index);
  };

  return (
    <Command>
      <CommandInput
        value={keyword}
        placeholder={t("search-chat-hisory")}
        onValueChange={handleSearch}
      />
      {keyword.length !== 0 && (
        <div>
          {filteredData?.length === 0 ? (
            <div>{t("no-results-found")}</div>
          ) : (
            <UncertainHeightVirtualList
              ref={listRef}
              containerHeight={560}
              itemCount={filteredData.length}
              itemData={filteredData}
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
                  <div style={{ ...style }}>
                    <Item
                      index={index}
                      data={data}
                      setHeight={setHeight}
                      keyword={keyword}
                      onClick={() => handleOnClick(index)}
                    />
                  </div>
                );
              }}
            </UncertainHeightVirtualList>
          )}
        </div>
      )}
    </Command>
  );
}

export default SearchModule;
