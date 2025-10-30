"use client";

// import Image, { StaticImageData } from 'next/image'
// import { motion } from "framer-motion"
// import { useEffect, useState } from "react"
// import Add_Img from '../../../Images/emoji/laughing.gif'




interface BackDropProps {
    showBackDrop: boolean
    header: string

    styleColor: string
    setShowBackDrop: React.Dispatch<React.SetStateAction<boolean>>
    ButtonstyleColor: string


}


const TopicBackDrop = ({ showBackDrop, header, ButtonstyleColor, setShowBackDrop, }: BackDropProps) => {

    const handleNav = () => {
        setShowBackDrop(false)
    }

    return (
        <>
            {showBackDrop && <>
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-40  animate-swal2hide `} ></div>
                <div className={`fixed inset-0 flex items-center justify-center z-50 animate-swal2show animate-swal2hide  `}>
                    <div className="bg-white rounded shadow-lg pt-6 pb-12 px-32 text-center ">
                        {header !== 'undefined' ? <h2 className={`text-2xl tracking-wide font-bold text-wrap leading-relaxed w-72 mt-5 mb-5 text-black `}> {header === '' ? 'لم يتم إضافة موضوع المقابله' : header} </h2> :
                            <div className="flex justify-center items-center h-24 space-x-2  w-full">
                            <span className="w-4 h-4 bg-black rounded-full animate-move1"></span>
                            <span className="w-4 h-4 bg-black rounded-full animate-move2"></span>
                            <span className="w-4 h-4 bg-black rounded-full animate-move3"></span>
                          </div>}

                        {/* <p className="mb-4 capitalize font-bold text-xl text-gray-800">{message}</p> */}
                        {/* <div className='text-[#ebb344] mb-8 font-bold text-4xl bg-gray-200 p-2  '>{Req_Data.id}</div> */}
                        <button className={` text-white mt-3 px-4 py-2 ${ButtonstyleColor} rounded mx-4  text-xl font-bold`} onClick={() => handleNav()}>تم</button>
                        {/* onClick={handlePrint} */}
                        {/* <button className="bg-[#ebb344] hover:bg-[#cca048] text-white px-4 py-2 rounded mx-4 text-xl font-bold"  >Print</button> */}
                    </div>
                </div> </>
            }
        </>

    )
}

export default TopicBackDrop

// {showBackDrop && <>
//     <div className={`fixed inset-0 bg-black bg-opacity-50 z-40  animate-swal2hide `} ></div>
//     <div className={`fixed inset-0 flex items-center justify-center z-50 animate-swal2show animate-swal2hide `}>
//         <div className="bg-white rounded shadow-lg pt-4 pb-10 px-24 text-center ">
//             <div className='flex flex-col justify-center items-center relative box-content text-center  rounded-full w-20 h-20 m-auto '>
//                 <Image src={image} alt='emoji' className={`${id ? 'w-40 h-40' : 'w-20 h-20'} `} />
//             </div>
//             <h2 className={`text-2xl font-bold mt-4 mb-4 ${styleColor} `}> {header} </h2>
//             <p className="mb-4 capitalize font-bold text-xl text-gray-800">{message}</p>
//             {/* <div className='text-[#ebb344] mb-8 font-bold text-4xl bg-gray-200 p-2  '>{Req_Data.id}</div> */}
//             <button  className={` text-white  px-4 py-2 ${ButtonstyleColor} rounded mx-4  text-xl font-bold`} onClick={()=>handleNav(id) }>Ok</button>
//             {/* onClick={handlePrint} */}
//             {/* <button className="bg-[#ebb344] hover:bg-[#cca048] text-white px-4 py-2 rounded mx-4 text-xl font-bold"  >Print</button> */}
//         </div>
//     </div> </>
// }