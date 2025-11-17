import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import { otpGenerate } from "../utils/OtpGenerate.js";

async function sendOtp (req,res,next) {
  try {
    const {mobileNumber} = req.body;

    if(!mobileNumber){
      throw new ApiError(400,"Mobile Number is requied")
    }

    const otp = otpGenerate();
    const user = await User.findOne({mobileNumber})
    const expiry = Date.now() + 5 * 60 * 1000; // 5 min

    if(!user){
      throw new ApiError(404,"User does not exist");
    }

    if(user.resendCount >= 3){
      throw new ApiError(400,"Resend limit reached. Try again later.")
    }

    //update otp resend Count after sending otp to the user
    user.otp = otp;
    user.otpExpiry = expiry;
    user.resendCount +=1;
    await user.save();
    
    //sending otp to the user
    console.log("generated Otp: ",otp);
    // await SendSms(mobileNumber,"Your OTP is ",otp);

    return res.status(200).json(
      new ApiResponse(200,"OTP send to your Mobile Number")
    )
  } catch (error) {
    console.error("error during sending otp : ",error)
  }
}


async function verifyOtp(req,res,next) {

  try {
    const { otp,mobileNumber } = req.body
    
    if(!otp){
      throw new ApiError(400,"OTP required");
    }

    const user = await User.findOne({mobileNumber})
    console.log(user);
    
    if(!user){
      throw new ApiError(400,"user not found")
    }
    
    if(user.otp !=  Number(otp)){
      throw new ApiError(400 , "Invalid OTP ")
    }
    if(Date.now > user.otpExpiry ){
      throw new ApiError(400,"otp expied !")
    }

    user.otp = null;
    user.otpExpiry = null; 
    user.resendCount = 0;
    await user.save();
    
    return res.status(201).json(
      new ApiResponse(200,"OTP verified sucessfully")
    )
    
  } catch (error) {
    console.log("error while varifying otp ",error)
  }
}

export {sendOtp,verifyOtp}

