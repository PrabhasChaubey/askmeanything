import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/model/User";
import z from "zod";
import { usernameValidation } from "@/src/schemas/signUpSchema";
import { log } from "console";


const UsernameQuerySchema=z.object({
    username:usernameValidation
})

export async function GET(request:Request){
    await dbConnect()

    try {
        //username check karenge url se
        //ab url is typa ka hoga:- localhost:3000/api/cuu?username=prabhas?phone=android just for example maane hai url me bhot saare parameters hai
        const {searchParams}=new URL(request.url)
        const queryParam={
            username:searchParams.get('username')
        }
        //validate with zod
        const result=UsernameQuerySchema.safeParse(queryParam)

        //result ko print karake dekhna hai, is se bhot kuch pata chalta hai
        //console.log(result)

        if(!result.success){
            const usernameErrors=result.error.format().username?._errors|| []

            return Response.json({
                success:false,
                message: usernameErrors?.length>0
                ? usernameErrors.join(', ')
                : 'Invalid query paramters',
            },{status: 400})
        }

        const {username}=result.data

        const existingVerifiedUser=UserModel.findOne({username,isVerified:true})

        if(existingVerifiedUser){
            return Response.json({
                success:false,
                message:'Username is already taken'
            },{status: 400})
        }

        return Response.json({
                success:true,
                message:'Username is unique'
            },{status: 400})

    } catch (error) {
        console.error("Error cheching username", error)
        return Response.json(
            {
                success:false,
                message:"Error checking username"
            },
            {status:500}
        )
    }
}