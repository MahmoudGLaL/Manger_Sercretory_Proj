import prisma from "@/app/Utils/db";
import { createOppointmentSchema } from "@/app/Utils/ValidationScheam";
import { Prisma } from "@prisma/client";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";
// import { POST } from "../route";


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
        const studentData = await prisma.manger_Meetings.findUnique({
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
        const studentData = await prisma.manger_Meetings.findUnique({
            where: { id: parseInt(params.id) },
            // include : 
        })

        if (!studentData) {
            return NextResponse.json({ message: 'meeting request not found ', }, { status: 404 })
        }
        const body = await req.json();


        // const body =  await(request) as CreateStudentDto
        const validation = createOppointmentSchema.safeParse(body)
        if (!validation) {
            return NextResponse.json({ message: `BadRequest in ${validation}` }, { status: 404 })
        }

        
        await prisma.manger_Meetings.update(
            {data : body , where: { id: parseInt(params.id) }}
        )
        // POST(req) 
        // DELETE(req , {params})
        const allOppointments = await prisma.manger_Meetings.findMany()
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
        const studentData = await prisma.manger_Meetings.findUnique({
            where: { id: parseInt(params.id) },
            // include : 
        })
        if (!studentData) {
            return NextResponse.json({ message: 'meeting request not found ', }, { status: 404 })
        }
        const body = await req.json();
        if(body.status === 'دخول'){
            const LastEnter = await prisma.manger_Meetings.findFirst({
                where: { status:'دخول' },
                // include : 
            })
            if(LastEnter)
            {
                await prisma.manger_Meetings.update(
                    {data : {status : 'خروج'} , where: { id: LastEnter?.id }}
                )
            }
        }

        
        




        // const body =  await(request) as CreateStudentDto
        const validation = createOppointmentSchema.safeParse(body)
        if (!validation) {
            return NextResponse.json({ message: `BadRequest in ${validation}` }, { status: 404 })
        }

        
        await prisma.manger_Meetings.update(
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
        const studentData = await prisma.manger_Meetings.findUnique({
            where: { id: parseInt(params.id) },
            // include : 
        })

        if (!studentData) {
            return NextResponse.json({ message: 'meeting request not found ', }, { status: 404 })
        }

        await prisma.manger_Meetings.delete({ where: { id: parseInt(params.id) } })
        const allOppointments = await prisma.manger_Meetings.findMany()
        // console.log(allOppointments);
        
        // console.log(data);   
        
        // POST(req) 
        // DELETE(req , {params})
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