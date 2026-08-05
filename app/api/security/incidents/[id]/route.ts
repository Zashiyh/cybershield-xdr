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



const incident =

await Incident.findById(
params.id
);




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

status:body.status

},

{
new:true
}

);




if(!updated){

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
updated
);



}
catch(error){


console.log(error);



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