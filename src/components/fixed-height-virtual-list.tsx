import { useState } from "react";

export function FixedSizeList({
  containerHeight,
  itemHeight,
  itemCount,
  children,
}: {
  containerHeight: number;
  itemHeight: number;
  itemCount: number;
  children: React.FC<{ index: number; style: React.CSSProperties }>;
}) {
  // children 语义不好，赋值给 Component
  const Component = children;

  const contentHeight = itemHeight * itemCount; // 内容总高度
  const [scrollTop, setScrollTop] = useState(0); // 滚动位置 // 继续需要渲染的 item 索引有哪些
  let startIdx = Math.floor(scrollTop / itemHeight);
  let endIdx = Math.floor((scrollTop + containerHeight) / itemHeight); // 上下额外多渲染几个 item，解决滚动时来不及加载元素出现短暂的空白区域的问题

  const paddingCount = 2;
  startIdx = Math.max(startIdx - paddingCount, 0); // 处理越界情况
  endIdx = Math.min(endIdx + paddingCount, itemCount - 1);

  const top = itemHeight * startIdx; // 第一个渲染的 item 到顶部距离 // 需要渲染的 items
  const items = [];
  for (let i = startIdx; i <= endIdx; i++) {
    items.push(<Component key={i} index={i} style={{ height: itemHeight }} />);
  }

  return (
    <div
      style={{ height: containerHeight, overflow: "auto" }}
      onScroll={(e) => {
        const scrollTop = (e.target as HTMLElement).scrollTop;
        setScrollTop(scrollTop);
      }}
    >
      <div style={{ height: contentHeight }}>
        {/* 一个将 items 往下推到正确位置的空元素 */}
        <div style={{ height: top }}></div>
        {items}
      </div>
    </div>
  );
}
