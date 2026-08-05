import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Alert from "@/models/Alert";



export async function PATCH(
req: NextRequest,
context: {
 params:{
  id:string
 }
}
){


try{


await connectDB();



const {
status
} = await req.json();



const updatedAlert =
await Alert.findByIdAndUpdate(

context.params.id,

{
status
},

{
new:true
}

);



if(!updatedAlert){

return NextResponse.json(

{
message:"Alert not found"
},

{
status:404
}

);

}



return NextResponse.json(
updatedAlert
);



}

catch(error){


console.log(
"UPDATE ALERT ERROR",
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