
import { apiIntance } from "../constants/apiInstance"
import { GROUPID, QUAN_LY_NGUOI_DUNG_API } from "../util/settings/config"

const api = apiIntance.create({
    baseURL: QUAN_LY_NGUOI_DUNG_API
})

export const quanLyNguoiDungServices = {
    dangNhap: (payload) => api.post('/DangNhap',payload),
    dangKy: (payload) => api.post('/DangKy',payload),
    layThongTinNguoiDung: (query) => api.post(`/LayThongTinNguoiDung${query}`),
}