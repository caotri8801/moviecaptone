import React, { Fragment } from 'react';
import { Table } from 'antd';
import { Input, Space } from 'antd';
import { useSelector } from 'react-redux';
import { render } from 'react-dom';
const onSearch = (value, _e, info) => console.log(info?.source, value);
const { Search } = Input;


const columns = [
  {
    title: 'Mã phim',
    dataIndex: 'maPhim',
    sorter: {
      compare: (a, b) => a.maPhim - b.maPhim,
    },
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'hinhAnh',
    render: function(text, record, index) {
      return(
        <img src={text} style={{
          width:50,
          height:50
        }}></img>
      )

    },
    
  },
  {
    title: 'Tên phim',
    dataIndex: 'tenPhim',
    sorter: {
      compare: (a, b) => a.math - b.math,
      // multiple: 2,
    },
  },
  {
    title: 'Mô tả',
    dataIndex: 'moTa',
   
  },
  {
    title: 'Hành động',
    dataIndex: 'maPhim',
    render: function(text, record, index) {
      return(
        <div>

        </div>
      )

    },
  },
];
let data = [];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
export const Films = () => {
  const {movieListDefault} = useSelector((state) => state.quanLyPhimReducer)
  data = movieListDefault
console.log("movieListDefault: ", movieListDefault);
  return (
    <div>
      <Search placeholder="input search text" onSearch={onSearch} enterButton className='mb-3'/>
      <Table columns={columns} dataSource={data} onChange={onChange} pagination={{ pageSize: 10}}/>
    </div>
  )
};



