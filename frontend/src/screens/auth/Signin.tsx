import React from "react";
import { View , Text} from "react-native";
import { useForm } from "react-hook-form";
import FormInput from "../../components/Form";
import CustomButton from "../../components/Button";
import { useDetail } from "../../store/DetailsContext";
import Toast from "react-native-toast-message";

type SigninProps = {
  handleOtpPage : (data: string) => void;
};

const signin: React.FC<SigninProps> = ({handleOtpPage}) => {
  const { control, handleSubmit } = useForm();
  const {setMobileNumber } = useDetail();

  const onSubmit = async (data: any) => {
    console.log("signin data:", data);
    const {PhoneNumber} = data;

    try {
      const response = await fetch("http://10.0.2.2:8000/api/user/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({mobileNumber : PhoneNumber}),
      });  
      const result = await response.json()

      if(!response.ok){
        console.log("login failed : ",result.message)
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: result.message || "Something Went Wrong",
        })
        return;
      }

      const recivedNumber = result.data.mobileNumber
      setMobileNumber(recivedNumber)
      handleOtpPage("otp");

      const otpResponse = await fetch("http://10.0.2.2:8000/api/otp/sendOtp",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({mobileNumber : recivedNumber}),
      });

      const otpResult = await otpResponse.json()

      if(!otpResponse.ok){
        console.log("otp error: ",otpResult.message)
        Toast.show({
          type: "error",
          text1: "OTP send Failed",
          text2: otpResult.message || "Something Went Wrong",
        })
        return;
      }

      Toast.show({
        type: "success",
        text1: "OTP send sucessfully",
        text2: otpResult.message
      })
      console.log("otp sends sucessfully: ",otpResult.message)
      
    } catch (error) {
      console.error("network error: ",error)
      Toast.show({
                type: "error",
                text1: "network error",
                text2: "somthing went wrong"
              })
    }
  };

  return (
    <View>
      <Text style={{fontSize : 16 , marginVertical : 15 , textAlign : "center" , letterSpacing : 0.5 , color : "#666" , fontWeight : 600}}>Login with your Phone Number</Text>
      <FormInput 
      name="PhoneNumber"
      control={control} 
      placeholder="Phone Number"
      type="phone"
      rules={{ required: "Phone number required" }} 
      />
      <CustomButton
      title = "Signin"
      onPress={handleSubmit(onSubmit)} 
      />
    </View>
  );
};

export default signin;
