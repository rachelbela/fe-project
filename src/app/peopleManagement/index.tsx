import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Message } from "../customerChat";
function PeopleManagement() {
  const [value, setValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Message[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSearch = (keyword: string) => {
    // Perform search logic here
    console.log("Searching for:", keyword);
    // search keywords in indexedDB
    const request = indexedDB.open("customerChatHistory", 1);
    request.onerror = function () {
      console.log("Database open error");
    };
    request.onsuccess = function (event) {
      console.log("Database opened successfully");
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(["messages"], "readonly");
      const objectStore = transaction.objectStore("messages");
      const request = objectStore.get(1);

      request.onerror = function () {
        console.log("Transaction failed");
      };

      request.onsuccess = function () {
        if (request.result) {
          const history = request.result.history;
          const filteredHistory = history.filter((item: Message) =>
            item.content.toLowerCase().includes(keyword.toLowerCase())
          );
          console.log("Search results: ", filteredHistory);
          setFilteredData(filteredHistory);
        } else {
          console.log("No data record obtained");
        }
      };
    };
  };

  const renderFilteredDataItemContent = (content: string) => {
    const startIndex = content.toLowerCase().indexOf(value.toLowerCase());
    const endIndex = startIndex + value.length;
    const beforeKeyword = content.slice(0, startIndex);
    const keyword = content.slice(startIndex, endIndex);
    const afterKeyword = content.slice(endIndex);
    return (
      <>
        {beforeKeyword}
        <span className="text-red-500 font-bold">{keyword}</span>
        {afterKeyword}
      </>
    );
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="w-[200px] p-8">
          <Input value={value} onChange={handleChange} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {filteredData.map((item) => (
          <div key={item.id} className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">{item.create_at}</h3>
            <div>{renderFilteredDataItemContent(item.content)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PeopleManagement;
