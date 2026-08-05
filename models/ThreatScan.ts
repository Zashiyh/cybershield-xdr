import mongoose, { Schema, Document } from "mongoose";


export interface IThreatScan extends Document {

  ip:string;

  score:number;

  country:string;

  risk:string;

  isp:string;

  domain:string;

  reports:number;

  createdAt:Date;

}



const ThreatScanSchema =
new Schema<IThreatScan>(

{

ip:{

type:String,
required:true

},


score:{

type:Number,
required:true

},


country:{

type:String,
default:"Unknown"

},


risk:{

type:String,
required:true

},


isp:{

type:String,
default:"Unknown"

},


domain:{

type:String,
default:"Unknown"

},


reports:{

type:Number,
default:0

},


},

{
timestamps:true
}

);



export default
mongoose.models.ThreatScan ||
mongoose.model<IThreatScan>(
"ThreatScan",
ThreatScanSchema
);