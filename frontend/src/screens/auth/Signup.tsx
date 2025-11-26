// screens/SignupScreen.tsx
import React, { useRef, useState } from "react";
import { View , Text, StyleSheet , TouchableOpacity} from "react-native";
import { useForm } from "react-hook-form";
import FormInput from "../../components/Form";
import CustomButton from "../../components/Button";
import { useDetail } from "../../store/DetailsContext";
import Svg,{Path} from "react-native-svg";
import Toast from "react-native-toast-message";
type SignupProps = {
  handleOtpPage : (data: string) => void;
};


const Signup: React.FC<SignupProps> = ({handleOtpPage}) => {
  const { control, handleSubmit } = useForm();
  const {setMobileNumber} = useDetail();

  const onSubmit = async (data: any) => { 
    const {name,phoneNumber} = data;

    try {
      const response = await fetch("http://10.0.2.2:8000/api/user/signup",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userName: name, mobileNumber : phoneNumber}),
      });

      const result = await response.json();
      
      if(!response.ok){
        console.log("signup error :",result.message)
        Toast.show({
          type: "error",
          text1: "signup error",
          text2: result.message || "somthing went wrong"
        })
        return
      }
      
      console.log("signup sucessfull",result.message)

      const recivedNumber = result.data.mobileNumber
      setMobileNumber(recivedNumber)
      handleOtpPage("otp");

      // send otp request 

      const otpResponse = await fetch("http://10.0.2.2:8000/api/otp/sendOtp",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({mobileNumber : recivedNumber}),
      });

      const otpResult = await otpResponse.json();
      console.log(otpResult)
      console.log(otpResponse.ok);
      
      if(!otpResponse.ok){
        console.log("otp error: ",otpResult.message)
        Toast.show({
          type: "error",
          text1: "otp error",
          text2: otpResult.message || "somthing went wrong"
        })
        return;
      }

      console.log("otp send sucessfully",otpResult.message)
      Toast.show({
        type: "success",
        text1: "OTP Send",
        text2: otpResult.message
      })

    } catch (error) {
      console.error("network error", error)
      Toast.show({
          type: "error",
          text1: "network error",
          text2: "somthing went wrong"
        })
    }
  };

  return (
    <View>
      <FormInput
        name="name"
        control={control}
        placeholder="Full Name"
        rules={{
                required: "Name is required",
                minLength: { value: 3, message: "Name must be at least 3 characters" },
                pattern: {
                  value: /^[A-Za-z ]+$/, 
                  message: "Only letters are allowed",
                },
              }}
      />
      <FormInput 
      name="phoneNumber"
      control={control} 
      placeholder="Phone Number"
      type="phone"
      rules={{ required: "Phone number required" }} 
      />
      <View style={styles.TermsContainer}><Text style={styles.TandC}>By Signing up,you agree to our </Text>
            <TouchableOpacity 
            onPress={() => (console.log("you are aggreed with our termss and condition"))}>
              <Text style={[styles.TandC,{color:'#d0a825'}]}>Terms of Conditions</Text>
            </TouchableOpacity>
            </View>
      <CustomButton
      title = "Signup"
      onPress={handleSubmit(onSubmit)} 
      />
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex : 1,
  },
  TandC : {
    marginBottom : 15,
    alignSelf : "center",
    fontSize : 12,
    fontWeight : 600,
    color : "#666",
    letterSpacing : 0.5
  },
  TermsContainer:{
    flex:1,
    flexDirection:"row",
    justifyContent:"center"
  }
}) 