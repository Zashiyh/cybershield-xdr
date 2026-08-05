import {
  NextResponse
} from "next/server";

import {
  connectDB
} from "@/lib/mongodb";

import Alert from "@/models/Alert";


export async function GET(){


try{


await connectDB();


const alerts =
await Alert.find()
.sort({
createdAt:-1
});



return NextResponse.json(
alerts
);



}
catch(error){


console.log(error);



return NextResponse.json(
{
message:"Failed to load alerts"
},
{
status:500
}
);


}


}