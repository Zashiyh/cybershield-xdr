import { NextResponse } from "next/server";

import {
  connectDB
} from "@/lib/mongodb";

import ThreatScan from "@/models/ThreatScan";


export async function GET(){


try{


await connectDB();



const threats =
await ThreatScan
.find()
.sort({
createdAt:-1
})
.limit(5);



return NextResponse.json(
threats
);



}
catch(error){


console.log(
error
);


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