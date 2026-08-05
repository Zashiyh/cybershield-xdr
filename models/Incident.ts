import mongoose, {
  Schema,
  Document
} from "mongoose";


export interface IIncident extends Document {

  title:string;

  alertId:string;

  ip:string;

  severity:string;

  status:string;

  description:string;

  createdAt:Date;

}



const IncidentSchema =
new Schema<IIncident>(

{

title:{

type:String,

required:true

},


alertId:{

type:String,

required:true

},


ip:{

type:String,

required:true

},



severity:{

type:String,

required:true

},



status:{

type:String,

default:"OPEN"

},



description:{

type:String,

default:""

}



},

{

timestamps:true

}

);



export default

mongoose.models.Incident ||

mongoose.model<IIncident>(
"Incident",
IncidentSchema
);