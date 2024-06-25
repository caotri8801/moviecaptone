import { createSlice } from "@reduxjs/toolkit"
import { LOCALE_USER_LOGIN_KEY } from "../../util/settings/config"
import { layThongTinNguoiDungThunk } from "./thunk"

let user = {}
if(localStorage.getItem(LOCALE_USER_LOGIN_KEY)){
    user = JSON.parse(localStorage.getItem(LOCALE_USER_LOGIN_KEY))
}
 
const initialState = {
    userLogin: user,
    thongTinNguoiDung: {},
    isFetchingLayThongTinNguoiDung: false
    
}


export const { reducer: quanLyNguoiDungReducer, actions: quanLyNguoiDungActions } = createSlice({
    initialState,
    name: 'QuanLyNguoiDungReducer',
    reducers: {
        addUserLogin: (state, { payload }) => {
            state.userLogin = payload
            localStorage.setItem(LOCALE_USER_LOGIN_KEY, JSON.stringify(payload))
        },
        addthongTinNguoiDung: (state, { payload }) => {
            state.thongTinNguoiDung = payload
           
        },

       
    },
    extraReducers:(builder) => {

        builder.addCase(layThongTinNguoiDungThunk.pending,(state)=>{
            state.isFetchingLayThongTinNguoiDung  = true
        })
        builder.addCase(layThongTinNguoiDungThunk.fulfilled,(state,{payload})=>{
 
            state.isFetchingLayThongTinNguoiDung = false
        })
        builder.addCase(layThongTinNguoiDungThunk.rejected,(state, action)=>{

        })

    }
})


