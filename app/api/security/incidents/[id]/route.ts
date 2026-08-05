import {
  NextRequest,
  NextResponse
} from "next/server";


import {
  connectDB
} from "@/lib/mongodb";


import Incident from "@/models/Incident";




export async function GET(

req:NextRequest,

{
params
}:{
params:{
id:string
}
}

){


try{


await connectDB();

const body =
await req.json();

const incident =
await Incident.findById(
params.id
);

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

if(!incident){

return NextResponse.json(
{
message:"Incident not found"
},
{
status:404
}
);

}



return NextResponse.json(
incident
);



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







export async function PATCH(

req:NextRequest,

{
params
}:{
params:{
id:string
}
}

){


try{


await connectDB();



const body =
await req.json();



const updated =
await Incident.findByIdAndUpdate(

params.id,

{

status:
body.status

},

{
new:true
}

);



return NextResponse.json(
updated
);



}
catch(error){


return NextResponse.json(
{
message:"Update failed"
},
{
status:500
}
);


}

}