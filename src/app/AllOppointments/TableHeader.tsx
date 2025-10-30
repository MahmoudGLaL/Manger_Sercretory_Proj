import React from 'react'


interface Role {
  Role: string
}
const TableHeader = ({Role}:Role) => {



  return (
    <tr className='table-row border-b text-center  ' >
      <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'> </th>
      <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold '>الأسم</th>
      <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>رقم الهاتف</th>
      <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>النوع</th>
      <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>الرتبه</th>
      <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>هناك ميعاد</th>
      <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>الميعاد</th>
      <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>الجهه</th>
      <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>الموقف</th>
      <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'> مرات الزياره</th>
      <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'> الحاله </th>
      <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'></th>
      {Role=== 'manger' &&
      <>
      <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[16px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold '> <span className="pr-6"></span></th>
      </>
      }

     
    </tr>
  )
}

export default TableHeader

{/* <td className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold '>{name}</td>
<td className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>{phoneNum}</td>
<td className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>{type}</td>
<td className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>{rank}</td>
<td className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>{has_oppointment}</td>
<td className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>{oppointment}</td>
<td className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>{side}</td>

<td className={`border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold`}>{situation}</td>
<td className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>{visit_times}</td>

<td className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold'>{order}</td>
<td className={`border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] lg:px-2 xl:px-3 text-wrap w-fit tracking-[1px] font-bold`}> {status} </td> */}