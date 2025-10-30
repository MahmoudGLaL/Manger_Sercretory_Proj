
// import { CreateStudentDto } from "@/app/Utils/Dtos";
// import { Students } from "@/app/Utils/types";
// import { UserSchema } from "@/app/Utils/ValidationScheam";

import { NextRequest, NextResponse } from "next/server";
// import { toast } from "react-toastify";


import { Prisma } from '@prisma/client';
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

    try {
        const user = await prisma.users.findFirst({
            where: {
                username: body.username // Example condition
            },
            // orderBy: {createdAt: 'desc' }
        });
        if (!user) {
            // console.log('1');
            
            await prisma.users.create({
                data: {
                    username: body.username,
                    password: body.password,
                    role: body.role,
                }
            })

            return NextResponse.json('created', { status: 201 })
        }
        else {
            return NextResponse.json({ message: 'اسم المستخدم موجود بالفعل', }, { status: 304 })
        }


    } catch (err) {
        if (err instanceof Prisma.PrismaClientValidationError) {
            return NextResponse.json({ message: err.message, }, { status: 400 })
        } else {
            console.log( 'herrrreeeeeeeeeeeee' ,err);
            
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
        const users = await prisma.users.findMany()
        // {skip : 0 ,take : 10}


        return NextResponse.json(users, { status: 200 })
    } catch (err) {
        if (err instanceof Prisma.PrismaClientValidationError) {
            return NextResponse.json({ message: err.message, }, { status: 400 })
        } else {
            return NextResponse.json({ message: err }, { status: 402 });
        }
    }


}

