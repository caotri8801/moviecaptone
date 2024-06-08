import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cumRapList: [],
    thongTinLichChieuPhim: {}
    
}


export const { reducer: quanLyRapReducer, actions: quanLyRapActions } = createSlice({
    initialState,
    name: 'QuanLyRapReducer',
    reducers: {
        addCumRapList: (state, { payload }) => {
            state.cumRapList = payload
        },

        addThongTinLichChieuPhim:(state, { payload }) => {
            state.thongTinLichChieuPhim = payload
        },
       
    },
})


