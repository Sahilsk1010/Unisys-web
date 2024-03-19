import {connect,disconnect} from "../../../dbConfig/connect"
import Authentication from "../../../models/auth";
import bcrypt from "bcrypt";
import { NextResponse,NextRequest } from "next/server";
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:"ankursk999@gmail.com",
        pass:"ankursanjeevkulkarni"
    }
})
export async function POST(req){
    try{
        await connect();
        const reqBody = await req.json()
        const {fname,lname,collegename,email,password} = reqBody
        const salt = await bcrypt.genSalt(10)
        console.log(password)
        const hash1 = await bcrypt.hash(password,salt);
        console.log(hash1);
        const verificationtoken = Math.random().toString(36).substring(2,8);
        const newuser = Authentication({
            fname:fname,
            lname:lname,
            collegename:collegename,
            email:email,
            verificationtoken:verificationtoken,
            verfied:false
        });
    
        await newuser.save();
        const mailoptions = {
            from:"ankursk999@gmail.com",
            to:email,
            subject:"Verification Link for the user authentication",
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #333;">Welcome to Your Website!</h1>
                <p>Dear ${fname},</p>
                <p>Thank you for registering with us. Please click on the following link to verify your email address:</p>
                <a href="http://localhost:3000/verify/${verificationtoken}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a>
                <p style="margin-top: 20px;">If you did not sign up for an account, please ignore this email.</p>
                <p style="margin-top: 30px;">Best Regards,<br>Your Website Team</p>
            </div>
        `
    
        }
        await transporter.sendMail(mailoptions,(err,info)=>{
            if(err){
                console.log("Some error occured");
            }
            else{
                console.log("Verification Link Sent");
            }
        });
    
        await disconnect();
    
        return new NextResponse({
            status:200,
            body:{message:"User created and email verified"}
        })

    }
    catch(err){
        console.log(err);
        return new NextResponse({
            status:500,
            body:{message:"Some internal error"}
        });
    }



}