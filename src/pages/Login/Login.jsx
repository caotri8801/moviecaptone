import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { dangNhapThunk } from '../../store/QuanLyNguoiDungReducer/thunk'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

export const Login = () => {
  const {
    handleSubmit, // submit form
    register, // register field
    formState: { errors }, // validate

  } = useForm({
    mode: "onChange"
  })

  const dispatch = useDispatch()
  const  navigate = useNavigate();

  
  return (
    <form className="max-w-md w-full p-6" onSubmit={handleSubmit((values) => {
      dispatch(dangNhapThunk(values)).unwrap()
      .then((res)=>{
        navigate("/")
      })
      .catch((error)=>{
          return (error?.response?.data?.content)
      })

    })}>
      <h1 className="text-3xl font-semibold mb-6 text-black text-center">Đăng Nhập</h1>
      <div action="#" method="POST" className="space-y-4">
        {/* Your form elements go here */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" id="username" name="username" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 form-control" {...register('taiKhoan', {
            required: 'Vui lòng nhập Username'
          })} />
          {errors?.taiKhoan && <p className='text-danger'>{errors?.taiKhoan?.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 form-control"  {...register('matKhau', {
            required: 'Vui lòng nhập mật khẩu'
          })} />
          {errors?.matKhau && <p className='text-danger'>{errors?.matKhau?.message}</p>}
        </div>

        <div>
          <button type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"  >Sign Up</button>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>Đăng ký? <NavLink to="/register" className="text-black hover:underline">Click here</NavLink>
        </p>
      </div>
    </form>
  )
}
