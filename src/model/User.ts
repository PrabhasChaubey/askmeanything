import mongoose,{Schema,Document} from "mongoose";


export interface Message extends Document{
    content:string; //tyoescript ki string smaller me likhte jabki mongoose ki Capital me
    createdAt:Date
}

const MessageSchema: Schema<Message> = new Schema ({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type: Date,
        required : true,
        default:Date.now
    }
})

//Ab user ka schema chahiye
//to pehle interface banayenge
export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified: boolean;
    isAcceptingMessage:boolean;
    messages:Message[]
}

//now we make user schema
const UserSchema: Schema<User> = new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim: true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        match:[/.+\@.+\..+/,'please use a valid email address'] //regex for valid email addres,chatgpt or regex.org
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    verifyCode:{
        type:String,
        required:[true,"verify Code is required"]
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"verify Code expiry is required"]
    },
    isVerified :{
        type:Boolean,
        default:false,
    },
    isAcceptingMessage :{
        type:Boolean,
        default:false,
    },
    messages:[MessageSchema]

})

const UserModel= (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)

export default UserModel