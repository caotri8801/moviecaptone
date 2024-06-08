import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getThongTinLichChieuPhimThunk } from '../../store/QuanLyRap/thunk'
// import { CustomCard } from '@tsamantanis/react-glassmorphism'
// import '@tsamantanis/react-glassmorphism/dist/index.css'
import moment from 'moment'
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
import '../../assets/styles/circle.css'
import { Rate, Tabs } from 'antd'

export const Detail = () => {

  const dispatch = useDispatch()
  const { thongTinLichChieuPhim } = useSelector((state) => state.quanLyRapReducer)
  const phim = thongTinLichChieuPhim
  console.log("thongTinLichChieuPhim: ", thongTinLichChieuPhim);
  const { id } = useParams()
  const [tabPosition, setTabPosition] = useState('left');

  useEffect(() => {
    //trong 1 hook ko được gọi 1 hook khác
    dispatch(getThongTinLichChieuPhimThunk(id))
  }, [])

  return (
    <div style={{
      backgroundImage: `url(${phim.hinhAnh})`,
      backgroundSize: '100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
      
    }}
    className='pb-8'
    >
      <div
        effectColor="#C780FF" // required
        color="#14AEFF" // default color is white
        blur={50} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px

      >
        {/*Chi tiết phim */}
        <div className="pt-28 pb-8">
          <div className='grid grid-cols-12'>
            <div className='col-start-3 col-span-2'>
              <img src={phim.hinhAnh} />
            </div>
            <div className='col-start-5 col-span-4 pl-11 text-white'>
              <h4> <span className='font-bold'>Ngày chiếu:</span> {moment(phim.ngayKhoiChieu).format('DD.MM.YYYY')}</h4>
              <h1 className='my-3 font-bold text-xl'>{phim.tenPhim}</h1>
              <p>{phim.moTa}</p>
            </div >
            <div className='col-start-9 col-span-2 '>
              <div className='flex flex-col text-center text-[green]'>
                <h2 className='font-bold text-xl'>Đánh giá</h2>
                <div className='my-2'>
                  <Rate allowHalf value={phim.danhGia / 2} className='text-[green]' />
                </div>
                <div className='m-auto'>
                  <div className={`c100 p${phim.danhGia * 10} green`}>
                    <span>{phim.danhGia * 10}%</span>
                    <div className="slice">
                      <div className="bar"></div>
                      <div className="fill"></div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
        {/* Menu lịch chiếu */}
        <Tabs
          
          className='container w-[60%] bg-white'
          defaultActiveKey="1"
          centered
          items={
            [
              {
                key: '1',
                label: 'Lịch chiếu',
                children: < Tabs
                  tabPosition={tabPosition}
                  items={
                    phim.heThongRapChieu?.map((rap, i) => {
                      const id = String(i + 1);
                      return {
                        label: <img src={rap.logo} alt={phim.tenPhim} style={{
                          width: 50,
                          height: 50
                        }} />,
                        key: id,
                        children: <div>
                          {
                            rap.cumRapChieu?.map((item, index) => {
                              return (<div className='d-flex'>
                                <img src={item.hinhAnh} style={{
                                  width: 50,
                                  height: 50
                                }} />
                                <div className='ml-2'>
                                  <h2 className='text-[15px] font-bold'>{item.tenCumRap}</h2>
                                  <h4 className='my-2'>{item.diaChi}</h4>
                                  <div className='grid grid-cols-5 gap-3 text-[green]'>
                                    {
                                      item.lichChieuPhim.map((lich, index) => {
                                        return(
                                          <NavLink>
                                            {moment(lich.ngayChieuGioChieu).format('hh:mm A')}
                                          </NavLink>
                                        )
                                      })
                                    }
                                  </div>
                                </div>
                              </div>)
                            })
                          }
                        </div>


                      };
                    })
                  }
                />

                ,
              },
              {
                key: '2',
                label: 'Thông tin',
                children: 'Content of Tab Pane 2',
              },
              {
                key: '3',
                label: 'Đánh giá',
                children: 'Content of Tab Pane 3',
              },
            ]

          }
        />
      </div>



    </div>
  )
}
