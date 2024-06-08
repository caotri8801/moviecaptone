import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { result } from "lodash";
import {  quanLyPhimActions } from "./slice";
import { quanLyPhimServices } from "../../services/quanLyPhim.services";
import { sleep } from "../../util/sleep";

export const getMovieListThunk = createAsyncThunk('quanLyPhimReducer/getmovielist', 
    async (payload,{ rejectWithValue,dispatch}) => {
        //lấy ra dispath hàm async này sẽ ra dữ liệu kiểu đầu vào dạng dispatch =? sau đó (dữ liệu kiểu đầu vào dạng dispatch) này được truyền vào dispatch ở dưới component
        try {

            // await sleep()
            const result = await quanLyPhimServices.getMovieList()
            
            dispatch(quanLyPhimActions.addMovieList(result.data.content))
       
        } catch (err) {
            return rejectWithValue(err)
        }
    })