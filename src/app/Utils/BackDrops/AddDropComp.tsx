"use client";

import Image from 'next/image'
// import { useRouter } from 'next/navigation'
import update_Img from '../../../Images/gif/ezgif-3603401574a212.gif'
import Link from 'next/link'


interface BackDropProps {
    showBackDrop: boolean

    styleColor: string
    setShowBackDrop: React.Dispatch<React.SetStateAction<boolean>>

    ButtonstyleColor: string


}


const AddDropComp = ({ showBackDrop,styleColor, ButtonstyleColor, setShowBackDrop,}: BackDropProps) => {

    const handleNav = () => {
        setShowBackDrop(false)
    }

    return (
        <>
            {showBackDrop && <>
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-40  animate-swal2hide `} ></div>
                <div className={`fixed inset-0 flex items-center justify-center z-50 animate-swal2show animate-swal2hide  `}>
                    <div className="bg-white rounded shadow-lg pt-6 pb-12 px-32 text-center ">
                        <div className='flex flex-col justify-center items-center relative box-content text-center  rounded-full  m-auto '>
                            <Image src={update_Img} alt='emoji' className='w-[20%] h-[20%]' />
                        </div>
                        <h2 className={`text-2xl font-bold mt-5 mb-5 ${styleColor} `}> هذا الزائر لم يتم إضافته من قبل هل ترغب في إضافته ؟</h2>
                        {/* <p className="mb-4 capitalize font-bold text-xl text-gray-800">{message}</p> */}
                        {/* <div className='text-[#ebb344] mb-8 font-bold text-4xl bg-gray-200 p-2  '>{Req_Data.id}</div> */}

                        <Link
                            // replace={true}
                            // scroll = {false} 
                            onClick={() => handleNav()}
                            href={`/Secreatory`}
                            // prefetch = {false}

                            className={` text-white mt-3 px-4 py-2 ${ButtonstyleColor} rounded mx-4  text-xl font-bold`}>

                            {/* <MdScheduleSend className="ms-5 text-[20px]" /> */}
                            نعم
                        </Link>

                        <button className='text-white mt-3 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded mx-4  text-xl font-bold' onClick={() => handleNav()}>لا</button>

                        {/* onClick={handlePrint} */}
                        {/* <button className="bg-[#ebb344] hover:bg-[#cca048] text-white px-4 py-2 rounded mx-4 text-xl font-bold"  >Print</button> */}
                    </div>
                </div> </>
            }
        </>

    )
}

export default AddDropComp

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