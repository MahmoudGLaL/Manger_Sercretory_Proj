"use client";


import React  from 'react'

// import { AiFillSchedule } from "react-icons/ai";

// import { UploadFiles } from '../Utils/Cloudinary/CloudanryUpload';

// import Swal from 'sweetalert2';


interface FinalInfoProps {
    handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    // setFile: React.Dispatch<React.SetStateAction<string>>
    // errors: FormikErrors<FormikValues>
    id: string
    // values: T,

    Loader2 : boolean
}
// React.FC<FinalInfoProps<FormikValues>>
const FinalData: React.FC<FinalInfoProps> = ({
    id,
    Loader2


}) => {


    // const [PrevfileName, setPrevFileName] = useState("")
    // const [stopAnimate, setStopAnimate] = useState(false)
    // const [Ok, setOK] = useState(false)

    // const [UploadedSuc, setUploadedSuc] = useState(false)


    // const handleFileVaildate = (event: React.ChangeEvent<HTMLInputElement>, nextRef: React.RefObject<HTMLInputElement>) => {

    //     if (event.target.files && event.target.files[0]) {
    //         values.prevSchoolUrl = event.target.files[0]
    //     }
    //     if (nextRef.current) {
    //         nextRef.current.focus()
    //     }
    //     handleFileChange(event)

    // }
    // const ResetUpload = () => {
    //     // setFileName("")
    //     setPrevFileName(newfileName)
    //     setStopAnimate(true)

    // };
    // const ConfirmUpload = async () => {
    //     // setFileName("")
    //     setLoader(true)
    //     setOK(true)
    //     const uploaded = await UploadFiles(values.prevSchoolUrl, 'word')


    //     if (uploaded) {
    //         setFile(uploaded);
    //         setOK(false)
    //         setLoader(false)
    //         setUploadedSuc(true)
    //     }
    //     else {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'File Uploading has been Failed ',
    //             text: "sorry , There is an Error occured in your internet Connection , please Ensure That your Device is connected and try again .",
    //             confirmButtonText: 'OK',
    //         });
    //         // toast.error("sorry , there is an error in your internet Connection , please ensure your device is connected and try again ..")
    //         setNewFileName("")
    //         setFile('')
    //     }
    // };
    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setFile("");
    //     setNewFileName("")
    //     setLoader(false)
    //     setOK(true)
    //     if (event.target.files && event.target.files[0].size < 5 * 1024 * 1024) {

    //         values.prevSchoolUrl = event.target.files[0]

    //         setNewFileName(event.target.files[0].name)

    //         values.isTransformed = true
    //     }
    //     else {
    //         setFile("");
    //         values.isTransformed = false
    //         setNewFileName("")
    //     }



    // };





    return (
        <>

            <div className={`m-auto flex-grow my-2  flex w-48 mt-12 justify-center gap-2 items-center p-2 px-6   ${id ? 'bg-orange-400'  : 'bg-blue-400'} text-2xl rounded-lg w-fit font-semibold text-black ${id ? 'hover:bg-orange-300 text-center' : 'hover:bg-blue-300 text-center'}  `}>
                {Loader2 ? <div className="flex items-center justify-center space-x-2 py-4 ">
                    <div className={`w-3 h-3 rounded-full ${id ? 'animate-custBounce4' : 'animate-custBounce1'}  duration-300 transition-all`}></div>
                    <div className={`w-3 h-3 rounded-full ${id ? 'animate-custBounce5' : 'animate-custBounce2'}  duration-300`}></div>
                    <div className={`w-3 h-3 rounded-full ${id ? 'animate-custBounce6' : 'animate-custBounce3'}  duration-300`}></div>
                </div> : <button type='submit' className='text-center   text-2xl font-bold focus:outline-none flex gap-1'>    {id ? 'تعديل' :'إضافة'}   </button>}

                {/* <AiFillSchedule className=' text-2xl font-bold mt-1 ' /> */}


            </div>

        </>
    )
}

export default FinalData