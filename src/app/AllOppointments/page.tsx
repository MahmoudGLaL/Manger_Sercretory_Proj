'use client'
// import Layout from '../_Layout/layout'


import { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik';
import { AnimatePresence } from "framer-motion";
// motion,
// import emoji from '../../Images/emoji/sad.gif'

import IMG_Delete from '../../Images/gif/delete.gif'


// import avatar from '../../Images/avatar.png'


import { MangerSearchCriteria, Meeting, } from '../Utils/types';

// import { Howl } from 'howler';
import TableHeader from './TableHeader';
import TableData from './TableData';
import EmptyData from './EmptyData';
import Searching from './Searching';
// import DisablityBackDropComp from '../Utils/BackDrops/DisablityBackDrop';
import DeletionBackDropComp from '../Utils/BackDrops/DeletionBackDrop';
import BackDropComp from '../Utils/BackDrops/backDrop';

// import io from "socket.io-client";
import StatusBackDrop from '../Utils/BackDrops/StatusBackDrop';
import AddDropComp from '../Utils/BackDrops/AddDropComp';
import MangerMessage from '../Utils/BackDrops/MangerMessage';
import TopicBackDrop from '../Utils/BackDrops/TopicBackDrop';
import SecBackDrop from '../Utils/BackDrops/secBackDrop';
import { useRouter } from 'next/navigation';
import { TbLogout2 } from "react-icons/tb";
import Cookie from "js-cookie";
import { useWebSocket } from '../context/WebSocketContext';
import Layout from '../_Layout/layout';

// import socket from '../api/Socket/socket';
// import { getServerSideProps } from '../api/Socket/route';

// import PhoneBackDropComp from '../Utils/PhoneBackDrop'


const Showstudent = () => {
  // const [allStudents, setAllStudents] = useState([])
  const [studentData, setStudentData] = useState<Meeting>()
  const [searched, setSearched] = useState(false);
  // const [showBackDrop, setShowBackDrop] = useState(false)
  // const [showDisablityBackDrop, setShowDisablityBackDrop] = useState(false)
  const [showDeleteBackDrop, setShowDeleteBackDrop] = useState(false)
  const [MyStatusBackDrop, setMyStatusBackDrop] = useState(false)
  const [ShowDeleted, setShowDeleted] = useState(false)
  // const [ManMessage, setManMessage] = useState(false)
  const [Add, setAdd] = useState(false)

  // const [Sec, setSec] = useState(false)
  // const [First, setFirst] = useState(false)
  const [ShowTopicBackDrop, setShowTopicBackDrop] = useState(false)
  const [OkDelete, setOkDelete] = useState(false)
  // const [Message, setMessage] = useState('')
  const [DelID, setDelID] = useState(Number)
  // const [Sound, setSound] = useState('')
  const [SecStatus, setSecStatus] = useState('')
  const [Role, setRole] = useState("")

  // const [currentPage, setCurrentPage] = useState(1);
  const tableRef = useRef(null);
  const [FilterdData, setFilterdData] = useState<Meeting[]>([])

  const { messages, setCall, Status, Call, sendMessage } = useWebSocket();
  // const socket = io("ws://localhost:3001");

  const [ManSearchCriteria, setManSearchCriteria] = useState<MangerSearchCriteria>({
    name: "",
    status: "",
    rank: "",
    has_oppointment: "",
  });

  // const GetDetails = (id: string) => {
  //   console.log(id)
  // }
  const router = useRouter()
  // const {   } = useSoket('ws://128.16.66.169:7272');

  // const [play] = useSound(`${Sound}`);
  // const [play] = useSound(`/sounds/left.mp3`);
  // const sound = new Howl({
  //   src: ['/sounds/my-audio.mp3'],
  //   volume: 1.0,
  // });
  const playAudio = (sound: string) => {
    if (sound.includes('any') ) return;
    const audio = new Audio(sound);
    audio.play().catch((err) => console.error("Audio play failed:", err));
  };

  const filteredDate = (ComparedDate: Date) => {
    const date = new Date().toString();
    // const [year2, month2, day2] = ComparedDate.split("-");

    // // Convert month and day to numbers to remove leading zeros
    // const formattedDate2 = `${year2}-${parseInt(month2)}-${parseInt(day2)}`;
    // // Extract year, month, and day
    // const year = date.getFullYear();
    // const month = date.getMonth() + 1; // getMonth() returns 0-based index (Jan = 0)
    // const day = date.getDate();
    // 2025-02-18
    // const formattedDate = `${year}-${month}-${day}`;
    // '2025-02-25' 2025-2-25
    // console.log(formattedDate === '2025-2-25' );
    console.log(date , ComparedDate );
    
    // .slice(0,16) 
    return date.slice(0,16) === ComparedDate.toString().slice(0,16)

  };

  // const playAudio = (src: string = "/sounds/enter.mp3") => {
  //   const audio = new Audio(src);
  //   audio.play().catch((err) => console.error("Audio play failed:", err));
  // };

  // rm -rf .next
  useEffect(() => {

    const user = Cookie.get("role")
    // console.log(user);
    if (user)
      setRole(user)
  }, [])

  useEffect(() => {
    // Ensure socket is defined before setting the listener
    // console.log('allOppoint',messages);
    
    if (

      ((Call?.includes("alret_manger") || Call?.includes("lana.mp3" ) ) && Role === "manger") ||
      
      ((!Call?.includes("alret_manger") && !Call?.includes("lana.mp3") ) && Role !== "manger") 

    ) {
   
      playAudio(Call);
      setCall(""); // Reset Call state
    }



  }, [Call, messages]); // Only re-run when socket changes

  // Separate useEffect to handle audio playing logic
  // useEffect(() => {

  // }, [Call, Role, messages]); // Only re-run when Call or Role changes





  const handleGet = () => {
    // setSec(true)
    sendMessage('/sounds/ferest.mp3')
    sendMessage('secretory')
    // setCall('/sounds/ferest.mp3')
    // setStatus('secretory')

  }
  const LogOut = async () => {
    setCall("")
    sendMessage('/sounds/any.mp3')
    await Promise.all([
      Cookie.remove('user'),
      Cookie.remove('role')
    ]);

    router.replace('/')

  }




  // const FilterDate = (myDate: string) => {
  //   const givenDate = new Date(myDate);


  //   // Convert both dates to YYYY-MM-DD format to compare only the date part
  //   const givenDateString = givenDate.toISOString().split("T")[0];
  //   const todayString = today.toISOString().split("T")[0];

  //   return givenDateString === todayString;


  // }

  const countVisitors = (Dates: Meeting[]) => {
    let VisitorsNum = 0; // Initialize visitors count
    // Get today's date in YYYY-MM-DD format

    for (let i = 0; i < Dates?.length - 1; i++) {
      if (Dates[i]?.status !== 'خروج') {
        const givenDate = Dates[i]?.updatedAt; // Access `updatedAt` property safely

        if (filteredDate(givenDate)) {
          VisitorsNum++;
        }
      }

    }

    return VisitorsNum;
  };


  // 




  const { handleSubmit } = useFormik({
    initialValues: { ...ManSearchCriteria },
    onSubmit: async () => {
      // values.userId = localStorage.getItem("id")
      ManSearchCriteria.name = ""
      ManSearchCriteria.rank = ""
      ManSearchCriteria.status = ""
      ManSearchCriteria.has_oppointment = ""
      setSearched(false)

    }
  })


  return (
    <Layout>
      <div>
        <div className="w-[100%]" dir='rtl'>
          {Role !== 'manger' && <form onSubmit={handleSubmit} className=' bg-zinc-50 flex justify-between items-center py-4'>
            <Searching setSecStatus={setSecStatus} SecStatus={SecStatus} setAdd={setAdd} Data={messages} setSearched={setSearched}
              setMangerSearchCriteria={setManSearchCriteria} MangerSearchCriteria={ManSearchCriteria} setFilterdData={setFilterdData}
              FilterdData={FilterdData} searched={searched} />
          </form>}
          {Role === 'manger' && <div className=" text-center mx-6 ">
            {/* <label htmlFor="name" className='text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold text-gray-700  '>   Name : </label> */}
            <div className="relative flex justify-center gap-8 items-center py-4 mb-3 ">

              <label htmlFor="" className='py-2  text-sm lg:text-[15px] md:text-[10px] xl:text-[22px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>متبقى </label>
              <label htmlFor="" className='lg:text-[15px] md:text-[10px] xl:text-[22px] lg:px-2 xl:px-3'>:</label>
              <label htmlFor="" className='py-2  bg-gray-100 rounded-md text-green-500 text-sm lg:text-[15px] md:text-[10px] xl:text-[22px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>{countVisitors(messages)}</label>

              <div onClick={handleGet} className="w-fit mx-10 text-[15px] tracking-[1px] md:text-[12px] xl:text-[16px] flex cursor-pointer gap-2 text-black font-bold justify-center items-center bg-teal-500 hover:bg-teal-400 p-1 px-2 rounded-md ">
                استدعاء السكرتير
                {/* <BiSolidBellRing className='text-black' /> */}
              </div>
            </div>

          </div>}


          <table className="min-w-full border-collapse bg-white w-full px-5 " ref={tableRef}>
            <thead className='px-5'>
              <TableHeader Role={Role} />
            </thead>
            {
              searched ? <>
                <tbody className='text-[#414040] px-5'>
                  {
                    FilterdData?.length > 0 ? <> {FilterdData?.sort((a, b) => (b.order ?? 0) - (a.order ?? 0))?.map(({ id, name, type, rank, phoneNum, has_oppointment, oppointment,
                      situation, side, region, subject, status, order, visit_times }) => (

                      // setShowBackDrop={setShowBackDrop}
                      // <TableData setSearched={setSearched} MangerSearchCriteria={ManSearchCriteria} setShowTopicBackDrop={setShowTopicBackDrop}  searched={searched} key={id} id={parseInt(id)} name={name} type={type} rank={rank} phoneNum={phoneNum} oppointment={oppointment} has_oppointment={has_oppointment} order={order}
                      //   situation={situation} side={side} region={region} subject={subject} status={status} visit_times={visit_times}
                      //   setStudentData={setStudentData} 
                      //   setFilterdData={setFilterdData}  setShowDeleteBackDrop={setShowDeleteBackDrop}
                      // />

                      // firstIndex={index === 0} lastIndex={index === messages.length - 1}
                      <TableData Role={Role} setSearched={setSearched} MangerSearchCriteria={ManSearchCriteria} setShowTopicBackDrop={setShowTopicBackDrop} searched={false} key={id} id={id ? parseInt(id) : 0} name={name}
                        type={type} rank={rank} phoneNum={phoneNum} oppointment={oppointment} has_oppointment={has_oppointment} order={order ? order : 0}
                        situation={situation} setDelID={setDelID} side={side} region={region} subject={subject} status={status ? status : ''} visit_times={visit_times ? visit_times : ''}
                        setStudentData={setStudentData} setStatusBackDrop={setMyStatusBackDrop}
                        setFilterdData={setFilterdData} setShowDeleteBackDrop={setShowDeleteBackDrop}
                      />

                    ))}
                    </>
                      :
                      <>
                        <EmptyData />
                      </>
                  }



                </tbody>
              </>
                :
                <>
                  <tbody className='text-[#414040] px-5'>
                    <AnimatePresence>
                      {
                        messages?.length > 0 ? <> {messages?.filter((item: Meeting) => {
                          return (filteredDate(item?.updatedAt) && item.status !== 'خروج')
                        })?.sort((a, b) => (b.order ?? 0) - (a.order ?? 0)).map(({ id, name, type, rank, phoneNum, has_oppointment, oppointment,
                          situation, side, region, subject, status, visit_times, order }) => (
                          // firstIndex={index === 0} lastIndex={index === messages.length - 1}
                          <TableData Role={Role} setSearched={setSearched} MangerSearchCriteria={ManSearchCriteria} setShowTopicBackDrop={setShowTopicBackDrop} searched={false} key={id} id={id ? parseInt(id) : 0} name={name}
                            type={type} rank={rank} phoneNum={phoneNum} oppointment={oppointment} has_oppointment={has_oppointment} order={order ? order : 0}
                            situation={situation} setDelID={setDelID} side={side} region={region} subject={subject} status={status ? status : ''} visit_times={visit_times ? visit_times : ''}
                            setStudentData={setStudentData} setStatusBackDrop={setMyStatusBackDrop}
                            setFilterdData={setFilterdData} setShowDeleteBackDrop={setShowDeleteBackDrop}
                          />
                        ))}</> : <>
                          <EmptyData />
                        </>
                      }
                    </AnimatePresence>
                  </tbody>
                </>}

          </table>

          {/* <PhoneBackDropComp showBackDrop={showBackDrop} setShowBackDrop={setShowBackDrop} ButtonstyleColor="bg-indigo-500 hover:bg-indigo-400" styleColor='text-indigo-500'
            header={`${studentData?.firstName} ${studentData?.secondName}`} stud_Num={`${studentData?.StudentNum}`}
            student_Email={`${studentData?.st_Email}`} Dad_Num={`${studentData?.DadNum}`} Mom_Num={`${studentData?.MomNum}`}
            Grand_Num={`${studentData?.Grand_Num}`} Guard_Num={`${studentData?.guardNum}`} image={studentData?.imgUrl ? studentData?.imgUrl : avatar} />

          <DisablityBackDropComp showDisablityBackDrop={showDisablityBackDrop} setShowDisablityBackDrop={setShowDisablityBackDrop} 
           ButtonstyleColor="bg-gray-950 hover:bg-gray-800" styleColor='text-gray-950'
            header={`${studentData?.firstName} ${studentData?.secondName}`} special_needs={`${studentData?.special_needs}`} disablity_Desc={`${studentData?.disablity_Desc}`}
            image={studentData?.imgUrl ? studentData?.imgUrl : avatar} /> */}

          {/*  ButtonstyleColor="bg-gray-950 hover:bg-gray-800" */}
          <StatusBackDrop showBackDrop={MyStatusBackDrop} setShowBackDrop={setMyStatusBackDrop}
            styleColor='text-gray-950' MyStatus={`${studentData?.status}`} time={`${studentData?.oppointment}`}
            Name={`${studentData?.name}`} situation={`${studentData?.situation}`}
            header={`ادخال زياره`} id={`${studentData?.id}`} />


          <DeletionBackDropComp id={`${DelID}`} showDeleteBackDrop={showDeleteBackDrop} setShowDeleteBackDrop={setShowDeleteBackDrop}
            header={`${studentData?.name}`}
            setStudentData={setStudentData} setOkDelete={setOkDelete}
            setShowDeleted={setShowDeleted}
            image={IMG_Delete} />

          <BackDropComp id={''} OkDelete={OkDelete} showBackDrop={ShowDeleted} setShowBackDrop={setShowDeleted} ButtonstyleColor="bg-indigo-500 hover:bg-indigo-400" styleColor='text-indigo-500' header={"Delete Successfully"} />
          {/* Role */}
          <TopicBackDrop showBackDrop={ShowTopicBackDrop} setShowBackDrop={setShowTopicBackDrop} ButtonstyleColor="bg-indigo-500 hover:bg-indigo-400" styleColor='text-indigo-500' header={`${studentData?.subject}`} />
          {(Status === 'secretory' && Role !== 'manger') && <SecBackDrop showBackDrop={true} ButtonstyleColor="bg-red-500 hover:bg-red-400" styleColor='text-red-500' header={`تم استدعائك من المدير 😊`} />}

          <AddDropComp showBackDrop={Add} setShowBackDrop={setAdd} ButtonstyleColor="bg-indigo-500 hover:bg-indigo-400" styleColor='text-indigo-500' />
          {/* setSecStatus={setSecStatus} */}
          {(Status === 'respond' && Role === 'manger')
            && <MangerMessage ButtonstyleColor="bg-indigo-500 hover:bg-indigo-400" styleColor='text-indigo-500' />
          }
        </div>
        {Role !== 'admin' && <div onClick={LogOut} className=' bg-red-400 hover:bg-red-300 lg:text-[9px]  lg:w-8 lg:h-8 md:w-10 md:h-10 xl:w-12 xl:h-12  flex justify-center items-center rounded-md absolute left-10 bottom-6'> <TbLogout2 className='text-red-500 text-2xl lg:w-8 lg:h-8 md:w-12 md:h-12 xl:w-11 xl:h-11 rounded-md cursor-pointer  bg-gray-100 hover:bg-gray-50 border-gray-300 border' /> </div>}

      </div>

    </Layout>
  )
}

export default Showstudent

// if (typeof window !== "undefined") {
//     setRole(localStorage.getItem('role'));

// }

// const socket = io("http://128.16.66:7272", {
//   transports: ["websocket"], // Disable polling
// });
