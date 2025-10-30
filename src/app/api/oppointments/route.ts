
// import { CreateStudentDto } from "@/app/Utils/Dtos";
// import { Students } from "@/app/Utils/types";
import {  createOppointmentSchema } from "@/app/Utils/ValidationScheam";

import { NextRequest, NextResponse } from "next/server";
// import { toast } from "react-toastify";


import {  Prisma } from '@prisma/client';
import prisma from "@/app/Utils/db";
// import prisma from '@/app/Utils/db';

/**
*@method POST
*@route /api/students
*@desc Create New students
*@access public
 */


export async function POST(req: NextRequest) {
    const body = await req.json();


    // const body =  await(request) as CreateStudentDto
    const validation = createOppointmentSchema.safeParse(body)
    if (!validation) {
        return NextResponse.json({ message: 'BadRequest' }, { status: 404 })
    }
    try {

         await prisma.manger_Meetings.create({
            data: {
                name  : body.name ,
                type  :  body.type ,            
                rank  :  body.rank ,               
                phoneNum   :  body.phone ,            
                has_oppointment :  body.has_oppointment ,  
                oppointment  :  body.oppointment ,         
                situation :  body.situation ,       
                side :  body.side ,  
                region :  body.region ,               
                subject :  body.subject , 
                updatedAt : body.updatedAt                       
            }
        })  
        const allOppointments = await prisma.manger_Meetings.findMany()  
        return NextResponse.json(allOppointments, { status: 200 })
    } catch (err) {
        if (err instanceof Prisma.PrismaClientValidationError) {
            return NextResponse.json({ message: err.message, }, { status: 400 })
        } else {
            return NextResponse.json({ message: err }, { status: 402 });
        }
    }


}

/**
*@method Get
*@route /api/students
*@desc Get All Students
*@access public
 */

export async function GET() {
 
    // if (token)

    try {
        const allOppointments = await prisma.manger_Meetings.findMany()
        // {skip : 0 ,take : 10}

        
        return NextResponse.json(allOppointments, { status: 200 })
    } catch (err) {
        if (err instanceof Prisma.PrismaClientValidationError) {
            return NextResponse.json({ message: err.message, }, { status: 400 })
        } else {
            return NextResponse.json({ message: err }, { status: 402 });
        }
    }


}

