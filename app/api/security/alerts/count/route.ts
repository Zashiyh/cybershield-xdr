import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Alert from "@/models/Alert";


export async function GET() {

  try {

    await connectDB();


    const count =
      await Alert.countDocuments({
        status: "OPEN"
      });


    return NextResponse.json({
      count
    });


  } catch(error) {


    console.log(
      "ALERT COUNT ERROR:",
      error
    );


    return NextResponse.json(
      {
        count:0,
        error:"Server error"
      },
      {
        status:500
      }
    );


  }

}