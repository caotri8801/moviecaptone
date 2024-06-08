import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { result } from "lodash";
import { quanLyRapActions } from "./slice";

import { sleep } from "../../util/sleep";
import { useParams } from 'react-router-dom'
import qs from 'qs'
import { useQuery } from '@tanstack/react-query'
import { quanLyRapServices } from '../../services/quanLyRap.services'


export const getCumRapListThunk = createAsyncThunk('quanLyRapReducer/getcumraplist',
    async (payload, { rejectWithValue, dispatch }) => {
        //lấy ra dispath hàm async này sẽ ra dữ liệu kiểu đầu vào dạng dispatch =? sau đó (dữ liệu kiểu đầu vào dạng dispatch) này được truyền vào dispatch ở dưới component
        try {

            // await sleep()
            const result = await quanLyRapServices.getCumRapList()
            // console.log("result: ", result);

            dispatch(quanLyRapActions.addCumRapList(result.data.content))

        } catch (err) {
            return rejectWithValue(err)
        }
    })

export const getThongTinLichChieuPhimThunk = createAsyncThunk('quanLyRapReducer/getthongtinlichchieuphim',
    async (id, { rejectWithValue, dispatch }) => {
        //lấy ra dispath hàm async này sẽ ra dữ liệu kiểu đầu vào dạng dispatch =? sau đó (dữ liệu kiểu đầu vào dạng dispatch) này được truyền vào dispatch ở dưới component
        //Usequery củng là 1 hook quản lý state của ansync như thunk => ko dùng thunk và useQuery chung (hàm bất đồng bộ chủ yếu dùng các lib này để can thiệp đưa ra logic có quá trình fetching, loading, v.v. => như đang loading thì ta cho chạy skeleton)
        try {
            const query = qs.stringify({
                MaPhim: id,
            },
                {
                    addQueryPrefix: true
                }
            )

            const result = await quanLyRapServices.getThongTinLichChieuPhim(query)
            dispatch(quanLyRapActions.addThongTinLichChieuPhim(result.data.content))

        } catch (err) {
            return rejectWithValue(err)
        }
    })