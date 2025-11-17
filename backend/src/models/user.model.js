import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
  userName:{
    type: String,
    required: true,
    trim: true,
  },
  mobileNumber:{
    type: Number,
    require: true,
    unique: true,
  },
  otp:{
    type: Number,
    default: null,
  },
  otpExpiry: {
    type: Date,
    default: null,
  },
  resendCount: {
    type: Number,
    default: 0,
  },
},
{
  timestamps: true
})

const User = mongoose.model("User",userSchema)
export default User;