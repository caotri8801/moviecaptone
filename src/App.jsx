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


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route element={<HomeTemplate/>}>
          <Route index element={<Home />} />
          <Route path={PATH.contact} element={<Contact/>} />
          <Route path={PATH.news} element={<News/>} />
          <Route path={PATH.profile} element={<Profile/>} />
          <Route path={PATH.details} element={<Detail/>}/>
        </Route>
        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
 
    </div>
  )
}

export default App
