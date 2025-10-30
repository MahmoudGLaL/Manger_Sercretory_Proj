'use client'

import Image, { StaticImageData } from 'next/image'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
// import useSocket from '@/app/api/Socket/useSoket'
import { Meeting } from '../types'
import { useWebSocket } from '@/app/context/WebSocketContext'

interface BackDropProps {
    showDeleteBackDrop: boolean
    header: string
    id: string
    setShowDeleteBackDrop: React.Dispatch<React.SetStateAction<boolean>>
    setShowDeleted: React.Dispatch<React.SetStateAction<boolean>>
    setOkDelete: React.Dispatch<React.SetStateAction<boolean>>
    // setMessage: React.Dispatch<React.SetStateAction<string>>
    setStudentData: React.Dispatch<React.SetStateAction<Meeting | undefined>>,
    image: StaticImageData | string
    // sendMessage : (msg: Meeting[] | string) => void
   // Ensure it's updating an array



}
const DeletionBackDropComp = ({ showDeleteBackDrop, header , setOkDelete ,setShowDeleteBackDrop, image, id   , setShowDeleted}: BackDropProps) => {
    // const [Loader, setLoader] = useState(true)
    //   const {  sendMessage } = useSocket('ws://128.16.66.169:7272');
     const {   sendMessage  } = useWebSocket();
    useEffect(() => {
       
        // setLoader(true)
        // if (header !== ''  ) {
        //     setTimeout(() => { setLoader(false) }, 1000)
        // }
    }, [header]);
    // const getOppointments = async () => {
    //     await axios.get("/api/oppointments").then((res) => {
    //         sendMessage(res.data)
    //         setStudentData(res.data)
    //     }).catch((e) => {
    //         console.log(e)
    //     })

    // }
    const DeleteStudent = async (id: string) => {
        // console.log(id);
        setOkDelete(true)
        await axios.delete(`/api/oppointments/${id}`).then((res) => {
            sendMessage(res.data)
            setShowDeleted(true)
        }
        ).catch((e) => {
            toast.error('خطأ في السيرفر')
            console.log(e);
        })
        setShowDeleteBackDrop(false)
    }
    return (
        <>
            {showDeleteBackDrop && <>
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-40  animate-swal2hide `} ></div>
                <div className={`fixed inset-0 flex items-center justify-center z-50 animate-swal2show animate-swal2hide `}>
                    {/* {Loader ? <DisablitySkeleton /> */}
                        : <div className="bg-white rounded shadow-lg pt-4 pb-10 px-12 text-center flex justify-center items-center flex-col ">
                            <h2 className={`text-2xl capitalize tracking-[2px] font-bold mt-4 mb-4 text-red-600 bg-gray-100 p-2  `}>
                                    هل انت متأكد انك تريد حذف هذا الطلب ؟
                                <span className='text-black'></span> </h2>
                            <div className='flex flex-col  justify-center items-center relative box-content shadow-md shadow-blue-300 text-center  rounded-full w-20 h-20 m-auto '>
                                <Image src={image} alt='emoji' width={900} height={900} objectFit="cover" className='w-20 h-20 transition-all duration-300 shadow-md shadow-gray-500  rounded-full' />
                            </div>
                            {header !== 'undefined' && header !== '' &&   <h2 className={`text-2xl capitalize font-bold mt-4 mb-4 text-black bg-gray-100 p-2  `}> {header} <span className='text-black'></span> </h2>}
                           
                            <div className='px-2 flex justify-between '>


                                <button className={` text-white mt-6 px-4 py-2 bg-red-600 hover:bg-red-500 rounded mx-4 tracking-[2px]  text-xl font-bold`} onClick={() => DeleteStudent(id)}>نعم</button>
                                <button className={` text-white mt-6 px-4 py-2 bg-green-600 hover:bg-green-500 rounded mx-4 tracking-[2px] text-xl font-bold`} onClick={() => setShowDeleteBackDrop(false)}>لا</button>

                            </div>

                            {/* <div className='text-[#ebb344] mb-8 font-bold text-4xl bg-gray-200 p-2  '>{Req_Data.id}</div> */}
                            {/* onClick={handlePrint} */}
                            {/* <button className="bg-[#ebb344] hover:bg-[#cca048] text-white px-4 py-2 rounded mx-4 text-xl font-bold"  >Print</button> */}
                        </div>
                        {/* } */}

                </div> </>
            }
        </>

    )
}

export default DeletionBackDropComp