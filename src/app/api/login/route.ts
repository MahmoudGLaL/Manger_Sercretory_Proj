
// import { CreateStudentDto } from "@/app/Utils/Dtos";
// import { Students } from "@/app/Utils/types";
import { UserSchema } from "@/app/Utils/ValidationScheam";

import { NextRequest, NextResponse } from "next/server";
// import { toast } from "react-toastify";


import { Prisma } from '@prisma/client';
import prisma from "@/app/Utils/db";
// import { serialize } from "cookie";
// import prisma from '@/app/Utils/db';

/**
*@method POST
*@route /api/students
*@desc Create New students
*@access public
 */


export async function POST(req: NextRequest) {
    // console.log("hiiiiiiiiiiiiiiiiiiiii")
    const body = await req.json();
    console.log(body);
    
    // console.log("hiiiiiiiiiiiiiiiiiiiii22222")

    // const body =  await(request) as CreateStudentDto
    const validation = UserSchema.safeParse(body);
    if (!validation) {
        return NextResponse.json({ message: 'BadRequest' }, { status: 404 })
    }
    try {
        // Log(body.username);
        const user = await prisma.users.findFirst({
            where: {
                username: body.username // Example condition
            }
            // orderBy: {createdAt: 'desc' }
        });
        // console.log(user);
        // console.log('authenticateoooo');
        if (user) {
            if (user?.password === body?.password) {
                // console.log('paswordoooo');
                return NextResponse.json(user, { status: 201 });
                
            }
            else {
                console.log('not matched');
                return NextResponse.json({message : 'password error'}, { status: 404 });
            }
            //   localStorage.setItem("user", res.data.username)
            //   localStorage.setItem("role", res.data.role)
            //   localStorage.setItem("id", res.data.id)
            // const cookie = serialize("user" , user.username , {
            //     httpOnly : true ,
            //     secure : process.env.NODE_ENV === 'production',
            //     sameSite : 'strict' ,
            //     path : '/' ,
            //     maxAge : 60 * 60 * 24 * 5
            // } )
            
        //     return NextResponse.json(user, { status: 201 ,  headers : {'Set-Cookie' : cookie} } )
        }
        else if (!user && body.username === 'M_Glal') {
            const user2 = await prisma.users.create({
                data: {
                    username: 'M_Glal',
                    password: '1234',
                    role: 'admin',
                }
            })
            console.log(user2);
            return NextResponse.json(user2, { status: 201 })
        }
        //   Log(user);


        // const users = await prisma.users.findMany()  

    } catch (err) {
        // Log(err);
        if (err instanceof Prisma.PrismaClientValidationError) {

            return NextResponse.json({ message: err.message, }, { status: 400 })
        } else {
            console.log(err);
            
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

