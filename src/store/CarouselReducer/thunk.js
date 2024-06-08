import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { result } from "lodash";
import { carouselActions } from "./slice";
import { quanLyPhimServices } from "../../services/quanLyPhim.services";

export const getBannerListThunk = createAsyncThunk('carouselReducer/getbannerlist', //name
    async (payload,{ rejectWithValue,dispatch}) => {
        
        try {

            // const result = await axios.get(
            //     'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner',
            //     {
            //         headers: {
            //             TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2MyIsIkhldEhhblN0cmluZyI6IjA5LzA5LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcyNTg0MDAwMDAwMCIsIm5iZiI6MTY5Njg3MDgwMCwiZXhwIjoxNzI1OTg3NjAwfQ.eka9nnrY4RvjgyAAdJH7uruVGj0DfXCfIM8V8HRpIMI'
            //         },
            //     }
            // )
            const result = await quanLyPhimServices.getBannerList()
            
            dispatch(carouselActions.addBanner(result.data.content))
       
        } catch (err) {
            return rejectWithValue(err)
        }
    })