import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

export const Loading = () => {
    const {isLoading} = useSelector((state) => state.quanLyDatVeReducer)
    const {isFetchingLayThongTinNguoiDung} = useSelector((state) => state.quanLyNguoiDungReducer)
  return (
    <Fragment >
        {
            isLoading? <div className='fixed w-full flex justify-center items-center' style={{
                top: '0',
                left:'0',
                zIndex: '99',
                backgroundColor: '#100f0fb0',
                height: '100%',
                color: 'white',
                fontWeight: 'bold'
    
            }}><span>Loading...</span>
            </div> : ''
            
        }
        {
            isFetchingLayThongTinNguoiDung? <div className='fixed w-full flex justify-center items-center' style={{
                top: '0',
                left:'0',
                zIndex: '99',
                backgroundColor: '#100f0fb0',
                height: '100%',
                color: 'white',
                fontWeight: 'bold'
    
            }}><span>Loading...</span>
            </div> : ''
            
        }
        
        <Outlet/>
        
    </Fragment>
  )
}
