import { combineReducers } from "redux"
import { carouselReducer } from "./CarouselReducer/slice.js"
import { quanLyPhimReducer } from "./QuanLyPhimReducer/slice.js"
import { quanLyRapReducer } from "./QuanLyRap/slice.js"

export const rootReducer = combineReducers({
    carouselReducer, quanLyPhimReducer,quanLyRapReducer
})