import User from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

async function signupUser(req,res,next){
  try {
    const { userName , mobileNumber } = req.body;
    
    if(
      [userName, mobileNumber].some((field) => field?.trim() === "")
    ){
      throw new ApiError(400, "All fields are required")
    }
    
    const existedUser = await User.findOne({mobileNumber})
    console.log(existedUser);
    
    if(existedUser){
      throw new ApiError(409, "User with Mobile number already existed")
    }
    
    const newUser = new User({userName,mobileNumber})
    await newUser.save()
    .then(() => {
       new ApiResponse(201, "User saved Successfully")
    })

    const createdUser = await User.findById(newUser._id).select("-_id userName mobileNumber")
    console.log("created user: ", createdUser);

    if(!createdUser){
      throw new ApiError(500,"somthing went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser, "User registered Successfully")
    )
  } catch (error) {
    console.log("error in signup backend ",error)
    return res.status(error.statusCode).json({
      statusCode: error.statusCode,
      success : error.success,
      message: error.message
    })
  }
}

async function loginUser(req,res,next){
  try {
    const {mobileNumber} = req.body;

    if(!mobileNumber){
      throw new ApiError(400,"Mobile Numebr is required ")
    }
    
    const user = await User.findOne({mobileNumber}).select("-_id userName mobileNumber");
    if(!user){
      throw new ApiError(404,"user does not exist");
    }
    
    console.log("user login " ,user);
    return res.status(200).json(
      new ApiResponse(200,user,"User loggeed in sucessfully")
    )

  } catch (error) {
    console.error("error while login: ",error);
    return res.status(error.statusCode).json({
      statusCode: error.statusCode,
      success: error.success,
      message: error.message  
    })
  }
}

// async function signoutUser(req,res,next){
//   const { mobileNumber } = req.body;

//   if(!mobileNumber){
//     throw new ApiError(404,"Mobile Number required");
//   }

//   const user = await User.findOne({mobileNumber})

//   if(!user){
//     throw new ApiError(404,"something went wrong ")
//   }

  

// }

export {
  loginUser,
  signupUser
}
