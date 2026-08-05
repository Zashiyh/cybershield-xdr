import {
NextRequest,
NextResponse
}
from "next/server";

import bcrypt from "bcryptjs";

import User from "@/models/User";

import {connectDB}
from "@/lib/mongodb";



export async function POST(
req:NextRequest
){

try{

await connectDB();


const {
name,
email,
password
}
=
await req.json();



const existing =
await User.findOne({
email
});


if(existing){

return NextResponse.json(
{
message:"User already exists"
},
{
status:400
}
);

}



const hashed =
await bcrypt.hash(
password,
10
);



const user =
await User.create({

name,

email,

password:hashed,

role:"viewer"

});



return NextResponse.json({

message:"Account created",

user:{
id:user._id,
name:user.name,
email:user.email
}

});


}
catch(error){

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