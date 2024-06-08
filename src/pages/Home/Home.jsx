import React, { useEffect } from 'react'
import { HomeMenu } from './HomeMenu/HomeMenu'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieListThunk } from '../../store/QuanLyPhimReducer/thunk'
import { Film } from '../../components/Film/Film'
import MultipleRowSlick from '../../components/RSlick/MultipleRowSlick'
import { getCumRapListThunk } from '../../store/QuanLyRap/thunk'
import { HomeCarousel } from './HomeCarousel/HomeCarousel'


export const Home = () => {
  
  const {movieList} = useSelector((state) => state.quanLyPhimReducer)
  const {cumRapList} = useSelector((state) => state.quanLyRapReducer)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getMovieListThunk()),
    dispatch(getCumRapListThunk())
  },[])
  


  return (
    <div>
      <HomeCarousel/>
      {
        !!movieList?.[0] && <MultipleRowSlick movieList={movieList}/>
      }

      <HomeMenu cumRapList={cumRapList}/>
    </div>
  )
}
