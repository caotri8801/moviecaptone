import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyDatVeActions } from "./slice";
import qs from 'qs'
import { quanLyDatVeServices } from "../../services/quanLyDatVe.services";
import { connection } from '../../main.jsx';



export const getDanhSachPhongVeThunk = createAsyncThunk('quanLyDatVeReducer/getdanhsachphongve',
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const query = qs.stringify({
                MaLichChieu: id,
            },
                {
                    addQueryPrefix: true
                }
            )

            const result = await quanLyDatVeServices.getDanhSachPhongVe(query)

            dispatch(quanLyDatVeActions.addDanhSachPhongVe(result.data.content))

        } catch (err) {
            return rejectWithValue(err)
        }
    })

export const datVeThunk = createAsyncThunk('quanLyDatVeReducer/datve',
    async (payload, { rejectWithValue, dispatch, getState }) => {
        try {
            let taiKhoan = getState().quanLyNguoiDungReducer.userLogin.content.taiKhoan
            dispatch(quanLyDatVeActions.setIsLoading(true))
            const result = await quanLyDatVeServices.datVe(payload)
            await dispatch(getDanhSachPhongVeThunk(payload.maLichChieu))
            dispatch(quanLyDatVeActions.resetdsGheDangDat())
            connection.invoke('datGheThanhCong',taiKhoan,payload.maLichChieu.toString());
        
            dispatch(quanLyDatVeActions.setIsLoading(false))
            // dispatch(quanLyDatVeActions.setActiveTab('2'))
        } catch (err) {
            return rejectWithValue(err)
        }
    })

export const datGheThunk = createAsyncThunk('quanLyDatVeReducer/datghe',
    async (payload, { rejectWithValue, dispatch, getState }) => {
        try {
            dispatch(quanLyDatVeActions.addGheDangDat(payload))

            let danhSachGheDangDat = getState().quanLyDatVeReducer.dsGheDangDat;
            let taiKhoan = getState().quanLyNguoiDungReducer.userLogin.content.taiKhoan


            let maLichChieu = getState().quanLyDatVeReducer.chiTietPhongVe.thongTinPhim.maLichChieu.toString()
            // let maLichChieu = '47551'
            //user: 1a, 123 chung loại user là khách hàng
            //Biến mảng thành chuỗi
            danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);
       

            //Call api signalR
            connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichChieu);
        } catch (err) {
            return rejectWithValue(err)
        }
    })