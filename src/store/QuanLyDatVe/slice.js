import { createSlice } from "@reduxjs/toolkit"
import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVe"


const initialState = {
    chiTietPhongVe : new ThongTinLichChieu(),
    dsGheDangDat: [],
    isLoading: false,
    activeTab: "1",
    gheNguoiKhacDangDat: []
}


export const { reducer: quanLyDatVeReducer, actions: quanLyDatVeActions } = createSlice({
    initialState,
    name: 'QuanLyDatVeReducer',
    reducers: {
        addDanhSachPhongVe: (state, { payload }) => {
            state.chiTietPhongVe = payload
        },
        addGheDangDat: (state, { payload }) => {
            const index = state.dsGheDangDat.findIndex((item)=> item.maGhe === payload.maGhe)
            if(index != -1){
                state.dsGheDangDat.splice(index,1)
            }else{
                state.dsGheDangDat.push(payload)
            }
        },
        addGheNguoiKhacDangDat: (state, { payload }) => {
           state.gheNguoiKhacDangDat = payload
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload
        },
        setActiveTab: (state, { payload }) => {
            state.activeTab = payload
        },
        resetdsGheDangDat: (state) => {
            state.dsGheDangDat = []
        },
    },
})


