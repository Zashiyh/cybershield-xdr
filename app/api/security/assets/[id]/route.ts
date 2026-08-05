import {
NextRequest,
NextResponse
} from "next/server";


import {
connectDB
} from "@/lib/mongodb";


import Asset from "@/models/Asset";



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



return NextResponse.json(
asset
);



}

catch(error){


console.log(error);



return NextResponse.json(

{
message:"Failed to load asset"
},

{
status:500
}

);


}


}