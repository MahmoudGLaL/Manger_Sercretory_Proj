"use client";
import React, { useEffect, useState } from 'react'
import { IconType } from 'react-icons';


import Link from 'next/link';
import { MdScheduleSend } from "react-icons/md";
import { GrSchedules } from "react-icons/gr";
import { TbLogout2 } from "react-icons/tb";
import Cookie from "js-cookie";

interface SideNavProps {
    sideHeader: string,
    img: string
    navStyle: string,
    liStyle: string,
    active: string,
    liText: Array<string>,
    url: Array<string>,
    last_url: Array<string> | '',
    OtherliText: Array<string> | '',
    Icons: IconType[],
    otherIcons: IconType[]
}

const MangerSideNav = ({  navStyle, liStyle, active }: SideNavProps) => {

    const [activeIndex, setActiveIndex] = useState('');
    // const lastindex = liText.length;
    // const [Hover, setHover] = useState(false);
    // const [InUpdate, setInUpdate] = useState(false);
    // const router = useRouter()

    useEffect(() => {
        const storedIndex = Cookie.get('activeIndex');
        if (storedIndex) {
            setActiveIndex(storedIndex);
        }
        // setInUpdate(location.href.includes('UpdateStudent'));


    }, []);

    //           // if(InUpdate) {
    //     router.back()
    //     location.href = `192.16.66.169:7373/${url}`
    // }
    // else {
    //     router.push(`${url}`);
    // }

    // legacyBehavior

    const handleClick = (index: string) => {
        setActiveIndex(index);
        Cookie.set('activeIndex', index);
        // console.log(url);


        // router.push(`${url}`);


    };
    const LogOut = async () => {
        await Promise.all([
          Cookie.remove('user'),
          Cookie.remove('role')
        ]);
    
        // router.replace('/')
    
      }


    // const handleClick2 = (index: string) => {

    //     setActiveIndex(index);
    //     localStorage.setItem('activeIndex', index);
    //     // router.push(`${url}`);

    // };



    // Students
    // bg-blue-400
    //hover:text-blue-600

    // Add Student
    // All Students
    // Student Courses
    // Student Sections 
    // Students Table
    // Student Grades

    // Student complaints
    // Student Problems

    // bg-[rgb(238,238,238)] p-2 text-blue-600 border-r-2 border-blue-600

    return (
        <nav className={`bg-sidenav font-tajawal  overflow-x-hidden sticky duration-500 m-0  top-0 left-0 w-64 ${navStyle} h-lvh `} dir='rtl'>
            <div className={`md:font-[600] bg-slate-50/10   md:text-[14px] md:p-2 text-[#fff] mb-6 md:mb-8 text-lg p-2  m-0 text-center`}>
                {/*  {toggleButton === true ? <img src={image} alt= " text-[#ffff] " className={`block w-10 h-10 bg-transparent rounded-full`} /> : <div className='font-tajawal'>منظومة تحصيلات بنك جلال</div>} */}
                <div className='flex justify-center items-center gap-4 text-center font-bold text-2xl  hover:-translate-y-1  transition-all duration-700' >
                    . . .
                </div>
            </div>


            <ul dir='ltr' className='flex justify-between items-center  p-2 flex-col h-[90vh] '>
                <div>

                    <Link
                        // replace={true}
                        // scroll = {false} 
                        href={`/Secreatory`}
                        // prefetch = {false}
                        // onClick={test}
                        onClick={() => handleClick(`1`)}
                        // ${activeIndex === 0 ? "bg-[rgba(177,175,175,0.51)] p-2 text-[#f0bb51] border-r-2 border-[#f0bb51] " : "text-[#ffff] "}

                        className={`flex  ${activeIndex === `1` ? `${active}` : ""} md:gap-5 cursor-pointer items-center my-3 text-xl  duration-300 hover:bg-white  ${liStyle} hover:font-bold hover:py-2 transition-[2s] `}>

                        <MdScheduleSend className="ms-5 text-[20px]" />
                        <p className={` mx-5 font-bold `}> إضافة ميعاد </p>
                    </Link>

                    <Link
                        // replace={true}
                        // scroll = {false} 
                        href={`/AllOppointments`}
                        // prefetch = {false}
                        // onClick={test}
                        onClick={() => handleClick(`2`)}
                        // ${activeIndex === 0 ? "bg-[rgba(177,175,175,0.51)] p-2 text-[#f0bb51] border-r-2 border-[#f0bb51] " : "text-[#ffff] "}

                        className={`flex  ${activeIndex === `2` ? `${active}` : ""} md:gap-5 cursor-pointer items-center my-6  text-xl duration-300 hover:bg-white  ${liStyle} hover:font-bold hover:py-2 transition-[2s] `}>

                        <GrSchedules className="ms-5 text-[20px]" />
                        <p className={` mx-5 font-bold `}>   جميع المواعيد</p>
                    </Link>
                    <Link
                        // replace={true}
                        // scroll = {false} 
                        href={`/AddUsers`}
                        // prefetch = {false}
                        // onClick={test}
                        onClick={() => handleClick(`3`)}
                        // ${activeIndex === 0 ? "bg-[rgba(177,175,175,0.51)] p-2 text-[#f0bb51] border-r-2 border-[#f0bb51] " : "text-[#ffff] "}

                        className={`flex  ${activeIndex === `3` ? `${active}` : ""} md:gap-5 cursor-pointer items-center my-3 text-xl  duration-300 hover:bg-white  ${liStyle} hover:font-bold hover:py-2 transition-[2s] `}>

                        <MdScheduleSend className="ms-5 text-[20px]" />
                        <p className={` mx-5 font-bold `}> إضافة مستخدم </p>
                    </Link>
                    <Link
                        // replace={true}
                        // scroll = {false} 
                        href={`/AllUsers`}
                        // prefetch = {false}
                        // onClick={test}
                        onClick={() => handleClick(`4`)}
                        // ${activeIndex === 0 ? "bg-[rgba(177,175,175,0.51)] p-2 text-[#f0bb51] border-r-2 border-[#f0bb51] " : "text-[#ffff] "}

                        className={`flex  ${activeIndex === `4` ? `${active}` : ""} md:gap-5 cursor-pointer items-center my-6  text-xl duration-300 hover:bg-white  ${liStyle} hover:font-bold hover:py-2 transition-[2s] `}>

                        <GrSchedules className="ms-5 text-[20px]" />
                        <p className={` mx-5 font-bold `}>   جميع المستخدمين</p>
                    </Link>



                </div>
                <div>

                    <Link
                        // replace={true}
                        // scroll = {false} 
                        href={`/`}
                        // prefetch = {false}
                        // onClick={test}
                        onClick={LogOut}
                        // ${activeIndex === 0 ? "bg-[rgba(177,175,175,0.51)] p-2 text-[#f0bb51] border-r-2 border-[#f0bb51] " : "text-[#ffff] "}

                        className={`flex  ${activeIndex === `1` ? `${active}` : ""} md:gap-5 cursor-pointer items-center my-3 text-xl  duration-300 hover:bg-white  ${liStyle} hover:font-bold hover:py-2 transition-[2s] `}>

                        <TbLogout2 className="ms-5 text-[20px]" />
                        <p className={` mx-5 font-bold `}>  تسجيل خروج </p>
                    </Link>

                 


                </div>





            </ul>
        </nav>
    )
}

export default MangerSideNav

// e.preventDeafult in next is bad stopping for code execution 