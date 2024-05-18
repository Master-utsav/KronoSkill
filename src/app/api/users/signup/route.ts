import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailler"
import validator from "validator"

connect()

interface SignUpBody{
    firstname : string,
    lastname : string,
    username : string,
    password : string,
    email : string,
    confirmpassword : string
}
export async function POST(request: NextRequest) {

        function containsWhitespace(input: string): boolean {
        const whitespacePattern = /\s/;
        return whitespacePattern.test(input);
    }
    function isAlphabetic(input: string): boolean {
    const alphabetPattern = /^[A-Za-z]+$/;
    return alphabetPattern.test(input); 
    }
    function isValidUsername(username: string): boolean {
    const usernamePattern = /^[A-Za-z_]+$/;
    return usernamePattern.test(username);
    }
    
    try {
        const reqBody = await request.json()
        const { firstname, lastname, username, password, email, confirmpassword }: SignUpBody = reqBody

        const user = await User.findOne({
               $and: [{ email }, { user_name: username }]})
        if (user) {
            return NextResponse.json({ error: "user already exists" }, { status: 400 });
        }
        if (!(isAlphabetic(firstname) || isAlphabetic(lastname))) {
            return NextResponse.json({ error: "alphabets allowed in name*" }, { status: 400 });
        }
        if (!isValidUsername(username)) {
            return NextResponse.json({ error: "username accepts alphabets , _" }, { status: 400 });
        }
        if (!validator.isEmail(email)) {
            return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        }
        if (containsWhitespace(password) || containsWhitespace(confirmpassword) || containsWhitespace(firstname) || containsWhitespace(lastname) || containsWhitespace(email) || containsWhitespace(username)) {
            return NextResponse.json({ error: "spaces not allowed in any field" }, { status: 400 }); 
        }
        if (password !== confirmpassword) {
            return NextResponse.json({ error: "password doesn't match" }, { status: 400 }); 
        }
        if ((password?.trim()).length <= 6) {
            return NextResponse.json({ error: "weak password" }, { status: 400 }); 
        }


        const salt =  await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        const newUser = new User({
            first_name: firstname,
            last_name: lastname,
            user_name: username,
            email,
            password : hashedPassword,
        })

        const savedUser = await newUser.save();
       

        //send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })
        
        return NextResponse.json({
            message: "User registerd successfully",
            message2: "email verification send successfully",
            success: true,
            savedUser
        })

    } catch (error : any) {
        return NextResponse.json({error : error.message} , {status : 500})
    }
}