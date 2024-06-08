import React from "react";
import Slider from "react-slick";
import styleSlick from './MultipleRowSlick.module.css'
import { Film } from "../Film/Film";
import { Flip_Film } from "../Film/Flip_Film";
import { quanLyPhimActions } from "../../store/QuanLyPhimReducer/slice";
import { useDispatch, useSelector } from "react-redux";

function MultipleRowSlick({movieList}) {

    const renderMovieList = (movieList) => {
        return (
            movieList.map((item, index) => {
                return (
                    <div className={`${styleSlick['slick-width']}`} key={index}>
                        {/* <Film key={index} phim={item} /> */}
                        <Flip_Film item={item} key={index}/>
                    </div>
                )
            })
        )
    }

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} ${styleSlick['slick-next']}`}
                style={{ ...style, display: "block"}}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} ${styleSlick['slick-prev']}`}
                style={{ ...style, display: "block"}}
                onClick={onClick}
            />
        );
    }

    const settings = {
        className: "center slider variable-width",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        // slidesToShow: 2,
        speed: 500,
        rows: 2,
        slidesPerRow: 3,
        variableWidth: true,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,

    };

    const {dangChieu, sapChieu} = useSelector((state) => state.quanLyPhimReducer)
    const dispatch = useDispatch()

    const classNameDC = dangChieu ? 'active_Film':'no_active_Film'
    const classNameSC = sapChieu ? 'active_Film':'no_active_Film'
    return (
        <div className="container w-[80%]">

            <div className="slider-container ">
            <button type="button" className={`${styleSlick[classNameDC]} px-8 py-3 font-semibold border rounded border-gray-950 mr-3`} fdprocessedid="wizgrw" onClick={()=>{
                dispatch(quanLyPhimActions.setDangChieu())
            }}> Đang Chiếu</button>

            <button type="button" className={`${styleSlick[classNameSC]} px-8 py-3 font-semibold border rounded border-gray-950`} fdprocessedid="wizgrw" onClick={()=>{
                dispatch(quanLyPhimActions.setSapChieu())
            }}>Sắp Chiếu</button>
  

                <Slider {...settings}>
                    {
                        renderMovieList(movieList)
                  
                    }
                </Slider>
            </div>
        </div>

    );
}

export default MultipleRowSlick;