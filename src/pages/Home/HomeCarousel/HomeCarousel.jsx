import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getBannerListThunk } from '../../../store/CarouselReducer/thunk';



export const HomeCarousel = () => {
    const {bannerList} = useSelector((state) => state.carouselReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBannerListThunk())
    },[])


    //redux-thunk: hỗ trợ truyền function vào dispath
    //dispatch có 02 loại
    //1. type, action (sử dụng khi state có sẳn)
    //2. phải cài middleware: callbackFunction(dispatch)

    const contentStyle = {
        height: '400px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    };
 
    const renderBanner = () => {
        return(
            bannerList.map((item,index) => {
                return(
                    <div key={index} >
                        <div style={{...contentStyle,backgroundImage:`url(${item.hinhAnh})`}}>
                            <img src={item.hinhAnh} alt={item.hinhAnh} />
                        </div>
                    </div>
                )
            }) 
        )
        
    }
    
    return (
        <Carousel effect="fade" className='mb-3'>
            {
                renderBanner()
            }
        </Carousel>
    )
}
