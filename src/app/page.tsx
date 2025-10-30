"use client";
import React, { useCallback, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';

// import Image2 from '../../assests/bank-building.png'
import logo from '../Images/login/logo2.png'
// import side from '../Images/login/sideLogin.jpg'
import Cookie from "js-cookie";
import axios from 'axios';
import Image from 'next/image';
import { MdRemoveRedEye } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";




const Login = () => {

  const [isLoading, setisLoading] = useState(false)
  const [Visable, setVisable] = useState(false)
  const [Show, setShow] = useState(false)
  // let [toggle, setToggle] = useState(false)
  // let [User, setUser] = useState('')
  // const [selectedOption, setSelectedOption] = useState('');

  const router = useRouter()

  const initialValues = {
    username: '',
    password: '',
    // role : ''
  };


useEffect(() => {
  router.prefetch("/AllUsers");
  router.prefetch("/AllOppointments");
  router.prefetch("/Secreatory");
}, []);







  async function LoginAPI(values: object) {
    // console.log(values);
    setisLoading(true); // Start loading state
  
    try {
      const res = await axios.post("/api/login", values);
      const { role, username, id } = res.data;
  
      // Store data in cookies asynchronously
      await Promise.all([
        Cookie.set("user", username),
        Cookie.set("role", role),
        Cookie.set("id", id),
        role === "admin" ? Cookie.set("activeIndex", "4") : null,
      ]);
     
      // Redirect based on role
      router.replace(role === "admin" ? "/AllUsers" : "/AllOppointments");
  
      // Show success message
      toast.success("تم تسجيل الدخول بنجاح");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("خطأ في تسجيل الدخول");
    } finally {
      setisLoading(false); // Stop loading state
    }
  }


  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault()
    formik.handleChange(e)
    setVisable(true)
  }
  const KeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // e.preventDefault()
    const value = (e.target as HTMLInputElement).value
    if (value !== '') {
      setVisable(true)
    }
    else {
      setVisable(false)
    }

  }
  const KeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // e.preventDefault()
    const value = (e.target as HTMLInputElement).value
    if (value !== '') {
      setVisable(true)
    }
    else {
      setVisable(false)
    }


  }


  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      setisLoading(true)
      LoginAPI(values)

      // setTimeout(() => {

      // }, [800])

    }
  })

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  }, [formik]);



  return (
    <div className='' dir='rtl'>

      <div className=" tracking-[1px] min-h-screen flex  items-center justify-between  login_background  ">
        <div className="  sm:min-w-[90%]   sm:px-4 px-32 2xl:px-28  lg:min-w-[90%] lg:px-16 xl:min-w-[64%] xl:px-20 md:px-12 min-h-[100vh] border  col-md-4 border-gray-300  md:min-w-[100%] max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto bg-white ">
          <form method="POST" className="  space-y-4 p-12 m-auto translate-y-[50%] border lg:w-[50%]  lg:px-16 xl:w-[70%] md:w-[60%] border-gray-500 rounded-lg " onSubmit={handleSubmit} >
            {/* <div className="mb-8 text-center ">
                <h3 className="text-gray-800 text-2xl font-bold">تسجيل الدخول</h3>
              </div> */}
            <div className='w-24 h-24 flex items-center justify-center text-center m-auto mb-10'>
              <Image className='' src={logo} alt="logo" />
            </div>
            <div>



              <div className="relative flex items-center ">
                <input onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="username" type="text" required className="w-full font-bold text-lg mb-2 text-gray-800 border  border-gray-300 px-4 rounded-lg outline-blue-500 h-100 py-2" placeholder="المستخدم" />

              </div>
            </div>
            <div>
              <div className="relative flex items-center">
                <input onChange={handlePassword}
                  onKeyDown={KeyDown}
                  onKeyUp={KeyUp}
                  onBlur={formik.handleBlur}
                  name="password" type={`${Show ? 'text' : 'password'}`} required className="w-full font-bold text-lg text-gray-800 border border-gray-300 px-4  rounded-lg outline-blue-500 py-2 h-100" placeholder="كلمة السر" />
                {Visable && (
                  <MdRemoveRedEye onClick={() => setShow(!Show)} className="text-lg text-slate-400 animate-pulse transition-all duration-700 hover:text-slate-500 w-7 h-6 absolute top-3 left-6" />
                )}

              </div>
            </div>



            <div className="">
              <button type="submit" className="w-full text-lg  font-semibold shadow-xl py-2 px-4  tracking-wide rounded-lg text-white bg-blue-600 mt-4 hover:bg-blue-500 focus:outline-none">
                {isLoading ? <> <div className="flex justify-center items-center ">
                  <div className="w-8  border-4 border-white border-t-transparent border-solid rounded-full animate-spin h-8"></div>
                </div>
                </> : ' تسجيل الدخول'}
              </button>
            </div>

          </form>
        </div>



        {/* 
        <div className="   w-full text-center   left-side p-0 sm:hidden sm:w-0 ">
          <div className='relative flex justify-center items-center'>
            <Image src={side} alt="" className='opacity-60 min-h-[100vh]' />
          
         
          </div>

        </div> */}


      </div>
      {/* {toggle && <>
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-40  ${toggle ? '' : 'animate-swal2hide'} `}  ></div>
        <div className={`fixed inset-0 flex items-center justify-center z-50  ${toggle ? 'animate-swal2show' : 'animate-swal2hide'} `}>
          <form className="my-form" onSubmit={formik.handleSubmit}  >
            <div className="font-tajawal flex justify-center items-center h-[93vh]  ">

              <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg px-10 py-5  text-right min-w-[35%] flex flex-col  justify-start ">
                <div>
                  <p className="text-lg font-semibold animate-fadeInOut mb-5 ">
                    أهلا بك يا مستر "{User}"
                  </p>
                </div>


                <div className="mb-4">

                  <select
                    id="treasuryId"
                    name='treasuryId'
                    value={selectedOption}
                    onChange={handleDropdownChange}
                    className="block w-full bg-white border  mb-2 border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c59025] transition duration-200 ease-in-out text-lg font-bold"
                    required
                  >

                    <option value="" className='font-bold'> اختر الخزنه </option>
                    {filtered_tres ? filtered_tres.map((safe) => (<>
                      
                         <option value={safe.treasuryId} className='font-bold'>{safe.treasuryName}</option>
                      
                    
                    </>)) : <option className='font-bold'>لايوجد</option>}
                  </select>

                </div>




                <button
                  type="button"
                  onClick={handleNav}
                  className="w-full bg-[#c59025] hover:bg-[#f0bb51]  text-white font-bold py-3 px-6 rounded-lg mt-1 transition duration-200 ease-in-out transform hover:scale-105"
                >
                  تأكيد
                </button>
              </div>
            </div>
          </form>
        </div>
      </>} */}


      <ToastContainer />
    </div>
  )
}

export default Login
