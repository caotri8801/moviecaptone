
import { apiIntance } from "../constants/apiInstance"
import { GROUPID, QUAN_LY_RAP_API } from "../util/settings/config"

const api = apiIntance.create({
    baseURL: QUAN_LY_RAP_API
})

export const quanLyRapServices = {

    getCumRapList: () => api.get(`/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`),

    getThongTinLichChieuPhim: (query) => api.get(`/LayThongTinLichChieuPhim${query}`)
    // {query = ''} = {} destructering query from object {} => trường hợp truyền object bên kia
}