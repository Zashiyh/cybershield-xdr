import {
  NextRequest,
  NextResponse
} from "next/server";


import {
  connectDB
} from "@/lib/mongodb";


import Incident from "@/models/Incident";



// GET ALL INCIDENTS

export async function GET(){

try{


await connectDB();



const incidents =
await Incident.find()
.sort({
createdAt:-1
});



return NextResponse.json(
incidents
);



}
catch(error){


console.log(error);


return NextResponse.json(
{
message:"Failed to load incidents"
},
{
status:500
}
);


}

}







// CREATE INCIDENT

export async function POST(
req:NextRequest
){

try{


await connectDB();



const body =
await req.json();



const incident =
await Incident.create({

title:body.title,

alertId:body.alertId,

ip:body.ip,

severity:body.severity,

description:body.description,

status:"OPEN"

});




return NextResponse.json(
incident,
{
status:201
}
);



}
catch(error){


console.log(error);


return NextResponse.json(
{
message:"Incident create failed"
},
{
status:500
}
);


}


}