'use client'
import React, { useEffect, useState } from 'react'
// import Layout from '../Layout/layout'
import Image from 'next/image'
import AddstudentImg from '../../Images/Students/house-model-beside-pen-form-indicating-real-estate-theme_892776-51112.jpg'
import style from '../CSS/addStudent.module.css'
import { initialValues2 } from '../Utils/Constants/fornikIntilais'
import { Meeting } from '../Utils/types'
import { useFormik } from 'formik'
import { StudentMangerSchema } from '../Utils/ValidationScheam'
import { toast, ToastContainer } from 'react-toastify'
import FinalData from './finalData'
// import { MdEmojiEmotions } from "react-icons/md";
// import Swal from 'sweetalert2';
import BackDropComp from '../Utils/BackDrops/backDrop'
// import emoji from '../../Images/gif/2.gif'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Meeting_Requests from './meeting_req'
import { useWebSocket } from '../context/WebSocketContext'
import Layout from '../_Layout/layout'
import Cookie from "js-cookie";
import SecBackDrop from '../Utils/BackDrops/secBackDrop'
// import useSocket from '../api/Socket/useSoket'
// import Cookie from "js-cookie";
// import { log } from 'console'


const AddStudent = () => {


    // const [ImageFile, setImageFile] = useState("");
    // const [positionX, setPositionX] = useState(50);
    // const [data, setApproved] = useState<Meeting>()
    // const [file, setFile] = useState("");
    // const [selectedDate, setSelectedDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 20, 0, 1)))
    // const [Nationality, setNationality] = useState("")
    // const [Disablity, setDisablity] = useState("")
    // const [Gender, setGender] = useState("")
    const [showBackDrop, setShowBackDrop] = useState(false)
    const [Loader, setLoader] = useState(false)
    const [Role, setRole] = useState<string | null>()
    const { sendMessage, messages, setCall, Call , Status } = useWebSocket(); 
    // const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isImageVisible, setIsImageVisible] = useState(false);
    const [isComponentVisible, setIsComponentVisible] = useState(false);
    // sendMessage
    const router = useRouter()


    const playAudio = (sound: string) => {
        if (sound === 'any') return;
        const audio = new Audio(sound);
        audio.play().catch((err) => console.error("Audio play failed:", err));
      };
    //   const {  sendMessage } =useSocket('ws://128.16.66.169:7272');

    // formik.setFieldValue('prevSchoolUrl', event.target.files[0]);

    useEffect(() => {
        // const img = new window.Image();
        // img.src = AddstudentImg.src; 
        // img.onload = () => setIsImageLoaded(true);
        const user = Cookie.get("role")
        // console.log(user);
        setRole(user)
        setTimeout(() => {
            setIsImageVisible(true);
        }, 200);

        setTimeout(() => {
            setIsComponentVisible(true);
        }, 500)
    }, [])


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


    }, [Call, messages ])





    const handleError = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        toast.error(" من فضلك تحقق من صلاحية البيانات ")
        // toast.error(`${JSON.stringify(errors, null, 2)}`)
    }



    const { handleChange, handleBlur,
        handleSubmit, errors, touched, isValid, setFieldValue } = useFormik({
            initialValues: initialValues2,
            validationSchema: StudentMangerSchema,
            onSubmit: async (values: Meeting,) => {

                setLoader(true)


                axios.post("/api/oppointments", values)
                    .then((res) => {

                        setLoader(false)
                        setShowBackDrop(true)
                        // action.resetForm()
                        // setMessages(res.data)
                        sendMessage(res.data)
                        sendMessage('/sounds/ferest.mp3')
                        setTimeout(()=>{router.push("/AllOppointments")},3000)

                    })
                    .catch((error) => {
                        setLoader(false)
                        toast.error(`${error.response.statusText}`)
                        console.error("Error:", error.response || error.message);
                    });



                // actions.resetForm()
            }
        })



    return (
        // <Layout>
        <Layout>

            <div className={`flex justify-center items-center h-lvh  transition-all duration-1000 ease-out ${isComponentVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-10'
                } `}>
                <div className={`flex-grow h-lvh  bg-white p-4  w-full  `}>
                    <form action="" className={` flex justify-start items-start flex-col  `} onSubmit={isValid ? handleSubmit : handleError}>
                        <h1 className='text-3xl tracking-[2px] font-bold border-b border-black text-center mt-8 w-fit my-2 m-auto'>
                            إضافة مقابله
                        </h1>



                        <Meeting_Requests id='' update={false} Data={initialValues2} handleBlur={handleBlur} handleChange={handleChange} errors={errors}
                            touched={touched} StyleNum={`${style.num}`} setFieldValue={setFieldValue} />


                        <FinalData id='' handleBlur={handleBlur} handleChange={handleChange}
                            Loader2={Loader} />


                    </form>

                </div>
                <div className={`h-lvh transition-opacity duration-1000 ${isImageVisible ? 'opacity-100' : 'opacity-0'
                    } `}>
                    <Image src={AddstudentImg} alt='' className='h-lvh w-[600px] shadow-lg shadow-gray-400 ' />
                </div>
                <BackDropComp OkDelete={false} showBackDrop={showBackDrop} setShowBackDrop={setShowBackDrop} id={''} ButtonstyleColor="bg-indigo-500 hover:bg-indigo-400" styleColor='text-indigo-500' header={"تم أضافة الطلب بنجاح"} />

                <ToastContainer />
                {Status === 'secretory'  && <SecBackDrop showBackDrop={true} ButtonstyleColor="bg-red-500 hover:bg-red-400" styleColor='text-red-500' header={`تم استدعائك من المدير 😊`} />}
            </div>

        </Layout>


    )
}


export default AddStudent

