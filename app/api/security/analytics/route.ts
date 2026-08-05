import { NextResponse } from "next/server";

import {
  connectDB
} from "@/lib/mongodb";

import ThreatScan from "@/models/ThreatScan";


export async function GET(){


try{


await connectDB();



// Risk Distribution

const riskData =
await ThreatScan.aggregate([

{
 $group:{
   _id:"$risk",
   count:{
    $sum:1
   }
 }
}

]);





// Country Distribution

const countryData =
await ThreatScan.aggregate([

{
 $group:{
   _id:"$country",
   count:{
    $sum:1
   }
 }
},


{
 $sort:{
   count:-1
 }
},


{
 $limit:5
}


]);






// Recent Threats

const recentData =
await ThreatScan.aggregate([


{
 $group:{

   _id:{
    date:{
     $dateToString:{
      format:"%Y-%m-%d",
      date:"$createdAt"
     }
    }
   },

   count:{
    $sum:1
   }

 }


},


{
 $sort:{
   "_id.date":1
 }
}


]);





return NextResponse.json({

riskData,

countryData,

recentData

});





}
catch(error){


console.log(error);



return NextResponse.json(

{
message:"Analytics error"
},

{
status:500
}

);


}



}