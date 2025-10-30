
'use client'
import React, { useEffect, useState } from 'react'
import Layout from '@/app/_Layout/layout'
import Image from 'next/image'
// import AddstudentImg from '../../../Images/Students/house-model-beside-pen-form-indicating-real-estate-theme_892776-51112.jpg'
import update from '../../../Images/Students/update.png'
import style from '../../CSS/addStudent.module.css'
// import { initialValues } from '../../Utils/Constants/fornikIntilais'
// import { getUpdatedValues } from '../../Utils/Constants/fornikIntilais'
import { Meeting } from '../../Utils/types'
import { useFormik } from 'formik'
import { StudentMangerSchema } from '../../Utils/ValidationScheam'
import { toast, ToastContainer } from 'react-toastify'

import Meeting_Requests from '../../Secreatory/meeting_req'
import FinalData from '../../Secreatory/finalData'
// import { MdEmojiEmotions } from "react-icons/md";
// import Swal from 'sweetalert2';
import BackDropComp from '../../Utils/BackDrops/backDrop'
// import emoji from '../../../Images/emoji/emojis.gif'
import axios from 'axios'
// import { useRouter } from 'next/navigation'
// import useSocket from '@/app/api/Socket/useSoket'
import { useWebSocket } from '@/app/context/WebSocketContext'
import SecBackDrop from '@/app/Utils/BackDrops/secBackDrop'
import Cookie from "js-cookie";

// import { FormikErrors } from 'formik';
// import { log } from 'console'

interface SId {
    params: { id: string }
}


const UpdateStudent = ({ params }: SId) => {


    const [Role, setRole] = useState<string | null>()
    const { sendMessage, messages, setCall, Call, Status } = useWebSocket();



    // const [Message, setMessage] = useState("")
    const [showBackDrop, setShowBackDrop] = useState(false)
    const [Loader, setLoader] = useState(false)
    const [StudentData, setStudentData] = useState<Meeting>()
    // let formData = {}

    // const { id } = useParams()

    // console.log(StudentData);

    // formik.setFieldValue('prevSchoolUrl', event.target.files[0]);
    // const { sendMessage } = useSocket('ws://128.16.66.169:7272')

    useEffect(() => {
        if (params.id) {
            StudentApi(parseInt(params.id))
        }
        const user = Cookie.get("role")
        // console.log(user);
        setRole(user)

    }, [params.id])

    useEffect(() => {
    }, [StudentData])

    const playAudio = (sound: string) => {
        const audio = new Audio(sound);
        audio.play().catch((err) => console.error("Audio play failed:", err));
    };
    //   const {  sendMessage } =useSocket('ws://128.16.66.169:7272');

    // formik.setFieldValue('prevSchoolUrl', event.target.files[0]);


    // const [firstTime, setFirstTime] = useState(true)


    useEffect(() => {
        // Ensure socket is defined before setting the listener
        // console.log('allOppoint',messages);
        if (

            ((Call?.includes("alret_manger") || Call?.includes("lana.mp3")) && Role === "manger") ||

            ((!Call?.includes("alret_manger") && !Call?.includes("lana.mp3")) && Role !== "manger")

        ) {

            playAudio(Call);
            setCall(""); // Reset Call state
        }




    }, [Call, messages])

    const handleError = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        toast.error("من فضلك تحقق من صحة البيانات")
        // toast.error(`${JSON.stringify(errors, null, 2)}`)
    }

    const StudentApi = async (id: number) => {

        await axios.get(`/api/oppointments/${id}`).then((res) => {


            setStudentData(res.data)
        }
        ).catch((e) => {
            console.log(e);
        })
    }
    const UpdateStudent = async (id: string, formData: Meeting) => {
        formData.updatedAt = new Date()
        await axios.put(`/api/oppointments/${id}`, formData)
            .then((res) => {
                // setMessage(`${res.data}`)
                sendMessage(res.data)
                // setMessages(res.data)

                setLoader(false)
                setShowBackDrop(true)
                // action.resetForm()
                // localStorage.setItem('activeIndex', '1')

            })
            .catch((error) => {
                setLoader(false)
                toast.error(`خطأ في السيرفر`)
                // toast.error(`${error.response.TextStatus}`)
                console.error("Error:", error.response || error.message);
            });
    }

    const initialValues: Meeting = {
        name: StudentData?.name || '',
        type: StudentData?.type || '',
        rank: StudentData?.rank || '',
        phoneNum: StudentData?.phoneNum || '',
        has_oppointment: StudentData?.has_oppointment || '',
        oppointment: StudentData?.oppointment || '',
        situation: StudentData?.situation || '',
        side: StudentData?.side || '',
        region: StudentData?.region || '',
        subject: StudentData?.subject || '',
        updatedAt: StudentData?.updatedAt || new Date(),
    };


    const { handleChange, handleBlur,
        handleSubmit, errors, touched, isValid, setFieldValue } = useFormik({
            // initialValues: {
            //     name: StudentData?.name || '',
            //     type: StudentData?.type || '',
            //     rank: StudentData?.rank || '',
            //     phoneNum: StudentData?.phoneNum || '',
            //     has_oppointment: StudentData?.has_oppointment || false,
            //     oppointment: StudentData?.oppointment || '',
            //     situation: StudentData?.situation || '',
            //     side: StudentData?.side || '',
            //     region: StudentData?.region || '',
            //     subject: StudentData?.subject || '',
            // },
            initialValues,
            enableReinitialize: true,
            validationSchema: StudentMangerSchema,
            onSubmit: async (values: Meeting) => {
                UpdateStudent(params.id, values)
                setLoader(true)
            }
        })

    // ${StudentData.prev_school ? 'gap-1' : 'gap-3'} 

    return (
        <Layout>
            <div className='flex justify-center items-center h-lvh   '>
                <div className={`flex-grow h-lvh  bg-white p-4  w-full pl-20   `}>  {/* StudentData.prev_school */}
                    <form action="" className={` flex justify-start items-start flex-col   `} onSubmit={isValid ? handleSubmit : handleError}>
                        <h1 className='text-3xl tracking-[2px] font-bold border-b border-black text-center mt-8 w-fit my-2 m-auto'>
                            تعديل مقابله
                        </h1>
                        <>
                            {
                                StudentData && <Meeting_Requests Data={StudentData} handleBlur={handleBlur} handleChange={handleChange} errors={errors}
                                    touched={touched} StyleNum={`${style.num}`} setFieldValue={setFieldValue} id={params.id} update={true} />
                            }

                            <FinalData handleBlur={handleBlur} handleChange={handleChange}
                                Loader2={Loader} id={params.id} />
                        </>
                        {/* id = {params.id} update = {true} */}



                    </form>
                    {/* {process.env.NODE_ENV === 'development' && (
                        <div style={{ marginTop: '20px', padding: '10px', background: '#f9f9f9', border: '1px solid #ddd' }}>
                            <h4>Formik Debug Info</h4>
                            <pre>Errors: {JSON.stringify(errors, null, 2)}</pre>
                            <pre>Touched: {JSON.stringify(touched, null, 2)}</pre>
                        </div>
                    )} */}
                </div>
                <div className='h-lvh   '>
                    <Image src={update} alt='' className='h-lvh w-[600px] shadow-lg shadow-gray-400 ' />
                </div>
                <BackDropComp OkDelete={false} showBackDrop={showBackDrop} setShowBackDrop={setShowBackDrop} id={params.id} ButtonstyleColor="bg-indigo-500 hover:bg-indigo-400" styleColor='text-indigo-500' header={"Updated Successfully"} />
                {Status === 'secretory' && <SecBackDrop showBackDrop={true} ButtonstyleColor="bg-red-500 hover:bg-red-400" styleColor='text-red-500' header={`تم استدعائك من المدير 😊`} />}
                <ToastContainer />
            </div>
        </Layout>

    )
}


export default UpdateStudent

