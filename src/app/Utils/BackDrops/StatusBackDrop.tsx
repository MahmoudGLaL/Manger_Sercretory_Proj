'use client'

// import Image, { StaticImageData } from 'next/image'
import {  useEffect, useState } from 'react'
// import ContactInfoSkeleton from '../Skeletons/ContactInfoSkeleton'
// import { MyDays } from '../Constants/days'
import { RiCloseCircleFill } from "react-icons/ri";
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useStyles } from '../Some_Designs/DateDesign';
import { toast } from 'react-toastify';
import axios from 'axios';
// import useSocket from '@/app/api/Socket/useSoket';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { formData } from '../types';
import { useWebSocket } from '@/app/context/WebSocketContext';
// import moment from "moment";
// import { parse } from 'path';
// import { split } from 'postcss/lib/list';



interface BackDropProps {
    id: string
    MyStatus: string
    showBackDrop: boolean
    header: string
    styleColor: string
    setShowBackDrop: React.Dispatch<React.SetStateAction<boolean>>
    // setSound: React.Dispatch<React.SetStateAction<string>>
    // image: StaticImageData | string
    Name: string,
    time: string,
    situation: string,
    // sendMessage : (msg: Meeting[] | string) => void



}
const StatusBackDrop = ({ showBackDrop, header, Name, situation, setShowBackDrop, id ,   }: BackDropProps) => {
    // const [Loader, setLoader] = useState(false)
    const {  sendMessage  } = useWebSocket();
    const [Duration, setDuration] = useState('')
    const [Time, setTime] = useState('')
    const [SelectedDate, setSelectedDate] = useState<Date | null>(null)
    // const [Day, setDay] = useState('')
    const [changed3, setChanged3] = useState(false)
    const [clicked, setClicked] = useState(false)
    const classes = useStyles();

    useEffect(() => {
        setSelectedDate(new Date())
      
    }, [Name]);



    // const { setMessages } = useSocket('ws://128.16.66.169:7272');
    const UpdateStatus = async (id: string, formData: formData) => {


        await axios.patch(`/api/oppointments/${id}`, formData)
            .then((res) => {
                // setMessage(`${res.data}`)
                // console.log(res.data);

                // setLoader(false)
                setShowBackDrop(true)
                sendMessage(res.data)
            })
            .catch((error) => {
                // setLoader(false)
                toast.error(`خطأ في السيرفر`)
                // toast.error(`${error.response.TextStatus}`)
                console.error("Error:", error.response || error.message);
            });
    }
    // function formatTime(timeString: string) {
    //     const date = new Date();
    //     if (timeString.includes('٢٠٢٥')) {
    //         const isValidDate = moment(timeString, moment.ISO_8601, true).isValid();
    //         if (isValidDate) {
    //             const [hours, minutes] = timeString.split(":").map(Number); // Convert to numbers

    //             date.setHours(hours, minutes);

    //             return date.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit", hour12: true });
    //         }
    //     }

    //     else if (timeString !== '') {
    //         // return timeString

    //         date.setHours(parseInt(timeString.split(':')[0]))
    //         date.setMinutes(parseInt(timeString.split(':')[1]))
    //         return date.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit", hour12: true })
    //     }
    //     else return

    // }

    const handleDateChange = (e: MaterialUiPickersDate) => {
        // const valid = new Date(e)
        // setValidDate(isValid(valid))
        setSelectedDate(e)
    }

    const FormatDate = (Date: Date) => {
        const formattedDate = Date.toLocaleDateString('ar-EG', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        const formattedTime = Date.toLocaleTimeString('ar-EG', {
            hour: '2-digit',
            minute: '2-digit'
        })
        return `${formattedDate} الساعة ${formattedTime}`
    }


    const handleOK = async () => {
        const today = new Date()
        sendMessage('/sounds/otherTime.mp3')


        // sound : '/sounds/otherTime.mp3' 
        if (Duration) {
            // console.log('dur');
            const duration = parseInt(Duration.split(' ')[0])
            if (Duration.includes('S')) {

                today.setMinutes(today.getMinutes() + duration);
                await UpdateStatus(id, { status: 'مؤجل', oppointment: `${FormatDate(today)}`, has_oppointment: 'نعم' })
            }
            else if (Duration.includes('H')) {
                today.setHours(today.getHours() + duration);
                await UpdateStatus(id, { status: 'مؤجل', oppointment: `${FormatDate(today)}`, has_oppointment: 'نعم' })
            }
            else if (Duration.includes('D')) {
                today.setDate(today.getDate() + duration);
                await UpdateStatus(id, { status: 'مؤجل', oppointment: `${FormatDate(today)}`, has_oppointment: 'نعم' })
            }

        }
        else {
            if (SelectedDate && Time) {
                await UpdateStatus(id, { status: 'مؤجل', oppointment: `${SelectedDate} ${Time}`, has_oppointment: 'نعم' })
            }
            else if (Time) {
                await UpdateStatus(id, { status: 'مؤجل', oppointment: `${Time}`, has_oppointment: 'نعم' })
            }
            else if (SelectedDate) {
                await UpdateStatus(id, { status: 'مؤجل', oppointment: `${SelectedDate}`, has_oppointment: 'نعم' })
            }
            else {
                await UpdateStatus(id, { status: 'مؤجل', has_oppointment: 'لا' })
            }
        }


        setShowBackDrop(false)

    }


    return (
        <>
            {showBackDrop && <>
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-40  animate-swal2hide `} ></div>
                <div className={`fixed inset-0 flex items-center justify-center z-50 animate-swal2show animate-swal2hide `}>


                    <>
                        {true ? <div className="bg-white rounded shadow-lg pt-4 pb-10 px-28 w-[60%] text-center relative ">
                            {/* <div className='flex flex-col  justify-center items-center relative box-content shadow-md shadow-blue-300 text-center  rounded-full w-20 h-20 m-auto '>
                                    <Image src={image} alt='emoji' width={900} height={900} objectFit="cover" className='w-20 h-20 transition-all duration-300 shadow-md shadow-gray-500 hover:scale-[3] rounded-full' />
                                </div> */}
                            <h2 className={`text-2xl capitalize font-bold mt-4 mb-4 text-black bg-gray-100 p-2  `}> {header} <span className='text-black'></span> </h2>
                            <button
                                className="absolute top-10 left-10 text-black rounded text-xl font-bold"
                                onClick={() => setShowBackDrop(false)}
                            >
                                <RiCloseCircleFill className="text-black hover:text-gray-700 text-4xl" />
                            </button>

                            <div className='px-16'>
                                {Name !== 'undefined' &&
                                    <div className="flex justify-between items-start gap-6 w-full">
                                        <span className="font-bold  text-gray-800 w-[56%] text-xl mt-3">الأسم : </span>
                                        <span id='status'
                                            className="w-full font-bold tracking-[2px] text-xl lg:text-[9px] md:text-[7px] xl:text-[20px] box-content text-gray-800  px-8 py-2  "  >
                                            {Name}
                                        </span>
                                    </div>

                                }

                                {situation === 'طارئ' &&
                                    <div className="flex justify-between items-start gap-6 w-full mt-2">
                                        <span className="font-bold  text-gray-800 w-[56%] text-xl mt-3">الموقف : </span>
                                        <span id='status'
                                            className="w-full font-bold tracking-[2px] text-xl lg:text-[9px] md:text-[7px] xl:text-[20px] box-content text-gray-800  px-8 py-2  "  >
                                            {situation}
                                        </span>
                                    </div>

                                }
                                {/* {time !== 'undefined' &&
                                        <div className="flex justify-between items-start gap-6 w-full mt-2">
                                            <span className="font-bold  text-gray-800 w-[56%] text-xl mt-3">الميعاد : </span>
                                            <span id='status'
                                                className="w-full font-bold tracking-[2px] text-xl lg:text-[9px] md:text-[7px] xl:text-[20px] box-content text-gray-800  px-8 py-2  "  >
                                                {formatTime(time)}
                                            </span>
                                        </div>

                                    } */}
                            </div>

                            <div className='px-16'>

                                {/* <div className="flex justify-between items-start gap-6 w-full">
                                        <span className="font-bold  text-gray-800 w-[56%] text-xl mt-3">الحالة : </span>
                                        <select name="status" id='status'
                                            onChange={(e) => setStatus(e.target.value)}
                                            value={Status}
                                            className="w-full font-bold tracking-[2px] text-xl lg:text-[9px] md:text-[7px] xl:text-[20px] box-content text-gray-800 bg-white border   focus:border-blue-400 px-8 py-2 rounded-md outline-none  border-gray-300"  >
                                            <option value="مؤجل" className='font-bold w-full text-blue-500'>تأجيل</option>
                                            
                                        </select>
                                    </div> */}

                            </div>
                            {Duration !== 'اخرى' &&

                                <div className='px-16 w-full mt-4'>
                                    <div className="flex justify-between items-start gap-4 min-w-full">
                                        <span className="font-bold text-xl mt-3 text-gray-800 w-[56%]">فترة التأجيل :</span>
                                        <select name="Duration" id='Duration'
                                            onChange={(e) => setDuration(e.target.value)}
                                            value={Duration}
                                            className="w-full font-bold tracking-[2px] text-sm lg:text-[9px] md:text-[7px] xl:text-[20px] box-content text-gray-800 bg-white border   focus:border-blue-400 px-8 py-2 rounded-md outline-none  border-gray-300"  >
                                            <option value="" className='font-bold text-blue-500'  disabled>اختر الفتره</option>
                                            {/* <option value="30 S" className='font-bold text-blue-500' >ربع ساعه</option> */}
                                            <option value="30 S" className='font-bold text-blue-500' >نصف ساعه</option>
                                            <option value="1 H" className='font-bold text-blue-500' >ساعه</option>
                                            <option value="2 H" className='font-bold text-blue-500' >ساعتان</option>
                                            <option value="3 H" className='font-bold text-blue-500' >٣ ساعات</option>
                                            {/* <option value="4" className='font-bold text-blue-500' > ٤ ساعات</option> */}
                                            <option value="1 D" className='font-bold text-blue-500 border-t' >يوم</option>
                                            <option value="2 D" className='font-bold text-blue-500' >يومان</option>
                                            <option value="3 D" className='font-bold text-blue-500' > ٣ ايام</option>
                                            <option value="7 D" className='font-bold text-blue-500 border-t' >اسبوع</option>
                                            <option value="30 D" className='font-bold text-blue-500 border-t' >شهر</option>
                                            <option value="اخرى" className='font-bold text-blue-500 border-t' >اخرى</option>

                                        </select>
                                    </div>
                                </div>
                            }

                            {Duration === 'اخرى' &&

                                <div className='px-16 w-full mt-4'>
                                    <div className="flex justify-between items-start gap-4 w-full">
                                        <span className="font-bold text-xl mt-3 text-gray-800 w-[56%]">فترة التأجيل :</span>
                                        <div className="flex justify-between items-start gap-4 w-full px-0">
                                            {/* <select name="Day" id='Day'
                                                    onChange={(e) => setDay(e.target.value)}
                                                    value={Day}
                                                    className="w-32 font-bold tracking-[2px] text-sm lg:text-[9px] md:text-[7px] xl:text-[20px] box-content text-gray-800 bg-white border   focus:border-blue-400 px-8 py-2 rounded-md outline-none  border-gray-300"  >
                                                    <option value="" className='font-bold ' disabled selected>اختر اليوم</option>
                                                    {MyDays.map((day, index) => (
                                                        <option key={index} value={`${day}`} className='font-bold text-black'>{day}</option>
                                                    ))}
                                                </select> */}

                                            {!clicked && (
                                                <div className=" h-1 flex justify-start flex-col items-start tracking-[1px] gap-1 ">
                                                    <select
                                                        onChange={() => setChanged3(true)}
                                                        onClick={() => setClicked(true)}
                                                        className={`h-10 w-44 p-2   capitalize px-2 ${changed3 ? 'text-black' : 'text-[#9e9e9e]'} rounded-md py-3 text-right font-bold xl:text-[18px] lg:text-[12px] md:text-[16px] focus:border-b-2 outline-none border-b border-gray-300 transition-all  ${!clicked ? classes.fadeIn : classes.fadeOut}`}
                                                    >
                                                        <option value=""  disabled className="text-gray-600 tracking-[2px]">التاريخ</option>
                                                    </select>
                                                    {/* {
                                                            errors.BirthDate && <div className=' w-44 text-red-500 text-[10px] font-semibold'>
                                                                {errors.BirthDate && touched.BirthDate && <p>{String(errors.BirthDate)}</p>}
                                                            </div>
                                                        } */}
                                                </div>

                                            )}
                                            {clicked && (
                                                <div className=" h-1 flex justify-start flex-col items-start tracking-[1px] gap-1 ">
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <KeyboardDatePicker
                                                            name="BirthDate"
                                                            disableToolbar
                                                            format="dd / MM / yyyy"
                                                            margin="dense"
                                                            id="date-picker-inline"
                                                            value={SelectedDate}

                                                            required
                                                            onChange={(e) => handleDateChange(e)}
                                                            KeyboardButtonProps={{
                                                                'aria-label': 'change date',
                                                            }}
                                                            className={`${classes.datePicker}`}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                    {/* {
                                                            ValidDate && errors.BirthDate && <div className=' w-44 text-red-500 text-[10px] font-semibold'>
                                                                {errors.BirthDate && touched.BirthDate && <p>{String(errors.BirthDate)}</p>}
                                                            </div>
                                                        } */}
                                                </div>

                                            )}
                                            <input name='time' type="time"
                                                value={Time}
                                                onChange={(e) => { setTime(e.target.value) }}
                                                placeholder='الوقت' className={` w-36 font-bold tracking-[2px] text-sm lg:text-[9px] md:text-[7px] xl:text-[21px] box-content text-gray-800 bg-white border   focus:border-blue-400 px-8 py-2 rounded-md outline-none  border-gray-300`} />
                                        </div>

                                    </div>
                                </div>
                            }





                            <button className={` text-white mt-6 px-12 py-2 bg-green-500 hover:bg-green-400 rounded mx-4  text-xl font-bold`} onClick={handleOK}>تأكيد</button>


                        </div> : <> </>}

                    </>


                </div> </>
            }
        </>

    )
}

export default StatusBackDrop