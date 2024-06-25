import { useState } from 'react'
import './App.css'
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate'
import { Home } from './pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import { PATH } from './constants/config'
import { News } from './pages/News/News'
import { Contact } from './pages/Contact/Contact'
import { Profile } from './pages/Profile/Profile'
import { Detail } from './pages/Detail/Detail'
import { UserTemplate } from './templates/UserTemplate/UserTemplate'
import { Login } from './pages/Login/Login'
import { CheckoutTemplate } from './templates/CheckoutTemplate/CheckoutTemplate'
import Checkout from './pages/Checkout/Checkout'
import { Register } from './pages/Register/Register'
import { Loading } from './pages/Loading/Loading'
import { AdminTemplate } from './templates/AdminTemplate/AdminTemplate'
import { Dashboard } from './pages/Admin/Dashboard/Dashboard'
import { Films } from './pages/Admin/Films/Films'
import { AddNew } from './pages/Admin/Films/AddNew/AddNew'
import { Showtime } from './pages/Admin/Showtime/Showtime'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-full'>
      <Routes>
        <Route element={<Loading />}>
        <Route element={<HomeTemplate />}>
          <Route index element={<Home />} />
          <Route path={PATH.contact} element={<Contact />} />
          <Route path={PATH.news} element={<News />} />
          <Route path={PATH.profile} element={<Profile />} />
          <Route path={PATH.details} element={<Detail />} />
        </Route>
        <Route element={<CheckoutTemplate />}>
          <Route path={PATH.checkout} element={<Checkout />} />
        </Route>
        <Route element={<UserTemplate />}>
          <Route path={PATH.login} element={<Login />} />
          <Route path={PATH.register} element={<Register />} />
        </Route>
        <Route element={<AdminTemplate />}>
          <Route path={PATH.admin} element={<Dashboard />} />
          <Route path={PATH.users} element={<Dashboard />} />
          <Route path={PATH.films} element={<Films/>} />
          <Route path={PATH.addnew} element={<AddNew/>} />
          <Route path={PATH.showtime} element={<Showtime/>} />
        </Route>
        </Route>
        


        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>

    </div>
  )
}

export default App
