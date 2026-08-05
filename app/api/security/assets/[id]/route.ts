import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Asset from "@/models/Asset";

import Alert from "@/models/Alert";

import { calculateRisk } from "@/lib/risk-calculator";



export async function GET(

req:NextRequest,

context:{
params:{
id:string
}
}

){

try{


await connectDB();



const asset =
await Asset.findById(
context.params.id
);



if(!asset){

return NextResponse.json(
{
message:"Asset not found"
},
{
status:404
}
);

}




// Get related alerts by IP

const alerts =
await Alert.find({

ip: asset.ip

});




// Calculate risk

const risk =
calculateRisk(alerts);





return NextResponse.json({

...asset.toObject(),

risk:risk.level,

riskScore:risk.score,

alertCount:alerts.length,

lastThreat:
alerts.length > 0
?
alerts[0].createdAt
:
null

});



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