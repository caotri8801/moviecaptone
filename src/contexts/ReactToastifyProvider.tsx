import React, { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

type Props = {
    children: React.ReactNode
}
export const ReactToastifyProvider = ({children}:Props) => {
  return (
    <Fragment>
        <ToastContainer/>
        {children}
    </Fragment>
    
  )
}

