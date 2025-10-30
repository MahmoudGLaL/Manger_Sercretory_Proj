'use client'
import React, { useEffect, useState } from 'react'
import { MangerSearchCriteria, Meeting } from '../Utils/types'
import { BiSolidBellRing } from "react-icons/bi";
import { useWebSocket } from '../context/WebSocketContext';

// import useSocket from '../api/Socket/useSoket';
// import { FaCircle } from "react-icons/fa6";
// import { FiSearch } from "react-icons/fi";
// import { PiPaintBrushHouseholdFill } from "react-icons/pi";


interface data {
    Data: Array<Meeting>
    setSearched: React.Dispatch<React.SetStateAction<boolean>>
    setAdd: React.Dispatch<React.SetStateAction<boolean>>
    // setManMessage: React.Dispatch<React.SetStateAction<boolean>>
    // setSound: React.Dispatch<React.SetStateAction<string>>
    // setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    setMangerSearchCriteria: React.Dispatch<React.SetStateAction<MangerSearchCriteria>>;
    setFilterdData: React.Dispatch<React.SetStateAction<Array<Meeting>>>
    FilterdData: Array<Meeting>
    MangerSearchCriteria: MangerSearchCriteria;
    searched: boolean
    SecStatus: string
    setSecStatus: React.Dispatch<React.SetStateAction<string>>
    // sendMessage : (msg: Meeting[] | string) => void
    // setMessages: React.Dispatch<React.SetStateAction<Meeting[]>>; // Ensure it's updating an array

    // sendMsg : any
    // handleSubmit: (e?: React.FormEvent<HTMLFormElement> | React.SyntheticEvent) => void
}
// , handleSubmit

// setCall = {setCall} setStatus = {setStatus} Status={Status}
const Searching = ({ Data, setSearched, SecStatus, setSecStatus,
    setFilterdData, setAdd, MangerSearchCriteria, setMangerSearchCriteria, FilterdData, searched }: data) => {
// setMessages
    const [NotFound, setNotFound] = useState(false)
      const {  setCall, Status, setStatus, sendMessage } = useWebSocket();
    // const { sendMessage , Status} = useSocket('ws://128.16.66.169:7272');
    // ('/sounds/alret_manger.mp3')
    // setSearched
    // setCurrentPage
    const [Loading, setLoading] = useState(false);
    useEffect(() => {
        if (Object.values(MangerSearchCriteria).some((val) => val !== "")) {
            handleFilter();
        }
        // console.log(SecStatus)

    }, [MangerSearchCriteria]);


    const handleSearchReload = () => {
        // sendMsg('hi')
        setLoading(true)
        setTimeout(() => {
            setSearched(true)
            setLoading(false)
            if (NotFound) {
                setAdd(true)
            }

        }, 1000);
    }

    const handleSearchChange = (e :  React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {

        setSearched(false)
        const { name, value  } = e.target;

        setMangerSearchCriteria(prevState => ({ ...prevState, [name]: value }));
        // setCurrentPage(1);

        if (value === '' || value === '0') {
            setSearched(false);
        }

    };
    const alretManger = () => {
        // setManMessage(true) 
        // setSound('/sounds/alret_manger.mp3')
        sendMessage("/sounds/alret_manger.mp3")
        sendMessage("respond")
        setCall("/sounds/alret_manger.mp3")
        setStatus("respond")
        setSecStatus("انتظار")

    };


    const handleFilter = () => {
        const filteredStud = Data?.filter(req => {

            return (
                MangerSearchCriteria?.name && req?.name.includes(MangerSearchCriteria.name ? MangerSearchCriteria.name : "") ||
                MangerSearchCriteria?.status && req?.status && req?.status.includes(MangerSearchCriteria.status ? MangerSearchCriteria.status : "") ||
                MangerSearchCriteria?.rank && req?.rank.includes(MangerSearchCriteria.rank ? MangerSearchCriteria.rank : "") ||
                MangerSearchCriteria?.has_oppointment && (req?.has_oppointment.includes(MangerSearchCriteria.has_oppointment ? MangerSearchCriteria.has_oppointment : "") ||
                    req?.oppointment !== '')
            )
        })
        setFilterdData(filteredStud)
        if (filteredStud?.length === 0 && MangerSearchCriteria?.name !== '') {
            setNotFound(true)
        }
        else {
            setNotFound(false)
        }
    };

    return (
        <div className="grid gap-2 justify-start items-start grid-cols-4 w-full">

            <div className=" text-left mx-6 ">
                {/* <label htmlFor="name" className='text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold text-gray-700  '>   Name : </label> */}
                <div className="relative flex items-center  ">
                    <input name="name" id='name' type="text"
                        onChange={handleSearchChange}
                        value={MangerSearchCriteria.name}
                        className="w-full font-bold tracking-[2px] md:h-3 xl:h-fit lg:h-fit text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] box-content text-gray-800 bg-white border   focus:border-blue-400 px-2 py-2 rounded-md outline-none  border-gray-300" placeholder="الأسم" />

                </div>
            </div>

            <div className=" text-left mx-6 ">
                {/* <label htmlFor="NationalID" className='text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold text-gray-700  '>   NationalID : </label> */}
                <div className="relative flex items-center  ">
                    <select name="status" id='status'
                        onChange={handleSearchChange}
                        value={MangerSearchCriteria.status}
                        className="w-full font-bold tracking-[2px] text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] box-content text-gray-800 bg-white border   focus:border-blue-400 px-2 py-2 rounded-md outline-none  border-gray-300"  >
                        <option value='' className='font-bold' disabled >الحالة</option>
                        <option value="انتظار" className='font-bold text-yellow-500'>انتظار</option>
                        <option value="دخول" className='font-bold text-green-500'>دخول</option>
                        <option value="مؤجل" className='font-bold text-blue-500'>مؤجل</option>
                        <option value="مرفوض" className='font-bold text-red-500'>مرفوض</option>
                        <option value="خروج" className='font-bold text-teal-600 '>خروج</option>
                        <option value="0" className='font-bold'>الكل</option>
                    </select>

                </div>
            </div>

            <div className=" text-left mx-6 ">
                {/* <label htmlFor="BirthDate" className='text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold text-gray-700  '>  BirthData : </label> */}
                <div className="relative flex items-center  ">
                    <select name="rank" id='rank'
                        onChange={handleSearchChange}
                        value={MangerSearchCriteria?.rank}
                        className="w-full font-bold text-sm tracking-[2px] lg:text-[9px] md:text-[7px] xl:text-[13px] box-content text-gray-800 bg-white border   focus:border-blue-400 px-2 py-2 rounded-md outline-none  border-gray-300"  >
                        <option value=''  disabled className='text-gray-600 tracking-[2px]'>الرتبه</option>
                        <option value='لواء' className='font-bold text-black tracking-[3px]'>لواء</option>
                        <option value='عميد' className='font-bold text-black tracking-[3px]'>عميد</option>
                        <option value='عقيد' className='font-bold text-black tracking-[3px]'>عقيد</option>
                        <option value='مقدم' className='font-bold text-black tracking-[3px]'>مقدم</option>
                        <option value='رائد' className='font-bold text-black tracking-[3px]'>رائد</option>
                        <option value='نقيب' className='font-bold text-black tracking-[3px]'>نقيب</option>
                        <option value='ملازم اول' className='font-bold text-black tracking-[3px]'>ملازم اول</option>
                        <option value='ملازم' className='font-bold text-black tracking-[3px]'>ملازم</option>
                        <option value='مساعد اول' className='font-bold text-black tracking-[3px]'>مساعد اول</option>
                        <option value="0" className='font-bold '>الكل</option>

                    </select>
                </div>



            </div>


            <div className=" text-left mx-6 ">
                {/* <label htmlFor="level" className='text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold text-gray-700  '>  Level : </label> */}
                <div className="relative flex items-center  ">
                    <select name="has_oppointment" id='has_oppointment'
                        onChange={handleSearchChange}
                        value={MangerSearchCriteria.has_oppointment}
                        className="w-full font-bold tracking-[2px] text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] box-content text-gray-800 bg-white border   focus:border-blue-400 px-2 py-2 rounded-md outline-none  border-gray-300"  >
                        <option value="" className='font-bold' disabled >  له ميعاد </option>
                        <option value="نعم" className='font-bold'> نعم </option>
                        <option value="لا" className='font-bold'> لا </option>
                        <option value="0" className='font-bold '>الكل</option>
                    </select>

                </div>
            </div>



{/* lg:text-[12px] md:text-[7px]  xl:text-[14px] p-1 px-6 border font-semibold bg-blue-400 text-white  hover:bg-blue-400 rounded-lg mx-5 */}
            {/* px-6 lg:text-[12px] md:text-[7px]  xl:text-[14px] p-1 border font-semibold rounded-lg bg-blue-400 hover:bg-blue-300 text-white mx-5 */}
            <div className="flex items-center justify-start flex-wrap text-left mx-1 my-2 w-full ">
                <button onClick={handleSearchReload} type='button' className=' lg:text-[12px] md:text-[7px]  xl:text-[14px] p-1 px-6  border font-semibold rounded-lg bg-blue-500 hover-bg-400 text-white mx-5'>
                    {/* <FiSearch/> */}
                    {Loading ? <>
                        <div className="w-4 h-4 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

                    </> : <>بحث</>}
                </button>
                <button type='submit' className=' lg:text-[12px] md:text-[7px]  xl:text-[14px] p-1 px-6 border font-semibold bg-gray-100  border-gray-400 hover:bg-gray-100 rounded-lg ' >
                    {/* <PiPaintBrushHouseholdFill/> */}
                    تصفيه
                </button>
                {searched ? <>
                    {FilterdData?.length > 0 ? <div className="flex items-center justify-start flex-wrap text-left l ">

                        <div className='text-base capitalize lg:text-[12px] md:text-[7px] mx-4  xl:text-[16px] tracking-[1px] p-1 px-2 border font-bold bg-gray-50  rounded-lg ' >
                            {/* <PiPaintBrushHouseholdFill/> */} تم إيجاد <span className='text-blue-500 font-bold p-1'>{`${FilterdData?.length}`}</span>  نتيجة

                        </div>


                    </div>
                        : <div className='text-base capitalize lg:text-[12px] md:text-[7px] mx-4  xl:text-[16px] tracking-[1px] p-1 px-2 border font-bold bg-gray-50  rounded-lg ' >
                            {/* <PiPaintBrushHouseholdFill/> */} تم إيجاد <span className='text-blue-500 font-bold p-1'>{`"0"`}</span>  نتيجة
                        </div>} </> : <></>}
            </div>
            <div></div>
            <div></div>


            <div className=" text-left px-6 my-2 flex justify-end  ">
                <div>
                </div>
                {SecStatus === '' ? <div onClick={alretManger} className="lg:text-[12px] md:text-[7px]  xl:text-[14px]  flex cursor-pointer gap-2 text-black font-bold justify-center items-center bg-orange-500 hover:bg-orange-400 p-1 px-2 rounded-md ">
                    مقابلة المدير
                    <BiSolidBellRing className='text-black' />
                </div> :  Status === 'yes' ? <div onClick={alretManger} className="lg:text-[12px] md:text-[7px]  xl:text-[14px]  flex cursor-pointer gap-2 text-black font-bold justify-center items-center bg-green-500 hover:bg-green-400 p-1 px-2 rounded-md ">
                    مقابلة المدير
                    <BiSolidBellRing className='text-black' />
                </div> : Status === 'no' ? <div onClick={alretManger} className="lg:text-[12px] md:text-[7px]  xl:text-[14px]  flex cursor-pointer gap-2 text-black font-bold justify-center items-center bg-red-500 hover:bg-red-400 p-1 px-2 rounded-md ">
                    مقابلة المدير
                    <BiSolidBellRing className='text-black' />
                </div> : <div onClick={alretManger} className="lg:text-[12px] md:text-[7px]  xl:text-[14px]  flex cursor-pointer gap-2 text-black font-bold justify-center items-center bg-yellow-500 hover:bg-yellow-400 p-1 px-2 rounded-md ">
                    مقابلة المدير
                    <BiSolidBellRing className='text-black' />
                </div>}


            </div>

            {/* ml-24 mt-5  */}






        </div>
    )
}

export default Searching