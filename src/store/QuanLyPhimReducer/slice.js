import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    movieList: [],
    movieListDefault: [],
    dangChieu: true,
    sapChieu: true,
    thongTinPhimDefault:{},
    thongTinPhim: {},
    hinhAnhTmp: null
}

export const { reducer: quanLyPhimReducer, actions: quanLyPhimActions } = createSlice({
    initialState,
    name: 'QuanLyPhimReducer',
    reducers: {
        addMovieList: (state, { payload }) => {
            state.movieList = payload
            state.movieListDefault = payload
        },
        setDangChieu: (state) => {
            state.dangChieu = true
            state.sapChieu = !state.dangChieu
            state.movieList = state.movieListDefault.filter((item)=>item.dangChieu === state.dangChieu)
        },
        setSapChieu: (state) => {
            state.sapChieu = true
            state.dangChieu = !state.sapChieu 
            state.movieList = state.movieListDefault.filter((item)=>item.sapChieu === state.sapChieu)
        },
        setThongTinPhimF: (state, { payload }) => {
           
            state.thongTinPhim = payload
            state.thongTinPhimDefault = payload
            
        },
        setThongTinPhim: (state, { payload }) => {
           
            state.thongTinPhim = payload

            
        },
        setHinhAnhTmp: (state, { payload }) => {
           
            state.hinhAnhTmp = payload

            
        },
    },
})


