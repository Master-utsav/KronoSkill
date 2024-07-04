import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token:string = request.cookies.get("token")?.value || "";
        const decodedToken:any = jwt.verify(token, process.env.NEXT_PRIVATE_TOKEN_SECRET!)
        
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message)
    }
}