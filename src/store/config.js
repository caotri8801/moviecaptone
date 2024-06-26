import {createStore} from 'redux'
import { rootReducer } from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'


export const store = configureStore({
    reducer: rootReducer,
    // devTools: false,
})