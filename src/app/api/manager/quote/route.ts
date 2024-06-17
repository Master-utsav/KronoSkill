import { connect } from "@/dbConfig/dbConfig";
import Quotes from "@/models/quote";
import { NextRequest, NextResponse } from "next/server";

connect();

interface Quote{
    quote : string;
    name : string;
    title : string
}

export async function POST(request : NextRequest){
    const reqBody = await request.json();
    const {quote , name , title} = reqBody;
    
    try{
        const qte = await Quotes.find({quote : quote});
        const qteSize:number = qte.length;
        if(qteSize >= 1){
            return NextResponse.json({error : "Quote already exists"} , {status : 400})
        }

        const newQuote = new Quotes<Quote>({
            quote,
            name,
            title
        })
        await newQuote.save();

        return NextResponse.json({newQuote , message : "Uploaded successfully"} , {status : 200})

    }catch(error){
        console.log(error);
        return NextResponse.json({error : "internal server error"} , {status : 500})
    }
}

export async function GET(){
    try{
        const quotes = await Quotes.find();
        return NextResponse.json({quotes , message : "fetched successfully"} , {status : 200})
    }catch(error){
        console.log(error);
        return NextResponse.json({error : "internal server error"} , {status : 500})
    }
}
