import mongoose, { Schema, Document } from "mongoose";


export interface IAlert extends Document {

  title:string;

  ip:string;

  severity:string;

  status:string;

  score:number;

  description:string;

  incidentId?:string;

  createdAt:Date;

}





const AlertSchema =
new Schema<IAlert>(

{

title:{

type:String,

required:true

},



ip:{

type:String,

required:true

},



severity:{

type:String,

required:true,

enum:[

"HIGH",

"MEDIUM",

"LOW"

]

},



status:{

type:String,

default:"OPEN"

},



score:{

type:Number,

default:0

},



description:{

type:String,

default:""

},



// Link alert with incident

incidentId:{

type:String,

default:null

}



},

{

timestamps:true

}

);





export default

mongoose.models.Alert ||

mongoose.model<IAlert>(

"Alert",

AlertSchema

);