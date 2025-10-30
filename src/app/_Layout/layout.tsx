"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookie from "js-cookie";
// import { WebSocketProvider } from '../context/WebSocketContext';
import MangerSideNav from '../sideNav/Manger_sideNav';
import { BsPersonFillAdd } from "react-icons/bs";
import { CgBoy } from "react-icons/cg";
import { SiCoursera } from "react-icons/si";
import { FaStar, FaTable } from "react-icons/fa";
import { TbSectionFilled } from "react-icons/tb";
import { GrCompliance } from "react-icons/gr";
import { MdReportProblem } from "react-icons/md";
import { IoArrowBackCircleSharp } from "react-icons/io5";


export default function Layout({ children }: { children: React.ReactNode }) {
    const [Role, setRole] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!Cookie.get("user")) {
            router.replace('/');
        }
        setRole(Cookie.get("role") || null);
    }, []);

    return (
        <div className="flex justify-between">
            {Role === 'admin' && (
                <MangerSideNav
                    sideHeader="Students"
                    img=""
                    navStyle="bg-blue-400"
                    liStyle="hover:text-blue-600 hover:bg-gray-200"
                    active="bg-[rgb(238,238,238)] p-2 text-blue-600 border-r-2 border-blue-600"
                    liText={[
                        'Add Student', 'All Students', 'Student Courses', 'Student Sections', 'Students Table', 'Student Grades', 'UpdateStudent'
                    ]}
                    url={[
                        'AddStudents', 'allStudents', 'studentCourses', 'studentSections', 'studentTable', 'studentGrades', 'UpdateStudent/:id'
                    ]}
                    last_url={['StudentComplaints', 'studentProblems', 'UserLanding']}
                    OtherliText={['Student complaints', 'Student Problems', 'Main Menu']}
                    Icons={[BsPersonFillAdd, CgBoy, SiCoursera, TbSectionFilled, FaTable, FaStar]}
                    otherIcons={[GrCompliance, MdReportProblem, IoArrowBackCircleSharp]}
                />
            )}

            <main className="flex-grow">{children}</main> {/* ✅ Removed unnecessary {...pageProps} */}
        </div>
    );
}
