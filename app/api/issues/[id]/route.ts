import { issueSchema } from "@/app/ValidationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request:NextRequest,{params}:{params:{id:string}})=>{
    const body = await request.json();
    const validate = issueSchema.safeParse(body);
    if(!validate.success) 
        return NextResponse.json(validate.error.format(),{status:400});
    const issue = await prisma.issue.findUnique({
        where : {id:parseInt(params.id)}
    })
    if (!issue)
        return NextResponse.json({error:'invalid issue'},{status:404})
    const updatedissue = await prisma.issue.update({
        where:{id:parseInt(params.id)},
        data:{
            title:body.title,
            description:body.description

        }
    })
    return NextResponse.json(updatedissue,{status:201});
}