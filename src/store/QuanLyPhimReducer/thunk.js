import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { result } from "lodash";
import { quanLyPhimActions } from "./slice";
import { quanLyPhimServices } from "../../services/quanLyPhim.services";
import { sleep } from "../../util/sleep";
import qs from 'qs';

export const getMovieListThunk = createAsyncThunk('quanLyPhimReducer/getmovielist',
    async (payload, { rejectWithValue, dispatch }) => {
        //lấy ra dispath hàm async này sẽ ra dữ liệu kiểu đầu vào dạng dispatch =? sau đó (dữ liệu kiểu đầu vào dạng dispatch) này được truyền vào dispatch ở dưới component
        try {
            let query = ''
            if(payload){
                query ='&'+ qs.stringify({
                    tenPhim: payload,
                },
                {
                    addQueryPrefix: false
                }
            )
        }

            const result = await quanLyPhimServices.getMovieList(query)

            dispatch(quanLyPhimActions.addMovieList(result.data.content))

        } catch (err) {
            return rejectWithValue(err)
        }
    })


export const themPhimUploadHinhThunk = createAsyncThunk('quanLyPhimReducer/themphimuploadhinh', //name
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            const result = await quanLyPhimServices.themPhimUploadHinh(payload)
            // if (result.data.statusCode == '200') {
            //     dispatch(quanLyNguoiDungActions.addUserLogin(result.data))
            // }
        } catch (err) {
            return rejectWithValue(err)
        }
    })

export const layThongTinPhimThunk = createAsyncThunk('quanLyPhimReducer/laythongtinphim',
    async (id, { rejectWithValue, dispatch }) => {
       
        try {
            const query = qs.stringify({
                MaPhim: id,
            },
                {
                    addQueryPrefix: true
                }
            )
            
            const result = await quanLyPhimServices.layThongTinPhim(query)
            dispatch(quanLyPhimActions.setThongTinPhimF(result.data.content))

        } catch (err) {
            return rejectWithValue(err)
        }
    })

    
export const capNhatPhimUploadThunk = createAsyncThunk('quanLyPhimReducer/capnhatphimupload', //name
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            const result = await quanLyPhimServices.capNhatPhimUpload(payload)
            // if (result.data.statusCode == '200') {
            //     dispatch(quanLyNguoiDungActions.addUserLogin(result.data))
            // }
        } catch (err) {
            return rejectWithValue(err)
        }
    })

export const xoaPhimThunk = createAsyncThunk('quanLyPhimReducer/xoaphim',
    async (id, { rejectWithValue, dispatch }) => {
       
        try {
            const query = qs.stringify({
                MaPhim: id,
            },
                {
                    addQueryPrefix: true
                }
            )
            
            const result = await quanLyPhimServices.xoaPhim(query)
            dispatch(getMovieListThunk())

        } catch (err) {
            return rejectWithValue(err)
        }
    })