import { useEffect, useRef, useState } from "react";
import { faker } from "@faker-js/faker";
import UncertainHeightVirtualList from "@/components/uncertain-height-virtual-list";

function Item({
  index,
  data,
  style,
  setHeight,
}: {
  index: number;
  data: string[];
  style: React.CSSProperties;
  setHeight: (index: number, height: number) => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemRef.current) {
      setHeight(index, itemRef.current.getBoundingClientRect().height);
    }
  }, [index, setHeight]);

  return (
    <div
      ref={itemRef}
      className="item"
      style={{
        ...style,
        backgroundColor: index % 2 === 0 ? "burlywood" : "cadetblue",
      }}
    >
      {data[index]}
    </div>
  );
}

function List() {
  const [list, setList] = useState<string[]>(
    new Array(1000).fill(0).map(() => faker.lorem.paragraph())
  );

  // 存放高度数组
  const heightsRef = useRef<{ [key: number]: number }>({});
  // 预估高度
  const estimatedItemHeight = 40;

  const setHeight = (index: number, height: number) => {
    if (heightsRef.current[index] !== height) {
      heightsRef.current[index] = height;
    }
  };

  const getHeight = (index: number) => {
    return heightsRef.current[index] ?? estimatedItemHeight;
  };

  return (
    <>
      列表项高度动态 - 虚拟列表实现
      <UncertainHeightVirtualList
        containerHeight={300}
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
          data: string[];
        }) => {
          return (
            <Item
              index={index}
              data={data}
              style={style}
              setHeight={setHeight}
            />
          );
        }}
      </UncertainHeightVirtualList>
    </>
  );
}

export default List;
