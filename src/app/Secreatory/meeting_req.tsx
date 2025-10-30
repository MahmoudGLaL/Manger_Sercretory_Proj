import { FormikErrors, FormikTouched, FormikValues } from 'formik';
import React, { useEffect, useState } from 'react'
import { Meeting } from '../Utils/types';
// import { json } from 'stream/consumers';
interface contactInfoProps<T> {
    handleBlur: (event: React.FocusEvent<HTMLInputElement| HTMLSelectElement>) => void,
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    setFieldValue: (field: string, field2: string) => void;
    errors: FormikErrors<FormikValues>,
    touched: FormikTouched<T>,
    StyleNum: string
    // values: T
    id: string
    update: boolean
    Data: Meeting 
}
const Meeting_Requests: React.FC<contactInfoProps<FormikValues>> = ({
    handleBlur,
    errors,
    touched,
    StyleNum,
    Data,
    setFieldValue,

    id,
    update
}) => {
    const [type, setType] = useState('')
    const [rank, setRank] = useState('')
    const [oppointment, setOppointment] = useState('')
    const [Time, setTime] = useState('')
    const [side, setSide] = useState('')
    const [Phone, setPhone] = useState('')
    const [Name, setName] = useState('')
    const [Region, setRegion] = useState('')
    const [Subject, setSubject] = useState('')
    const [situation, setSituation] = useState('')
    const [changed5, setChanged5] = useState(false)
    const [changed4, setChanged4] = useState(false)
    const [changed3, setChanged3] = useState(false)
    const [changed2, setChanged2] = useState(false)
    const [changed, setChanged] = useState(false)

    useEffect(() => {
        if (Object.keys(Data).length > 0) {
            setName(Data?.name)
            setPhone(Data?.phoneNum)
            setRegion(Data?.region)
            setTime(Data?.oppointment?.includes('٢٠٢٥ ') ? `${Data?.oppointment?.split('٢٠٢٥')[1]}` : `${Data?.oppointment}`  )
            setSubject(Data?.subject)
            setChanged(update)
            setChanged2(update)
            setChanged3(update)
            setChanged4(update)
            setChanged5(update)
            setType(Data?.type)
            setRank(Data?.rank)
            setSide(Data?.side)
            setOppointment(Data?.has_oppointment)
            setSituation(Data?.situation)
        }

    }, [Data])



    const handleSide = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSide(e.target.value);
        setFieldValue("side", e.target.value);
        setChanged5(true)
        if (side === 'خارج المركز') {
            setRegion('')
            setFieldValue('region' , '')
        }
    }

    const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value); 
        setFieldValue("type", e.target.value); 
        setChanged4(true) 
        if (type === 'مدني') {
            setRank('')
            setFieldValue('rank' , '')
        }
    }
    const handleSituation = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSituation(e.target.value);
        setFieldValue("situation", e.target.value);
        setChanged2(true);
    }
    const handleOppointment = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime(e.target.value); 
        setFieldValue("oppointment", e.target.value)
        if (oppointment === 'لا') {
            setTime('')
            setFieldValue('oppointment' , '')
        }
    }



    return (
        <div className='mt-2 w-full px-20 flex justify-center items-center flex-col gap-5 ' dir='rtl'>
            <div className={`flex justify-start gap-3 flex-col items-start  py-1 tracking-[1px] w-full     `}>
                <input name='name' type="text"
                    value={Name}
                    onBlur={handleBlur} onChange={(e) => { setName(e.target.value); setFieldValue("name", e.target.value) }}
                    placeholder='الأسم' className={` h-10  p-2 font-bold px-2 rounded-md w-full text-right focus:border-b-2 focus:border-blue-500 outline-none border-b ${id ? 'focus:border-orange-500' : 'focus:border-blue-500'}   border-gray-300`} />

                {
                    errors.name && <div className='  text-red-500 text-[13px] font-semibold'>
                        {errors.name && touched.name && <p>{typeof errors?.name === 'string' && errors.name}</p>}
                    </div>
                }

            </div>

            <div className={`flex justify-start gap-3 flex-col items-start  py-1 tracking-[1px] w-full     `}>
                <input name='phone' type="text" onChange={(e) => { setPhone(e.target.value); setFieldValue("phone", e.target.value) }}
                    value={Phone}
                    maxLength={11}
                    placeholder='رقم الهاتف (اختياري)' className={`h-10 w-full ${StyleNum} p-2 font-bold px-2 rounded-md text-right focus:border-b-2  ${id ? 'focus:border-orange-500' : 'focus:border-blue-500'}  outline-none border-b  border-gray-300`} />

                {
                    errors.phone && <div className=' text-red-500 text-[13px] font-semibold'>
                        <p>{typeof errors?.phone === 'string' && errors.phone}</p>
                    </div>
                }

            </div>
            {/* h-10 w-full p-2  font-bold px-2 ${changed4 ? 'text-black' : 'text-[#9e9e9e]'} rounded-md text-right focus:border-b-2 */}
            <div className={`flex justify-start gap-3 flex-col items-start  py-1 tracking-[1px] w-full     `}>
                <select name="type" id="" value={type} required onBlur={handleBlur} onChange={handleType} className={` h-10 text-green w-full ${StyleNum} ${changed4 ? 'text-black' : 'text-[#9e9e9e]'} p-2 font-bold px-2 rounded-md text-right focus:border-b-2  ${id ? 'focus:border-orange-500' : 'focus:border-blue-500'}  outline-none border-b  border-gray-300  ${update ? 'focus:border-orange-500' : 'focus:border-blue-500'} outline-none border-b border-gray-300 `}>
                    <option value=''  disabled className='text-gray-600 tracking-[2px]'>النوع</option>
                    <option value='عسكري' className='font-bold text-black tracking-[3px]'>عسكري</option>
                    <option value='مدني' className='font-bold text-black tracking-[3px]'>مدني</option>

                </select>
                {
                    errors.type && <div className=' w-80 text-red-500 text-[13px] font-semibold'>
                        {errors.type && touched.type && <p>{typeof errors?.type === 'string' && errors.type}</p>}
                    </div>
                }

            </div>

            {type === 'عسكري' && <div className={`flex justify-start gap-3 flex-col items-start  py-1 tracking-[1px] w-full     `}>
                <select name="rank" id="" value={rank} required onBlur={handleBlur} onChange={(e) => { setRank(e.target.value); setFieldValue("rank", e.target.value); setChanged(true) }} className={` h-10 text-green w-full ${StyleNum} ${changed ? 'text-black' : 'text-[#9e9e9e]'} p-2 font-bold px-2 rounded-md text-right focus:border-b-2  ${id ? 'focus:border-orange-500' : 'focus:border-blue-500'}  outline-none border-b  border-gray-300  ${update ? 'focus:border-orange-500' : 'focus:border-blue-500'} outline-none border-b border-gray-300 `}>
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

                </select>
                {
                    errors.rank && <div className='  text-red-500 text-[13px] font-bold'>
                        {errors.rank && touched.rank && <p>{typeof errors?.rank === 'string' && errors.rank}</p>}
                    </div>
                }


            </div>
            }


            <div className={`flex justify-start gap-3 flex-col items-start  py-1 tracking-[1px] w-full     `}>
                <select name="side" id="" value={side} required onBlur={handleBlur} onChange={(e) => { handleSide(e) }} className={` h-10  w-full ${StyleNum} ${changed5 ? 'text-black' : 'text-[#9e9e9e]'} p-2 font-bold px-2 rounded-md text-right focus:border-b-2  ${id ? 'focus:border-orange-500' : 'focus:border-blue-500'}  outline-none border-b  border-gray-300  ${update ? 'focus:border-orange-500' : 'focus:border-blue-500'} outline-none border-b border-gray-300 `}>
                    <option value=''  disabled className='text-gray-600 tracking-[1px]'>الجهه</option>
                    <option value={'داخل المركز'} className='font-bold text-black tracking-[3px]'>داخل المركز</option>
                    <option value={'خارج المركز'} className='font-bold text-black tracking-[3px]'>خارج المركز </option>

                </select>

                {
                    errors.side && <div className='  text-red-500 text-[13px] font-bold'>
                        {errors.side && touched.side && <p>{typeof errors?.side === 'string' && errors.side}</p>}
                    </div>
                }

            </div>

            {side === 'خارج المركز' && <div className=" flex justify-start gap-3 flex-col items-start px-2 py-1 tracking-[1px] w-full ">
                <input name='region' type="text" onChange={(e) => { setRegion(e.target.value); setFieldValue('region', e.target.value) }}
                    value={Region}
                    placeholder='المنطقه' className={` h-10  p-2 font-bold px-2 rounded-md w-full text-right focus:border-b-2 focus:border-blue-500 outline-none border-b ${id ? 'focus:border-orange-500' : 'focus:border-blue-500'}   border-gray-300`} />
                {
                    errors.region && <div className='  text-red-500 text-[13px] font-bold'>
                        {errors.region && touched.region && <p>{typeof errors?.region === 'string' && errors.region}</p>}
                    </div>
                }
            </div>}






            <div className=" flex justify-start gap-3 flex-col items-start  py-1 tracking-[1px] w-full ">
                <select name="has_oppointment" id="" value={oppointment} required onBlur={handleBlur} onChange={(e) => { setOppointment(e.target.value); setFieldValue("has_oppointment", e.target.value); setChanged3(true) }} className={` h-10  w-full ${StyleNum} ${changed3 ? 'text-black' : 'text-[#9e9e9e]'} p-2 font-bold px-2 rounded-md text-right focus:border-b-2  ${id ? 'focus:border-orange-500' : 'focus:border-blue-500'}  outline-none border-b  border-gray-300  ${update ? 'focus:border-orange-500' : 'focus:border-blue-500'} outline-none border-b border-gray-300 `}>
                    <option value=''  disabled className='text-gray-600 tracking-[1px]'>هناك ميعاد</option>
                    <option value={'نعم'} className='font-bold text-black tracking-[3px]'>نعم</option>
                    <option value={'لا'} className='font-bold text-black tracking-[3px]'>لا </option>

                </select>
                {
                    errors.has_oppointment && <div className='  text-red-500 text-[13px] font-bold'>
                        {errors.has_oppointment && touched.has_oppointment && <p>{typeof errors?.has_oppointment === 'string' && errors.has_oppointment}</p>}
                    </div>
                }
            </div>
            {oppointment === 'نعم' && <div className=" flex justify-start gap-3 flex-col items-start  py-1 tracking-[1px] w-full ">
                <input name='oppointment' type="time" onChange={handleOppointment}
                    value={Time}
                    placeholder='' className={`h-10 w-full ${StyleNum} p-2 font-bold px-2 rounded-md text-right focus:border-b-2  ${id ? 'focus:border-orange-500' : 'focus:border-blue-500'}  outline-none border-b  border-gray-300`} />
                {
                    errors.oppointment && <div className='  text-red-500 text-[13px] font-bold'>
                        {errors.oppointment && touched.oppointment && <p>{typeof errors?.oppointment === 'string' && errors.oppointment}</p>}
                    </div>
                }
            </div>}



            <div className=" flex justify-start gap-3 flex-col items-start  py-1 tracking-[1px] w-full ">
                <select name="situation" id="" value={situation} required onBlur={handleBlur} onChange={handleSituation} className={` h-10  w-full ${StyleNum} ${changed2 ? 'text-black' : 'text-[#9e9e9e]'} p-2 font-bold px-2 rounded-md text-right focus:border-b-2  ${id ? 'focus:border-orange-500' : 'focus:border-blue-500'}  outline-none border-b  border-gray-300  ${update ? 'focus:border-orange-500' : 'focus:border-blue-500'} outline-none border-b border-gray-300 `}>
                    <option value=''  disabled className='text-gray-600 tracking-[2px]'>الموقف</option>
                    <option value='طارئ' className='font-bold text-black tracking-[3px]'>طارئ</option>
                    <option value='غير طارئ' className='font-bold text-black tracking-[3px]'>غير طارئ</option>

                </select>
                {
                    errors.situation && <div className='  text-red-500 text-[13px] font-bold'>
                        {errors.situation && touched.situation && <p>{typeof errors?.situation === 'string' && errors.situation}</p>}
                    </div>
                }
            </div>


            <div className=" flex justify-start gap-3 flex-col items-start  py-1 tracking-[1px] w-full ">
                <input name='subject' type="text"
                    value={Subject}
                    onBlur={handleBlur} onChange={(e) => { setSubject(e.target.value); setFieldValue("subject", e.target.value) }}
                    placeholder='الموضوع (اختياري)' className={` h-10  p-2 font-bold px-2 rounded-md w-full text-right focus:border-b-2 focus:border-blue-500 outline-none border-b ${id ? 'focus:border-orange-500' : 'focus:border-blue-500'}   border-gray-300`} />
            </div>



            {/* </div> */}

        </div>
    )
}

export default Meeting_Requests