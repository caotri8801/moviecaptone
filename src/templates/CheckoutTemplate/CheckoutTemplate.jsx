import React from 'react'
import { Header } from '../Layout/Header/Header'
import { Navigate, Outlet } from 'react-router-dom'
import { Footer } from '../Layout/Footer/Footer'
import { LOCALE_USER_LOGIN_KEY } from '../../util/settings/config'

export const CheckoutTemplate = () => {
  
  if(!localStorage.getItem(LOCALE_USER_LOGIN_KEY)){
    return  <Navigate to="/login" />;
  }
  return (
    <div>
     
        <Outlet/>

   
    </div>
  )
}
