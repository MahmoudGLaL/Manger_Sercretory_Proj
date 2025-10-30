'use client'

// import Image from 'next/image'
import React, { useEffect, useState } from 'react'
// import avatar from '../../Images/avatar.png'
import { LuPenSquare } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { BsChatSquareQuoteFill } from "react-icons/bs";
// import { formatDate } from '../Utils/FormateDate';
import { MangerSearchCriteria, Meeting, } from '../Utils/types';
import axios from 'axios';
// import { FaAngleUp } from "react-icons/fa";
// import { FaAngleDown } from "react-icons/fa";
import { motion } from "framer-motion";
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
// import useSocket from '../api/Socket/useSoket';

import { useWebSocket } from '../context/WebSocketContext';
// import moment from "moment";
// type PlayFunction = () => void;
interface Data {
  id: number,
  // lastIndex: boolean,
  // firstIndex: boolean,
  searched: boolean,
  name: string,
  phoneNum: string,
  type: string,
  situation: string,
  has_oppointment: string,
  oppointment: string,
  rank: string,
  status: string,
  visit_times: string,
  subject: string,
  order: number,
  region: string,
  side: string,
  Role: string,
  setFilterdData: React.Dispatch<React.SetStateAction<Meeting[]>>
  setStudentData: React.Dispatch<React.SetStateAction<Meeting | undefined>>,
  // setShowBackDrop: React.Dispatch<React.SetStateAction<boolean>>,
  setStatusBackDrop: React.Dispatch<React.SetStateAction<boolean>>,
  setShowDeleteBackDrop: React.Dispatch<React.SetStateAction<boolean>>,
  setSearched: React.Dispatch<React.SetStateAction<boolean>>,
  setShowTopicBackDrop: React.Dispatch<React.SetStateAction<boolean>>,
  setDelID: React.Dispatch<React.SetStateAction<number>>,

  MangerSearchCriteria: MangerSearchCriteria
  // sendMessage : (msg: Meeting[] | string) => void
// Ensure it's updating an array


}

// lastIndex, firstIndex
const TableData = ({ id, name, phoneNum, type, situation, has_oppointment, oppointment, rank, status, visit_times , Role ,
  order, region, side , setStatusBackDrop, searched, setShowTopicBackDrop, MangerSearchCriteria , setSearched , 
  setStudentData, setShowDeleteBackDrop, setDelID }: Data) => {

  // const Router = useRouter()
  // const [myOrder, setMyOrder] = useState(1);
  // const [MyUderOrder, setMyUderOrder] = useState(1);
  // const [AboveOrder, setAboveOrder] = useState(1);
  // const [AboveId, setAboveId] = useState(1);
  // const [UderId, setUderId] = useState(1);
  // const [Data, setData] = useState([]);
  const {   sendMessage } = useWebSocket();
  const [Focus, setFocus] = useState('');

  // const date = new Date();
  // const { setMessages } = useSocket('ws://128.16.66.169:7272');

  useEffect(() => {
    setFocus(status)


  }, [])


  const getOppointmentsData = async (id: number) => {

    await axios.get(`/api/oppointments/${id}`).then((res) => {
      setStudentData(res.data)
    }
    ).catch((e) => {
      console.log(e);
    })
  }

  //   const getStudents = async () => {
  //   await axios.get("/api/students").then((res) => {
  //   }).catch((e) => {
  //     console.log(e)
  //   })

  // }


  // const getStudentData = async (id: number) => {
  //   StudentApi(id)
  //   setShowBackDrop(true)
  // }

  // const getStudenDisablity = async (id: number) => {
  //   StudentApi(id)
  //   setShowDisablityBackDrop(true)
  // }
  const GetDeleted = async (id: number) => {
    setDelID(id)
    getOppointmentsData(id)
    setShowDeleteBackDrop(true)
  }
  const GetTopic = async (id: number) => {
    getOppointmentsData(id)
    setShowTopicBackDrop(true)
  }
  const alterStatus = async (id: number) => {
    setFocus('مؤجل')
    setStatusBackDrop(true)
    getOppointmentsData(id)
  }

  const ChangeStatus = async (id: number, Status: string, visit: boolean = false) => {
    if (visit) {

      axios.get(`/api/oppointments/${id}`).then((res) => {
        // console.log(parseInt(res?.data?.visit_times)+ 1);
        const newVisitTimes = parseInt(res?.data?.visit_times) + 1;
        axios.patch(`/api/oppointments/${id}`, { status: Status, visit_times: newVisitTimes.toString() , updatedAt : new Date()  })
          .then((res) => {
            // setSound('/sounds/left.mp3')
            sendMessage(res.data)
            sendMessage('/sounds/ferest.mp3')

            MangerSearchCriteria.name = "" 
            setSearched(false)
            // setMessages("manger")
            // console.log(res);
          })
      }
      )
        .catch((error) => {
          toast.error(`خطأ في السيرفر`)
          // toast.error(`${error.response.TextStatus}`)
          console.error("Error:", error.response || error.message);
        });
    }
    else {
      setFocus(Status)
      await axios.patch(`/api/oppointments/${id}`, { status: Status , updatedAt : new Date() })
        .then((res) => {
          sendMessage(Status === 'دخول' ? '/sounds/enter.mp3' : Status === 'انتظار' ? '/sounds/left.mp3' : Status === 'مرفوض' ? '/sounds/refuse.mp3' : '/sounds/otherTime.mp3' )
          sendMessage(res.data)
          // setMessages(res.data)
          // setMessages("manger")


          // console.log(res);

        })
        .catch((error) => {
          toast.error(`خطأ في السيرفر`)
          // toast.error(`${error.response.TextStatus}`)
          console.error("Error:", error.response || error.message);
        });
    }



  }
  // const handleNav = async (id: number) => {
  //   Router.push(`/oppointmentUpdate/${id}`)
  // }
  // const handleUp = async (id: number) => {
  //   getOppointmentsData(id)
  //   // setMyOrder()
  // }
  // const handleDown = async (id: number) => {

  //   getOppointmentsData(id)
  //   if (Data?.order) {
  //     setMyOrder(Data.order - 1)
  //     setMyUderOrder(Data.order + 1)
  //   }
  // }

      function formatTime(timeString: string) {
          const date = new Date();
         if (timeString !== '') {
              // return timeString
  
              date.setHours(parseInt(timeString.split(':')[0]))
              date.setMinutes(parseInt(timeString.split(':')[1]))
              return date.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit", hour12: true })
          }
          else return
  
      }




  return (
    // onDoubleClick={() => GetDetails(id)}
    <motion.tr
      key={order}
      initial={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }} // Moves left before disappearing
      transition={{ duration: 0.4 }}
      className={`border-b ${(Role !== 'manger' && status === 'دخول') ? 'bg-green-200  hover:bg-gray-100 text-black' :
        (Role !== 'manger' && !searched && status === 'مرفوض') ? 'bg-red-200  hover:bg-red-100 text-black' :
          (Role !== 'manger' && !searched && status === 'انتظار') ? 'bg-yellow-200  hover:bg-yellow-100 text-black' :
            (Role !== 'manger' && !searched && status === 'مؤجل') ? 'bg-blue-200  hover:bg-blue-100 text-black' :
              (Role !== 'manger' && !searched && status === 'خروج') ? 'bg-cyan-200-200  hover:bg-cyan-200-100 text-black'
                : ' hover:bg-gray-100 text-black'}  text-center py-12`}
    >
      <td className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>
        {/* <div className="flex flex-col justify-center items-center gap-1 ">
          {!firstIndex && <FaAngleUp onClick={() => handleUp(id)} className="text-3xl  p-2 bg-gray-100 hover:text-white hover:bg-gray-900" />}
          {!lastIndex && <FaAngleDown onClick={() => handleDown(id)} className="text-3xl p-2 bg-gray-100 hover:text-white hover:bg-gray-900" />}
        </div> */}
      </td>
      <td className='border-t border-[#e7eaec] leading-[1.42857] py-[26px] align-top  text-base lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold '>{name}</td>
      <td className='border-t border-[#e7eaec] leading-[1.42857] py-[26px] align-top  text-base lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>{phoneNum}</td>
      <td className='border-t border-[#e7eaec] leading-[1.42857] py-[26px] align-top  text-base lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>{type}</td>
      <td className='border-t border-[#e7eaec] leading-[1.42857] py-[26px] align-top  text-base lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>{rank}</td>
      <td className='border-t border-[#e7eaec] leading-[1.42857] py-[26px] md:py-[22px] align-top  text-base lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>
        <div className={`${(has_oppointment === 'نعم' || oppointment) ? ' bg-gray-100 text-lg  lg:text-[9px] md:text-[7px] xl:text-[16px]  lg:px-2 xl:px-3  tracking-[1px] text-green-500 rounded-md ' : ''}`}>{(has_oppointment === 'نعم' || oppointment) ? 'نعم' : 'لا'}
        </div>
      </td>
      <td className={`border-t  border-[#e7eaec] leading-[1.42857] py-[26px] align-top  text-base lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold`}>{
        oppointment.includes('الساعة') ? <div className='flex flex-col justify-center items-center gap-2'> <span>{oppointment?.split('الساعة')[0]}</span> <span>{oppointment?.split('الساعة')[1]}</span></div> : formatTime(oppointment)}</td>
      <td className={`border-t border-[#e7eaec] leading-[1.42857] py-[26px] align-top ${side === 'خارج المركز' ? 'text-blue-500' : ''}  text-base lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold`}>{side === 'خارج المركز' ? `${region !== '' ? region : side}` : `${side}`}</td>
      {/* <td className='border-t border-[#e7eaec] leading-[1.42857] py-[26px] align-top  text-base lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>{region}</td> */}
      <td className={`border-t border-[#e7eaec] leading-[1.42857]  align-top   lg:px-2 xl:px-3 py-[26px]  
      text-base lg:text-[9px] md:text-[7px] xl:text-[16px]  text-wrap w-fit tracking-[1px] font-bold`}> <div className={`${situation === 'طارئ' ? ' bg-gray-100   text-red-500 rounded-md ' : ''}`}>{situation} </div></td>
      <td className='border-t border-[#e7eaec] leading-[1.42857]  align-top  text-base lg:text-[9px] md:text-[7px] py-[26px]  xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>{parseInt(visit_times) < 50 ? visit_times : '--'}</td>
      {/* <td className='border-t border-[#e7eaec] leading-[1.42857] py-[26px] align-top  text-base lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>{subject}</td> */}
      {/* <td className='border-t border-[#e7eaec] leading-[1.42857] py-[18px] align-top  text-base lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>{order}</td> */}
      {/* <td className='border-t border-[#e7eaec] leading-[1.42857] py-[18px] align-top  text-base lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>{info}</td> */}
      <td className={`border-t border-[#e7eaec] leading-[1.42857] py-[18px] align-top  text-base lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold`}>
        {/* onClick={() => alterStatus(id)} */}
        {/* status === Focus */}
        {Role === 'manger' ? <div className='flex gap-3 justify-center items-center'>
          <div onClick={() => ChangeStatus(id, 'انتظار')}
            className={`p-[6px] cursor-pointer lg:text-[9px] md:text-[7px] xl:text-[16px]   ${Focus === 'انتظار' ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-slate-600'} 
           hover:bg-yellow-400 hover:text-slate-900 rounded-md ` }>
            انتظار
          </div>
          <div onClick={() => ChangeStatus(id, 'دخول')}
            className={`p-[6px] cursor-pointer lg:text-[9px] md:text-[7px] xl:text-[16px]   ${Focus === 'دخول' ? 'bg-green-500 text-white' : 'bg-green-100 text-slate-600'} 
           hover:bg-green-600 hover:text-white rounded-md ` }>
            دخول
          </div>
          <div onClick={() => ChangeStatus(id, 'مرفوض')}
            className={`p-[6px] cursor-pointer lg:text-[9px] md:text-[7px] xl:text-[16px]   ${Focus === 'مرفوض' ? 'bg-red-500 text-white' : 'bg-red-100 text-slate-600'} 
           hover:bg-red-600 hover:text-white rounded-md ` }>
            رفض
          </div>
          <div onClick={() => alterStatus(id)}
            className={`p-[6px] cursor-pointer lg:text-[9px] md:text-[7px] xl:text-[16px]   ${Focus === 'مؤجل' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-slate-600'} 
           hover:bg-blue-600 hover:text-white rounded-md ` }>
            تأجيل
          </div>
        </div> : ( MangerSearchCriteria.name !== '' && status !== 'دخول')  ? <div onClick={() => ChangeStatus(id, 'انتظار' , true)} className={`${status === 'انتظار' ? ' p-2  text-slate-800   bg-yellow-500  ' : status === 'دخول' ?
          ' text-white p-2  bg-green-500 ' : status === 'مرفوض' ? '  text-white p-2 bg-red-400 ' : status === 'خروج' ?
            'lg:text-[9px] md:text-[7px] xl:text-[16px] text-white p-2  bg-indigo-400 rounded-md' : '  text-white p-2  bg-blue-400 '} cursor-pointer rounded-md lg:text-[9px] md:text-[7px] xl:text-[16px]`}>
          وضع فى الأنتظار
        </div> : <div className={`${status === 'انتظار' ? 'p-2  lg:text-[9px] md:text-[7px] xl:text-[16px] text-slate-800   bg-yellow-500 rounded-md ' : status === 'دخول' ?
          'lg:text-[9px] md:text-[7px] xl:text-[16px] text-white p-2  bg-green-500 rounded-md' : status === 'مرفوض' ? ' lg:text-[9px] md:text-[7px] xl:text-[16px] text-white p-2 bg-red-400 rounded-md' :
            status === 'خروج' ?
              'lg:text-[9px] md:text-[7px] xl:text-[16px] text-white p-2  bg-teal-600 rounded-md' : ' lg:text-[9px] md:text-[7px] xl:text-[16px] text-white p-2 bg-blue-400 rounded-md'}`}>
          {status}
        </div>

        }

      </td>

      <td className={`border-b w-fit border-[#e7eaec] text-sm lg:text-[9px] md:text-[7px] xl:text-[16px] px-8 font-bold`}>
        <div className={`flex gap-10 justify-center items-center ${ oppointment.includes('٢٠٢٥')  ? '-mt-6' : ''}`}>
          <button className={`p-2 bg-black hover:bg-gray-800 text-white outline-none transition-colors  duration-150 w-fit rounded-md`} onClick={() => GetTopic(id)}> <BsChatSquareQuoteFill className={'text-white xl:text-lg lg:text-md md:text-base'} /></button>
          {Role !== 'manger' &&
            <>
              <Link href={`/oppointmentUpdate/${id}`} className="w-fit inline-block">
                <button className={` p-2 bg-orange-400   hover:bg-orange-300 outline-none transition-colors duration-150 w-fit rounded-md flex items-center`}>
                  <LuPenSquare className='text-white xl:text-lg lg:text-md md:text-base' />
                </button>
              </Link>


              <button className={`p-2 bg-red-500 hover:bg-red-400 outline-none transition-colors  duration-150 w-fit rounded-md`} onClick={() => GetDeleted(id)}> <MdDelete className={'text-white xl:text-lg lg:text-md md:text-base'} /></button>
            </>

          }
        </div>
      </td>
      {Role === 'manger' &&
        <td className={`border-b w-fit border-[#e7eaec]   text-sm lg:text-[9px] md:text-[7px] xl:text-[16px] px-8 font-bold pr-6`}>

        </td>
      }





    </motion.tr>
    // motion.tr
  )
}

export default TableData