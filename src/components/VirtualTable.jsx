import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Table } from "antd";

const visibleHeight = 360;
const itemHeight = 54; // 根据table tr的高度设置
const visibleCount = Math.ceil(visibleHeight / itemHeight) + 2;
const totalCount = 100;

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    ellipsis: true,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 150,
    ellipsis: true,
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
    ellipsis: true,
  },
]

const dataSource = Array.from(Array(totalCount).fill({
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号',
}), (item, index) => ({ ...item, name: `${item.name}${index}`, key: index }));

export default function VirtualTable() {
  const [range, setRange] = useState([0, 10]);
  const tableRef = useRef();

  const renderList = useMemo(() => {
    const [start, end] = range;
    return dataSource.slice(start, end)
  }, [range])

  const scrollEvent = useCallback((e) => {
    const startIdx = Math.floor(e.target.scrollTop / itemHeight);
    const endIdx = startIdx + visibleCount;
    setRange([startIdx, endIdx]);
    const offset = startIdx * itemHeight;
    tableRef.current.style.top = offset + "px";
  }, []);

  useEffect(() => {
    const parentNode = document.querySelector('.ant-table-body');
    const contentNode = document.querySelector('.ant-table-body table');
    tableRef.current = contentNode;
    const placeholderWrapper = document.createElement('div');
    placeholderWrapper.style.height = itemHeight * totalCount + 'px'
    parentNode.appendChild(placeholderWrapper);
    parentNode.style.position = 'relative';
    contentNode.style.position = 'absolute';
    contentNode.style.top = 0;
    contentNode.style.left = 0;
    parentNode.addEventListener('scroll', scrollEvent)
    return () => {
      parentNode.removeChild(placeholderWrapper);
      parentNode.removeEventListener('scroll', scrollEvent)
    }
  }, [scrollEvent]);
  return (
    <Table dataSource={renderList} columns={columns} pagination={false} scroll={{ y: visibleHeight }} bordered />
  );
}
