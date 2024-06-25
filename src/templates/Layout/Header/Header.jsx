import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { PATH } from '../../../constants/config'
import { getUserLogin } from '../../../util/getUserLogin'
import { UserOutlined } from '@ant-design/icons';

export const Header = () => {
  const navigate = useNavigate()
  const renderThongTinLogin = () => {

    return (
      <div>
        {
          !getUserLogin() ? <div className="items-center flex-shrink-0 hidden lg:flex">
            <button className="self-center px-8 py-3 rounded" onClick={() => {
              navigate(PATH.login)
            }}>Sign in</button>
            <button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50" onClick={() => {
              navigate(PATH.register)
            }}>Sign up</button>
          </div> : <div className='flex'>
            <div className='flex items-center justify-center mr-3' style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              backgroundColor: 'green'
            }}><UserOutlined /></div>
            <div style={{
              height: 40,
            }} className='flex items-center'>
              Wellcome! {getUserLogin().content.taiKhoan}
            </div>
          </div>
          
        }
      </div>
    )
  }
  return (
    <header className="p-4 bg-gray-100 text-gray-800 bg-opacity-75 bg-black text-white fixed w-full z-10">
      <div className="container flex justify-between h-8 mx-auto">
        <NavLink to={PATH.home} rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2">
          <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="anhcyberlearn" />
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            {/* <NavLink to="/" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600 text-white" activeClassName="border-b-2 border-white">Home</NavLink> */}
            <NavLink to={PATH.home} rel="noopener noreferrer" href="#" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600 text-white" >Home</NavLink>
          </li>
          <li className="flex">
            <NavLink to={PATH.contact} rel="noopener noreferrer" href="#" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600 text-white" >Contact</NavLink>
          </li>
          <li className="flex">
            <NavLink to={PATH.news} rel="noopener noreferrer" href="#" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600 text-white">News</NavLink>
          </li>
          <li className="flex">
            <NavLink to={PATH.profile} rel="noopener noreferrer" href="#" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600 text-white" >Profile</NavLink>
          </li>
        </ul>
        {
          renderThongTinLogin()
        }
        <button className="p-4 lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-800">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>



  )
}
