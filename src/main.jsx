import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { } from "react-redux"
import { Provider } from 'react-redux'
import { store } from './store/config.js'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryProvider } from './contexts/ReactQueryProvider.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
    // component của thư viện react nghĩa nên phải tuân thủ props của thư viện 'store'
    <Provider store={store}>
        <BrowserRouter>
            <ReactQueryProvider>
                <App />
            </ReactQueryProvider>
        </BrowserRouter>
    </Provider>

)
