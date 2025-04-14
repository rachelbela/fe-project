import { useRef, useState } from "react";

const data = new Array(500).fill(0).map((_, i) => i);
function EasyVirtualList() {
  const viewHeight = useRef(400); // 可视容器高度
  const itemHeight = useRef(20); // 每一项的高度
  const itemCount = 500;

  const [showData, setShowData] = useState<number[]>(data.slice(0, 24));

  const scrollTop = useRef(0); // 初始滚动距离

  // 滚动事件
  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    // 获取滚动距离
    scrollTop.current = (e.target as HTMLElement).scrollTop;
    // 初始索引 = 滚动距离 / 每一项的高度
    let startIndex = Math.round(scrollTop.current / itemHeight.current);
    // 结束索引 = 初始索引 + 容器高度 / 每一项的高度
    let endIndex = startIndex + viewHeight.current / itemHeight.current;

    // 上下额外多渲染几个 item，解决滚动时来不及加载元素出现短暂的空白区域的问题
    // const paddingCount = 2;
    // startIndex = Math.max(startIndex - paddingCount, 0); // 处理越界情况
    // endIndex = Math.min(endIndex + paddingCount, itemCount - 1);

    console.log("startIndex,endIndex", startIndex, endIndex);

    // 根据初始索引和结束索引，截取数据
    const showData = data.slice(startIndex, endIndex);
    setShowData(showData);
  };

  return (
    <div
      className="w-50 border overflow-y-scroll relative"
      style={{ height: viewHeight.current + "px" }}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: itemHeight.current * data.length + "px",
        }}
      ></div>
      <div
        className="absolute top-0 left-0"
        style={{ transform: `translateY(${scrollTop.current}px)` }}
      >
        {showData.map((v) => (
          <div style={{ height: itemHeight.current + "px" }} key={v}>
            {v}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EasyVirtualList;
