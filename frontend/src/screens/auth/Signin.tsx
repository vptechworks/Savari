import React from "react";
import { View , Text} from "react-native";
import { useForm } from "react-hook-form";
import FormInput from "../../components/Form";
import CustomButton from "../../components/Button";
import { useDetail } from "../../store/DetailsContext";

type SigninProps = {
  handleOtpPage : (data: string) => void;
};

const signin: React.FC<SigninProps> = ({handleOtpPage}) => {
  const { control, handleSubmit } = useForm();
  const {setMobileNumber } = useDetail();

  const onSubmit = async (data: any) => {
    console.log("signin data:", data);
    const {PhoneNumber} = data;
    // handleOtpPage("otp")
    // Call API here
    try {
      const response = await fetch("http://10.0.2.2:8000/api/user/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({mobileNumber : PhoneNumber}),
      });  
      const result = await response.json()
      const recivedNumber = result.data.mobileNumber
      const success = result.success;

      if(success){
        setMobileNumber(recivedNumber)
        handleOtpPage("otp");
        try {
          await fetch("http://10.0.2.2:8000/api/otp/sendOtp",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({mobileNumber : recivedNumber}),
      });
        } catch (error) {
          console.error("error while otp: ",error);
        }
      }
      
      console.log(result);
    } catch (error) {
      console.error("error while login frontend:  ",error)
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
