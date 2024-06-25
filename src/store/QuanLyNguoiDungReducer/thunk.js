import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyNguoiDungServices } from "../../services/quanLyNguoiDung.services";
import { quanLyNguoiDungActions } from "./slice";
import { Navigate } from "react-router-dom";
import qs from 'qs'
import { quanLyDatVeActions } from "../QuanLyDatVe/slice";



export const dangNhapThunk = createAsyncThunk('quanLyNguoiDungReducer/dangnhap', //name
    async (payload, { rejectWithValue, dispatch }) => {
        console.log("payload: ", payload);
        try {
            const result = await quanLyNguoiDungServices.dangNhap(payload)
            if (result.data.statusCode == '200') {
                dispatch(quanLyNguoiDungActions.addUserLogin(result.data))
            }
        } catch (err) {
            return rejectWithValue(err)
        }
    })

export const dangKyThunk = createAsyncThunk('quanLyNguoiDungReducer/dangky', //name
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            const result = await quanLyNguoiDungServices.dangKy(payload)
        } catch (err) {
            return rejectWithValue(err)
        }
    })

export const layThongTinNguoiDungThunk = createAsyncThunk('quanLyNguoiDungReducer/laythongtinnguoidung', //name
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            const query = qs.stringify({
                taiKhoan: payload,
            },
                {
                    addQueryPrefix: true
                }
            )
            const result = await quanLyNguoiDungServices.layThongTinNguoiDung(query)
            dispatch(quanLyNguoiDungActions.addthongTinNguoiDung(result.data.content))
        } catch (err) {
            return rejectWithValue(err)
        }
    })