import React from 'react'
import { PlayCircleOutlined } from '@ant-design/icons'
import './Flip_Film.css'
import { generatePath, useNavigate } from 'react-router-dom'
import { PATH } from '../../constants/config'

export const Flip_Film = ({ item }) => {
    const navigate = useNavigate()
    return (
        <div className="flip-card p-4">
            <div className="flip-card-inner">
                <div className="flip-card-front">

                    <img src={item.hinhAnh} alt="Avatar" style={{ width: '100%', height: '100%' }} onError={e => { e.target.onerror = null; e.target.src = 'https://picsum.photos/300/300'; }} />
                </div>
                <div className="flip-card-back" style={{ backgroundColor: 'rgba(0,0,0,.9)' }}>
                    <div  >
                        <img src={item.hinhAnh} alt="Avatar" style={{ position: 'absolute', width: '100%', height: '100%' }} onError={e => { e.target.onerror = null; e.target.src = 'https://picsum.photos/300/300'; }} />
                    </div>
                    <div className="w-full h-full" style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                            <div className="rounded-full cursor-pointer"><PlayCircleOutlined style={{ fontSize: '50px' }} /></div>
                            <div className="text-2xl mt-2 font-bold">{item.tenPhim}</div>
                        </div>
                    </div>

                </div>
            </div>
            <div onClick={() => {
                const path = generatePath(PATH.details, { id: item.maPhim })
                navigate(path)

            }} className="bg-orange-300 text-center cursor-pointer py-2 bg-indigo-300 my-2 text-success-50 font-bold">ĐẶT VÉ</div>
        </div>

    )
}
