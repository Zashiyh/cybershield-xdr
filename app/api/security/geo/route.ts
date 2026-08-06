import { NextRequest, NextResponse } from "next/server";


export async function GET(
  req: NextRequest
){

try{


const ip =
req.nextUrl.searchParams.get("ip");



if(!ip){

return NextResponse.json(
{
message:"IP required"
},
{
status:400
}
);

}




const response =
await fetch(

`https://ipwho.is/${ip}`

);



const data =
await response.json();




if(!data.success){

return NextResponse.json({

ip,

country:"Unknown",

city:"Unknown",

lat:50.11,

lng:8.68

});

}




return NextResponse.json({

ip,

country:
data.country || "Unknown",

city:
data.city || "Unknown",

lat:
data.latitude || 0,

lng:
data.longitude || 0

});



}
catch(error){


console.log(error);



return NextResponse.json({

ip:"",

country:"Unknown",

city:"Unknown",

lat:0,

lng:0

});


}


}