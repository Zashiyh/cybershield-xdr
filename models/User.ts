import mongoose, {
Schema,
Document
} from "mongoose";


export interface IUser extends Document{

name:string;

email:string;

password:string;

role:
"admin" |
"analyst" |
"viewer";

createdAt:Date;

}



const UserSchema =
new Schema<IUser>({

name:{
type:String,
required:true
},


email:{
type:String,
required:true,
unique:true
},


password:{
type:String,
required:true
},


role:{
type:String,
default:"viewer"
},


},
{
timestamps:true
}
);



export default mongoose.models.User ||
mongoose.model<IUser>(
"User",
UserSchema
);