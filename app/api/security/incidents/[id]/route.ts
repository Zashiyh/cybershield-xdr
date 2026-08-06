import {
  NextRequest,
  NextResponse
} from "next/server";


import {
  connectDB
} from "@/lib/mongodb";


import Incident from "@/models/Incident";

import Alert from "@/models/Alert";






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

)

.populate("alertId");






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


console.log(
"GET INCIDENT ERROR:",
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





const updateData:any = {};





if(body.status){

updateData.status =
body.status;


}





if(body.assignedTo){

updateData.assignedTo =
body.assignedTo;


}





if(body.notes !== undefined){

updateData.notes =
body.notes;


}







if(body.status === "RESOLVED"){


updateData.resolvedAt =
new Date();



}









const updated =

await Incident.findByIdAndUpdate(

params.id,

updateData,

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







// update related alert

if(body.status === "RESOLVED"){



await Alert.findByIdAndUpdate(

updated.alertId,

{

status:"RESOLVED"

}

);


}







return NextResponse.json(

updated

);






}

catch(error){


console.log(
"PATCH INCIDENT ERROR:",
error
);




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