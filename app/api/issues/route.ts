import authOptions from "@/app/auth/authOptions";
import { issueSchema } from "@/app/ValidationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (req:NextRequest)=>{
    const session = await getServerSession(authOptions);
    if(!session) return NextResponse.json({},{status:401})
    const body= await req.json();
    const validation = issueSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json(validation.error.format(),{status:400})
    }
    const newIssue = await prisma.issue.create({
        data:{title:body.title,description:body.description}
    })
    return NextResponse.json(newIssue,{status:201});

}