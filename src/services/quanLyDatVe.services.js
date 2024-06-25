
import { apiIntance } from "../constants/apiInstance"
import { GROUPID, QUAN_LY_DAT_VE_API, QUAN_LY_RAP_API } from "../util/settings/config"

const api = apiIntance.create({
    baseURL: QUAN_LY_DAT_VE_API
})

export const quanLyDatVeServices = {
    getDanhSachPhongVe: (query) => api.get(`/LayDanhSachPhongVe${query}`),
    // {query = ''} = {} destructering query from object {} => trường hợp truyền object bên kia
    datVe: (ThongTinVeDat) => api.post(`/DatVe`,ThongTinVeDat)
}