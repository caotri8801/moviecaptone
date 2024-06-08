import { Tabs } from 'antd';
import moment from 'moment';
import React, { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom';


export const HomeMenu = ({ cumRapList }) => {
  const [tabPosition, setTabPosition] = useState('left');

  return (
    <div className='container my-8 w-[80%]'>
      {/* tab rạp */}
      <Tabs
        tabPosition={tabPosition}
        items={cumRapList.map((item, i) => {
          const id = String(i + 1);
          return {
            label: <img src={item.logo} style={{ width: 50, height: 50 }}></img>,
            key: id,
            // tab cụm rạp
            children: <Tabs
              tabPosition={tabPosition}
              items={item.lstCumRap.map((cumrap, i) => {
                const id = String(i + 1);
                return {
                  label: <div className='flex'>
                    <img src={cumrap.hinhAnh} style={{ width: 100, height: 100 }} className='mr-2'></img>
                    <div className='text-left' style={{ width: 250 }}>
                      <h3 className="font-extrabold">{cumrap.tenCumRap}</h3>
                      <p className='text-red-600'>Chi tiết</p>
                    </div>
                  </div>,
                  key: id,
                  //Film chiếu tại 1 cụm rạp
                  children: <div>
                    {cumrap.danhSachPhim?.map((phim, index) => {
                      return (
                        <Fragment >
                          <div className='flex mb-2' key={index}>
                            <img src={phim.hinhAnh} style={{ width: 100, height: 100 }} className='mr-2' onError={(e) =>
                              (e.target.onerror = null)(
                                (e.target.src =
                                  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg")
                              )
                            }></img>
                            <div className='text-left' >
                              <h3 className='font-bold'>{phim.tenPhim}</h3>
                              <p >{cumrap.diaChi}</p>
                              <div className='grid grid-cols-5 gap-2 text-green-600'>
                                {
                                  phim.lstLichChieuTheoPhim?.map((lichChieu, index) => {
                                    return (
                                      <NavLink key={index}>{moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}</NavLink>
                                    )
                                  })
                                }
                              </div>
                            </div>
                          </div>
                          <hr className='mb-3 w-[90%]' />
                        </Fragment>
                      )
                    })}
                  </div>,
                };
              })}
            />,
          };
        })}
      />
    </div>
  )
}
