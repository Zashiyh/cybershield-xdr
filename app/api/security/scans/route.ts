import {
NextResponse
} from "next/server";


import {
connectDB
} from "@/lib/mongodb";


import ThreatScan from "@/models/ThreatScan";



export async function GET(){


try{


await connectDB();



const scans =
await ThreatScan
.find()
.sort({
createdAt:-1
})
.limit(10);



return NextResponse.json(
scans
);



}
catch(error){


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