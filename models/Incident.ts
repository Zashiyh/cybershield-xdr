import mongoose, {
  Schema,
  Document
} from "mongoose";


export interface IIncident extends Document {

  title:string;

  alertId: mongoose.Types.ObjectId;

  ip:string;

  severity:string;

  status:string;

  description:string;

  assignedTo:string;

  notes:string;

  resolvedAt:Date | null;

  createdAt:Date;

  updatedAt:Date;

}



const IncidentSchema =
new Schema<IIncident>(

{

title:{

type:String,

required:true

},



alertId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Alert",
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

},



assignedTo:{

type:String,

default:"Unassigned"

},



notes:{

type:String,

default:""

},



resolvedAt:{

type:Date,

default:null

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