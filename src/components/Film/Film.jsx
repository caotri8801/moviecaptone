import React from 'react'

export const Film = ({phim}) => {
  return (

              <div className="h-full bg-gray-100 bg-opacity-75 px-3 pt-3 pb-10 rounded-lg overflow-hidden text-center relative m-3">
                <div style={{backgroundColor:'gray', backgroundImage: `url(${phim.hinhAnh}) `, backgroundPosition:'center', backgroundSize:'100%', backgroundRepeat:'no-repeat'}}>
                  <img src={phim.hinhAnh} alt={phim.tenPhim} style={{opacity:0, width: '100%', height:"150px"}}/>
                </div>
                <h1 className="title-font sm:text-2xl !text-[1.2rem] font-medium text-gray-900 mb-3 h-12">{phim.tenPhim}</h1>
                <p className="leading-relaxed mb-3 h-16 mb-4">{phim.moTa.length > 70 ? <span>{phim.moTa.slice(0,70)} ...</span> :  <span>{phim.moTa}</span>}</p>
                <a className="text-indigo-500 inline-flex items-center">Đặt vé
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </a>
                
              </div>

  )
}
