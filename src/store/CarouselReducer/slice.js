import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    bannerList: [],
    
}


export const { reducer: carouselReducer, actions: carouselActions } = createSlice({
    initialState,
    name: 'CarouselReducer',
    reducers: {
        addBanner: (state, { payload }) => {
            state.bannerList = payload
        },
    },
})


