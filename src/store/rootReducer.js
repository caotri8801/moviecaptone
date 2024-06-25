import { combineReducers } from "redux"
import { carouselReducer } from "./CarouselReducer/slice.js"
import { quanLyPhimReducer } from "./QuanLyPhimReducer/slice.js"
import { quanLyRapReducer } from "./QuanLyRap/slice.js"
import { quanLyNguoiDungReducer } from "./QuanLyNguoiDungReducer/slice.js"
import { quanLyDatVeReducer } from "./QuanLyDatVe/slice.js"

export const rootReducer = combineReducers({
    carouselReducer, quanLyPhimReducer,quanLyRapReducer,quanLyNguoiDungReducer,quanLyDatVeReducer
})