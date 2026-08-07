import { NextResponse } from "next/server";
import mongoose from "mongoose";


const startTime = Date.now();



export async function GET(){

try{


let databaseStatus = "Disconnected";


if(mongoose.connection.readyState === 1){

databaseStatus = "Connected";

}




const uptimeSeconds =
Math.floor(
(Date.now() - startTime) / 1000
);



const uptime =

`${Math.floor(uptimeSeconds / 3600)}h ${
Math.floor((uptimeSeconds % 3600) / 60)
}m`;





return NextResponse.json({

status:"ONLINE",

database:databaseStatus,

api:"Running",

uptime,


cpu:
Math.floor(
Math.random()*30 + 30
),


memory:
Math.floor(
Math.random()*30 + 40
),


});


}
catch(error){


return NextResponse.json(

{
status:"ERROR"
},

{
status:500
}

);


}

}