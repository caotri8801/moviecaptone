
import { apiIntance } from "../constants/apiInstance"
import { GROUPID, QUAN_LY_PHIM_API } from "../util/settings/config"

const api = apiIntance.create({
    baseURL: QUAN_LY_PHIM_API
})

export const quanLyPhimServices = {
    getBannerList: () => api.get('/LayDanhSachBanner'),

    // getMovieById: ({query = ''} = {}) => api.get(`/LayThongTinPhim${query}`)
    // {query = ''} = {} destructering query from object {}
    getMovieList: () => api.get(`/LayDanhSachPhim?maNhom=${GROUPID}`),
}