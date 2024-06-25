import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { dangKyThunk } from '../../store/QuanLyNguoiDungReducer/thunk'
import { Navigate, useNavigate } from 'react-router-dom'
import { PATH } from '../../constants/config'

export const Register = () => {
    const {
        handleSubmit, // submit form
        register, // register field
        formState: { errors }, // validate
    
      } = useForm({
        mode: "onChange"
      })

      const dispatch = useDispatch()
      const navigate = useNavigate()
  return (
    <form className="max-w-md w-full p-6" onSubmit={handleSubmit((values) => {
    
        dispatch(dangKyThunk(values)).unwrap()
        .then((res)=>{
          navigate(PATH.login)
        })
        .catch((error)=>{
            return (error?.response?.data?.content)
        })
  
      })}>
        <h1 className="text-3xl font-semibold mb-6 text-black text-center">Đăng Ký</h1>
        <div action="#" method="POST" className="space-y-4">
          {/* Your form elements go here */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username {errors?.taiKhoan && <span className='text-danger'>({errors?.taiKhoan?.message})</span>}</label>
            <input type="text" id="username" name="username" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 form-control" {...register('taiKhoan', {
              required: 'Vui lòng nhập Username'
            })} />
            
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password {errors?.matKhau && <span className='text-danger'>({errors?.matKhau?.message})</span>}</label>
            <input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 form-control"  {...register('matKhau', {
              required: 'Vui lòng nhập mật khẩu'
            })} />
            
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email {errors?.email && <span className='text-danger'>({errors?.email?.message})</span>}</label>
            <input type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 form-control"  {...register('email', {
              required: 'Vui lòng nhập email@abc.com'
            })} />
            
          </div>
          <div>
            <label htmlFor="sdt" className="block text-sm font-medium text-gray-700">Số điện thoại {errors?.soDt && <span className='text-danger'>({errors?.soDt?.message})</span>}</label>
            <input type="sdt" id="sdt" name="sdt" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 form-control"  {...register('soDt', {
              required: 'Vui lòng nhập số điện thoại'
            })} />
            
          </div>
          <div>
            <label htmlFor="maNhom" className="block text-sm font-medium text-gray-700">Mã nhóm {errors?.maNhom && <span className='text-danger'>({errors?.maNhom?.message})</span>}</label>
            <input type="maNhom" id="maNhom" name="maNhom" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 form-control"  {...register('maNhom', {
              required: 'Vui lòng nhập mã nhóm'
            })} />
            
          </div>
          <div>
            <label htmlFor="hoTen" className="block text-sm font-medium text-gray-700">Họ tên {errors?.hoTen && <span className='text-danger'>({errors?.hoTen?.message})</span>}</label>
            <input type="hoTen" id="hoTen" name="hoTen" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 form-control"  {...register('hoTen', {
              required: 'Vui lòng nhập họ tên'
            })} />
            
          </div>
          <div>
            <button type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"  >Sign Up</button>
          </div>
        </div>
       
      </form>
  )
}
