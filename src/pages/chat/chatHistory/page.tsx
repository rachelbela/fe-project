import EasyVirtualList from "@/components/easy-virtual-list";
import { FixedSizeList } from "@/components/fixed-height-virtual-list";

function Item({ style, index }: { style: React.CSSProperties; index: number }) {
  return (
    <div
      className="item"
      style={{
        ...style,
        backgroundColor: index % 2 === 0 ? "burlywood" : "cadetblue",
      }}
    >
      {index}
    </div>
  );
}
function ChatHistory() {
  return (
    <div className="flex">
      定高transform版：
      <EasyVirtualList />
      定高往下推方案：
      <FixedSizeList containerHeight={400} itemCount={500} itemHeight={20}>
        {Item}
      </FixedSizeList>
    </div>
  );
}

export default ChatHistory;
