import {
NextRequest,
NextResponse
} from "next/server";


import {
connectDB
} from "@/lib/mongodb";


import Incident from "@/models/Incident";

import Alert from "@/models/Alert";




export async function POST(
req:NextRequest
){


try{


await connectDB();



const body =
await req.json();



const existing =
await Incident.findOne({

alertId:body.alertId

});



if(existing){


return NextResponse.json(
{
message:"Incident already exists"
},
{
status:400
}
);


}




const incident =

await Incident.create({

title:body.title,

alertId:body.alertId,

ip:body.ip,

severity:body.severity,

description:body.description,

status:"OPEN"


});






await Alert.findByIdAndUpdate(

body.alertId,

{

incidentId:
incident._id.toString()

}

);






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
message:"Incident creation failed"
},
{
status:500
}
);


}


}