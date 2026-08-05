import mongoose, {
  Schema,
  Document
} from "mongoose";


export interface IAsset extends Document {

  name:string;

  ip:string;

  os:string;

  type:string;

  status:string;

  risk:string;

  lastSeen:Date;

}




const AssetSchema =
new Schema<IAsset>(

{

name:{

type:String,

required:true

},


ip:{

type:String,

required:true,

unique:true

},


os:{

type:String,

required:true

},


type:{

type:String,

required:true

},


status:{

type:String,

default:"Online"

},


risk:{

type:String,

default:"LOW"

},


lastSeen:{

type:Date,

default:Date.now

}


},

{

timestamps:true

}

);



export default

mongoose.models.Asset ||

mongoose.model<IAsset>(
"Asset",
AssetSchema
);