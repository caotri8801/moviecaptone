import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'



const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            // tắt chức năng call lại API khi không focus tại trang web
            refetchOnWindowFocus:false,
            // tắt tự động call lại khi call api bị lỗi
            retry: false,
        }
    }
})
export const ReactQueryProvider = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
