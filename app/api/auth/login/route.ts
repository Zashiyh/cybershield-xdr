import {
  NextRequest,
  NextResponse
} from "next/server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";


export async function POST(
  req: NextRequest
) {

  try {

    await connectDB();


    const {
      email,
      password
    } = await req.json();


    const user =
      await User.findOne({
        email
      });


    if(!user){

      return NextResponse.json(
        {
          message:"Invalid email or password"
        },
        {
          status:401
        }
      );

    }


    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );


    if(!passwordMatch){

      return NextResponse.json(
        {
          message:"Invalid email or password"
        },
        {
          status:401
        }
      );

    }


    const token =
      jwt.sign(
        {
          id:user._id,
          role:user.role,
          email:user.email
        },
        process.env.JWT_SECRET!,
        {
          expiresIn:"1d"
        }
      );


    const response =
      NextResponse.json(
        {
          message:"Login successful"
        }
      );


    response.cookies.set(
      "token",
      token,
      {
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        path:"/",
        maxAge:60*60*24
      }
    );


    return response;


  }
  catch(error){

    console.log(error);


    return NextResponse.json(
      {
        message:"Server error"
      },
      {
        status:500
      }
    );

  }

}