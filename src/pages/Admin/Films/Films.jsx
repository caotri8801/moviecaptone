import React, { Fragment } from 'react';
import { Table } from 'antd';
import { Input, Space, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { render } from 'react-dom';
import { getMovieListThunk, xoaPhimThunk } from '../../../store/QuanLyPhimReducer/thunk';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constants/config';

export const Films = () => {
  const { Search } = Input;

  const { movieListDefault } = useSelector((state) => state.quanLyPhimReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSearch = (value, _e, info) => {
    dispatch(getMovieListThunk(value))
  }

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
      render: function (text, record, index) {
        return (
          <img src={text} style={{
            width: 50,
            height: 50
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
      render: function (text, record, index) {

        return (
          <div>
            <Button className='mb-2 bg-red-500 text-white' onClick={() => {
              if (window.confirm('Bạn có chắc muốn xoá phim ' + record.tenPhim)) {
                //Gọi action
                dispatch(xoaPhimThunk(text));
              }

            }}>Xóa</Button>
            <Button className='bg-zinc-500 text-white' onClick={() => {
              navigate("/admin/films/edit/" + text)
            }}>Edit</Button>
          </div>
        )

      },
    },
  ];

  let data = [];
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
  };


  data = movieListDefault


  return (
    <div>
      <Search placeholder="input search text" onSearch={onSearch} enterButton className='mb-3' />
      <Table columns={columns} dataSource={data} onChange={onChange} pagination={{ pageSize: 10 }} />
    </div>
  )
};



