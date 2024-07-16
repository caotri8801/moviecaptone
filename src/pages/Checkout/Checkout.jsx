import React, { Fragment, useEffect } from 'react'
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { datGheThunk, datVeThunk, getDanhSachPhongVeThunk } from '../../store/QuanLyDatVe/thunk'
import { useParams } from 'react-router-dom'
import { LOCALE_USER_LOGIN_KEY } from '../../util/settings/config'
import { CloseSquareOutlined, LinuxOutlined } from '@ant-design/icons'
import styleCheck from './Checkout.module.css'
import './Checkout.css'
import { quanLyDatVeActions } from '../../store/QuanLyDatVe/slice'
import _ from 'lodash'
import { ThongTinVeDat } from '../../_core/models/ThongTinVeDat'
import { layThongTinNguoiDungThunk } from '../../store/QuanLyNguoiDungReducer/thunk';
import { connection } from '../../main.jsx';
import { sleep } from '../../util/sleep.jsx';

const userInfo = JSON.parse(localStorage.getItem(LOCALE_USER_LOGIN_KEY))?.content


const Checkout = () => {
  const userInfo = JSON.parse(localStorage.getItem(LOCALE_USER_LOGIN_KEY)).content
  const { chiTietPhongVe, dsGheDangDat, gheNguoiKhacDangDat } = useSelector((state) => state.quanLyDatVeReducer)
  
  const {userLogin} = useSelector((state) => state.quanLyNguoiDungReducer)
  const dispatch = useDispatch()
  const { id } = useParams()

 

  


  useEffect(() => {
 
    window.addEventListener("beforeunload", clearGhe(event));
    dispatch(getDanhSachPhongVeThunk(id))
    // đặt ghế thành công get lại dsphong vé để load giao diện page
    connection.on('datVeThanhCong', () =>  {
      dispatch(getDanhSachPhongVeThunk(id))
  })
  
    //Load danh sách ghế đang đặt từ server về (lắng nghe tín hiệu từ server trả về)
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      // Bước 1: Loại mình ra khỏi danh sách 
      dsGheKhachDat = dsGheKhachDat.filter(item => item.taiKhoan !== userLogin.content.taiKhoan);
      //Bước 2 gộp danh sách ghế khách đặt ở tất cả user thành 1 mảng chung 

      let arrGheKhachDat = dsGheKhachDat.reduce((result,item,index)=>{
          let arrGhe = JSON.parse(item.danhSachGhe);
          return [...result,...arrGhe];
      },[]);

      //Đưa dữ liệu ghế khách đặt cập nhật redux
      arrGheKhachDat = _.uniqBy(arrGheKhachDat,'maGhe');

      //Đưa dữ liệu ghế khách đặt về redux
      dispatch(quanLyDatVeActions.addGheNguoiKhacDangDat(arrGheKhachDat))

      
      
      return () =>{
        clearGhe()
        window.removeEventListener("beforeunload", clearGhe(event));
      }
   })
  }, [])


  const clearGhe = (event) => {  
    event.preventDefault();
    event.returnValue = '';
      const danhSachGheDangDat1 = []
      connection.invoke('datGhe', userInfo.taiKhoan, JSON.stringify(danhSachGheDangDat1), id);
      

  }

  const thongTinPhim = chiTietPhongVe.thongTinPhim
  const danhSachGhe = chiTietPhongVe.danhSachGhe


  const renderSeat = () => {
    return (
      danhSachGhe.map((ghe, index) => {
        let gheDaDat = (ghe.daDat) ? 'gheDaDat' : ''
        let gheVip = (ghe.loaiGhe) === 'Vip' ? 'gheVip' : ''
        let gheDangDat = dsGheDangDat?.findIndex((item) => item.maGhe === ghe.maGhe) != -1 ? 'gheDangDat' : ''
        let gheDaDuocDat = ( ghe.taiKhoanNguoiDat === userInfo.taiKhoan) ? 'gheDaDuocDat' : ''
        let gheNguoiKhacDangDatCss =  gheNguoiKhacDangDat?.findIndex((item) => item.maGhe === ghe.maGhe) != -1 ? 'gheNguoiKhacDangDat' : ''

        return (
          <Fragment key={index}>
            <button disabled={ghe.daDat} className={`ghe ${gheVip} ${gheDaDat} ${gheDangDat} ${gheDaDuocDat} ${gheNguoiKhacDangDatCss}`} onClick={() => {
              dispatch(datGheThunk(ghe))
            }}>

              <span >{gheDaDuocDat.length != 0 ? <LinuxOutlined /> : (ghe.daDat) ? <CloseSquareOutlined /> : ghe.tenGhe}</span>
            </button>
            {((index + 1) % 16 === 0) ? <br /> : ''}
          </Fragment>

        )
      })
    )

  }
  return (
    <div >
      <div className='grid grid-cols-12'>
        <div className=' col-span-9 pl-16 pr-5'>
          <div className='container w-full text-center'>
            <div className='bg-black w-full h-[20px]'></div>
            <div className={`${styleCheck['hinh_thang']}`}>
              <div className='relative w-full text-center py-2'>Màn hình</div>
            </div>
            {
              renderSeat()
            }
          </div>
          <table className="w-[70%] mt-2 text-xs  text-center m-auto">
            <thead>
              <tr className="dark:bg-gray-300">

                <th className="p-1">Ghế trống</th>
                <th className="p-1">Ghế vip</th>
                <th className="p-1">Ghế người khác đặt</th>
                <th className="p-1">Ghế mình đặt</th>
                <th className="p-1">Ghế đang đặt</th>
                <th className="p-1">Ghế người khác đang đặt</th>
              </tr>
            </thead>
            <tbody className="border-b dark:bg-gray-50">
              <tr>
                <td className="px-1 py-2">
                  <button disabled='true' className="ghe" >
                    <span >00 </span>
                  </button>
                </td>
                <td className="px-1 py-2">
                  <button disabled='true' className="ghe gheVip" >
                    <span >00</span>
                  </button>
                </td>
                <td className="px-1 py-2">
                  <button disabled='true' className="ghe gheDaDat" >
                    <span ><CloseSquareOutlined /> </span>
                  </button>
                </td>
                <td className="px-1 py-2">
                  <button disabled='true' className="ghe gheDaDuocDat" >
                    <span ><LinuxOutlined /></span>
                  </button>
                </td>
                <td className="px-1 py-2">
                  <button disabled='true' className="ghe gheDangDat" >
                    <span >00 </span>
                  </button>
                </td>
                <td className="px-1 py-2">
                  <button disabled='true' className="ghe gheNguoiKhacDangDat" >
                    <span ><LinuxOutlined /></span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
        <div className='col-span-3'>
          <h1 className='text-center text-4xl my-2 text-green-800'>{dsGheDangDat.reduce((preValue, currentValue) => (preValue += currentValue.giaVe), 0).toLocaleString()}đ</h1>
          <hr />
          <h2 className='font-bold text-xl my-2'>{thongTinPhim.tenPhim}</h2>
          <h3><span>Địa điểm: </span>{thongTinPhim.diaChi}</h3>
          <h3 className=' my-2'><span>Ngày chiếu: </span>{thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</h3>
          <hr />
          <div className='flex justify-between flex-wrap font-bold text-[15px] py-2'>
            <div className='text-red-600 w-[75%]'>Ghế:{_.sortBy(dsGheDangDat, ['tenGhe']).map((ghe, index) => {
              return <span key={index} className='text-green-600'> {ghe.tenGhe}</span>
            })}</div>
            <div><span>{dsGheDangDat.reduce((preValue, currentValue) => (preValue += currentValue.giaVe), 0).toLocaleString()}</span></div>
          </div>
          <hr />
          <div className='py-2'>
            <h2 className='italic'>Email:</h2>
            <p>{userInfo.email}</p>
          </div>
          <hr />
          <div className='py-2'>
            <h2 className='italic'>Phone:</h2>
            <p>{userInfo.soDT}</p>
          </div>
          <div className='w-full text-center bg-green-500 py-2 text-white font-bold cursor-pointer' onClick={() => {
            let thongTinVeDat = new ThongTinVeDat()
            thongTinVeDat.maLichChieu = id
            thongTinVeDat.danhSachVe = dsGheDangDat
            dispatch(datVeThunk(thongTinVeDat))
          }}>
            Đặt vé
          </div>
        </div>
      </div>
    </div>
  )
}

const KetQuaDatVe = () => {
  const dispatch = useDispatch()
  const {chiTietPhongVe} = useSelector((state) => state.quanLyDatVeReducer)
  useEffect(() => {
    dispatch( layThongTinNguoiDungThunk(userInfo?.taiKhoan))
    return () => {
      dispatch(quanLyDatVeActions.setActiveTab('1'))
    }
  }, [chiTietPhongVe])

  const { thongTinNguoiDung } = useSelector((state) => state.quanLyNguoiDungReducer)
  const renderThongTinVeDat = () => {
    return (
      thongTinNguoiDung.thongTinDatVe?.map((item, index) => {
        return (
          <div key={index} className="xl:w-1/3 md:w-1/2 p-4">
            <div className="border border-gray-200 p-6 rounded-lg flex">
              <div className="w-28 h-28 inline-flex items-center justify-center rounded-full  text-indigo-500 mb-4 mr-3">
                <img src={item.hinhAnh} style={{
                  height: '50px',
                  width: '50px',
                  borderRadius: '50%'
                }} alt={item.tenPhim} />
              </div>
              <div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">{item.tenPhim}</h2>
                <p className="leading-relaxed text-base">Địa điểm: {item.danhSachGhe[0].tenHeThongRap}</p>
                <p><span>Tên rạp:</span> {item.danhSachGhe[0].tenCumRap} <span>Ghế: {
                  item.danhSachGhe.map((ghe, index) => {
                    return (
                      <a className=' mr-2'>[{ghe.tenGhe}]</a>
                    )
                  })
                }</span></p>
              </div>

            </div>
          </div>
        )
      })
    )
  }
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-5 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Lịch sử đặt vé khách hàng</h1>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Hãy xem thông tin và địa điểm để xem phim vui vẻ</p>
        </div>
        <div className="flex flex-wrap -m-4">
          {
            renderThongTinVeDat()
          }
        </div>
      </div>
    </section>

  )
}

const onChange = (key) => {

};
const items = [
  {
    key: '1',
    label: '01 Đặt vé',
    children: <Checkout />,
  },
  {
    key: '2',
    label: '02 Kết quả đặt vé',
    children: <KetQuaDatVe />,
  },
];
const App = () => {
  const {activeTab} = useSelector((state) => state.quanLyDatVeReducer)
  const dispatch = useDispatch()
  return (
    <div className='container'>
      <Tabs activeKey={activeTab} items={items} onChange={(event) => {
        dispatch(quanLyDatVeActions.setActiveTab(event))
      }} />
    </div>
  )
}
export default App
