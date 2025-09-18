import React from "react";
import { View , Text} from "react-native";
import { useForm } from "react-hook-form";
import FormInput from "../../components/Form";
import CustomButton from "../../components/Button";

type SigninProps = {
  handleOtpPage : (data: string) => void;
};

const signin: React.FC<SigninProps> = ({handleOtpPage}) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("signin data:", data);
    handleOtpPage("otp")
    // Call API here
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
