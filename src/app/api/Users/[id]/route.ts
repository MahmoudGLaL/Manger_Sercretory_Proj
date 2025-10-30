import prisma from "@/app/Utils/db";
import {  UserSchema } from "@/app/Utils/ValidationScheam";
import { Prisma } from "@prisma/client";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";



/**
*@method Get
*@route /api/students
*@desc Get All Students
*@access public
 */
interface Props {
    params: {
        id: string;
        //   take: string;
    };
}

//   req:NextRequest --> it should be given even not use
export async function GET(req: NextRequest, { params }: Props) {
    try {
        const studentData = await prisma.users.findUnique({
            where: { id: parseInt(params.id) },
            // include : 
        })

        if (!studentData) {
            return NextResponse.json({ message: 'meeting request is not found ', }, { status: 404 })
        }

        return NextResponse.json(studentData, { status: 200 })


    } catch (err) {
        if (err instanceof Prisma.PrismaClientValidationError) {
            return NextResponse.json({ message: err.message, }, { status: 400 })
        } else {
            log(err)
            return NextResponse.json({ message: err }, { status: 402 });
        }
    }


}
export async function PUT(req: NextRequest, { params }: Props) {
    
    try {
        const studentData = await prisma.users.findUnique({
            where: { id: parseInt(params.id) },
            // include : 
        })

        if (!studentData) {
            return NextResponse.json({ message: 'meeting request not found ', }, { status: 404 })
        }
        const body = await req.json();


        // const body =  await(request) as CreateStudentDto
        const validation = UserSchema.safeParse(body)
        if (!validation) {
            return NextResponse.json({ message: `BadRequest in ${validation}` }, { status: 404 })
        }

        
        await prisma.users.update(
            {data : body , where: { id: parseInt(params.id) }}
        )
        // POST(req) 
        // DELETE(req , {params})
        const allOppointments = await prisma.users.findMany()
        return NextResponse.json(allOppointments, { status: 200 })


    } catch (err) {
        if (err instanceof Prisma.PrismaClientValidationError) {
            return NextResponse.json({ message: err.message, }, { status: 400 })
        } else {
            log(err)
            return NextResponse.json({ message: err }, { status: 402 });
        }
    }



}
export async function PATCH(req: NextRequest, { params }: Props) {
    if (!params.id) {
        throw new Error("Invalid ID provided");
    }
    try {
        const studentData = await prisma.users.findUnique({
            where: { id: parseInt(params.id) },
            // include : 
        })
        

        if (!studentData) {
            return NextResponse.json({ message: 'meeting request not found ', }, { status: 404 })
        }
        const body = await req.json();


        // const body =  await(request) as CreateStudentDto
        const validation = UserSchema.safeParse(body)
        if (!validation) {
            return NextResponse.json({ message: `BadRequest in ${validation}` }, { status: 404 })
        }

        
        await prisma.users.update(
            {data : body , where: { id: parseInt(params.id) }}
        )
        const allOppointments = await prisma.manger_Meetings.findMany()
        // console.log(allOppointments);
        
        // console.log(data);   
        
        // POST(req) 
        // DELETE(req , {params})
        return NextResponse.json(allOppointments, { status: 200 })


    } catch (err) {
        if (err instanceof Prisma.PrismaClientValidationError) {
            console.log(err);
            
            return NextResponse.json({ message: err.message } ,{ status: 404 } )
        } else {
            log(err)
            return NextResponse.json({ message: err }, { status: 402 });
        }
    }



}

export async function DELETE(req: NextRequest, { params }: Props) {

    // if (token)
    try {
        const studentData = await prisma.users.findUnique({
            where: { id: parseInt(params.id) },
            // include : 
        })

        if (!studentData) {
            return NextResponse.json({ message: 'meeting request not found ', }, { status: 404 })
        }

        const Data = await prisma.users.delete({ where: { id: parseInt(params.id) } })
        return NextResponse.json(Data, { status: 200 })


    } catch (err) {
        if (err instanceof Prisma.PrismaClientValidationError) {
            return NextResponse.json({ message: err.message, }, { status: 400 })
        } else {
            log(err)
            return NextResponse.json({ message: err }, { status: 402 });
        }
    }



}