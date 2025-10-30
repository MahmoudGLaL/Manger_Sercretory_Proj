"use client";

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Add_Img from '../../../Images/emoji/laughing.gif'
import update_Img from '../../../Images/gif/update.gif'
import Delete_Img from '../../../Images/gif/delete2.gif'



interface BackDropProps {
    showBackDrop : boolean
    OkDelete : boolean
    header : string 
    // message : string
    styleColor : string
    setShowBackDrop :  React.Dispatch<React.SetStateAction<boolean>>
    // setOkDelete :  React.Dispatch<React.SetStateAction<boolean>>

    ButtonstyleColor : string
    id :string

}

// OkDelete = {OkDelete} setOkDelete = {setOkDelete}
const BackDropComp = ({showBackDrop , header   , OkDelete , styleColor , ButtonstyleColor , setShowBackDrop ,   id}:BackDropProps) => {
    const router = useRouter()
    const handleNav = (id : string) => {
        if(id)
        {
            router.back()
        }
        // setOkDelete(false) 
        setShowBackDrop(false) 
        
    }
    
    return (
        <>
            {showBackDrop && <>
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-40  animate-swal2hide `} ></div>
                <div className={`fixed inset-0 flex items-center justify-center z-50 animate-swal2show animate-swal2hide  `}>
                    <div className="bg-white rounded shadow-lg pt-6 pb-12 px-32 text-center ">
                        <div className='flex flex-col justify-center items-center relative box-content text-center  rounded-full  m-auto '>
                       <Image src={ OkDelete ? Delete_Img : id ? update_Img:  Add_Img } alt='emoji' className={ ` ${OkDelete ? 'w-[20%] h-[20%]' : id ? 'w-[60%] h-[60%]' : 'w-[20%] h-[20%]' } `} />
                        </div>
                        <h2 className={`text-2xl font-bold mt-5 mb-5  ${OkDelete ? 'text-red-500 ' : id ? 'text-yellow-700 ' : styleColor} `}> {OkDelete  ?  'تم الحذف بنجاح' : id ? 'تم التعديل بنجاح' : header  } </h2>
                        {/* <p className="mb-4 capitalize font-bold text-xl text-gray-800">{message}</p> */}
                        {/* <div className='text-[#ebb344] mb-8 font-bold text-4xl bg-gray-200 p-2  '>{Req_Data.id}</div> */}
                        <button  className={` text-white mt-3 px-4 py-2 ${OkDelete ? 'bg-red-500 hover:bg-red-400' : id ? 'bg-yellow-700 hover:bg-yellow-600' : ButtonstyleColor} rounded mx-4  text-xl font-bold`} onClick={()=>handleNav(id) }>Ok</button>
                        {/* onClick={handlePrint} */}
                        {/* <button className="bg-[#ebb344] hover:bg-[#cca048] text-white px-4 py-2 rounded mx-4 text-xl font-bold"  >Print</button> */}
                    </div>
                </div> </>
            }
        </>

    )
}

export default BackDropComp

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