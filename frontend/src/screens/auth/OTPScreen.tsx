import React from "react";
import { View , Text, StyleSheet, TouchableOpacity} from "react-native";
import { useForm } from "react-hook-form";
import { useDetail } from "../../store/DetailsContext";
import FormInput from "../../components/Form";
import OTPInput from "../../components/OTPInput";
import CustomButton from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../store/AuthContext";
import Toast from "react-native-toast-message";

const OTPScreen = () => {
    const { control, handleSubmit } = useForm();
    const { mobileNumber } = useDetail();
    const {login} = useAuth()

    const resendOTP = async (data: any) => {
      try {
        const response = await fetch("http://10.0.2.2:8000/api/otp/sendOtp",{
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({mobileNumber})
      });

      const result = await response.json();
      console.log(result)

      if(!response.ok){
        console.log(result.message);
        Toast.show({
          type: "error",
          text1: "limit reached",
          text2: result.message || "something went wrong"
        })
        return;
      }

      Toast.show({
        type: "success",
        text1: "OTP send sucessfully",
        text2: result.message
      })
      
      } catch (error) {
        console.log("otp resending error" , error )
        Toast.show({
          type: "error",
          text1: "Network error",
          text2: "somthing went wrong"
        })
      }
    } 

    const onSubmit = async (data: any) => {
    console.log("OTP:", data);
    const {otp} = data;
    // Call API here
    try {
      const response = await fetch("http://10.0.2.2:8000/api/otp/verifyOtp",{
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({mobileNumber,otp})
      });

      const result = await response.json();
      console.log(result);

      if(!response.ok){
        console.log("otp verifiacation error:",result.message)
        Toast.show({
              type: "error",
              text1: "Invalid OTP",
              text2: result.message || "somthing went wrong"
            })
        return;
      }

      await login(result.other)

      Toast.show({
              type: "success",
              text1: result.message,
              text2: "user sucessfully registered"
            })
      console.log("user sucessfully registered",result.message)
  
    } catch (error) {
      console.log("network error", error)
      Toast.show({
                type: "error",
                text1: "network error",
                text2: "somthing went wrong"
              })
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.otpTitle}>Enter Your OTP code here</Text>
      <OTPInput
        control={control}
        name="otp"
        rules={{
          required: "OTP is required",
          pattern: {
                  value: /^[0-9]{4}$/,
                  message: "OTP must be exactly 4 digits",
                },
        }}
        length={4}
      />
      <View style={styles.otpResendContainer}><Text style={styles.otpTitle}>Didn't receive code?</Text>
      <TouchableOpacity 
      onPress={resendOTP}>
        <Text style={[styles.otpTitle,{color:'#d0a825'}]}> Resend OTP</Text>
      </TouchableOpacity>
      </View>
      
      <CustomButton
      title = "Verify"
      onPress={handleSubmit(onSubmit)} 
      />
    </View>
  )
}

export default OTPScreen

const styles = StyleSheet.create({
  container: {
    flex : 1,
  },
  otpTitle : {
    marginTop : 15,
    marginBottom : 15,
    alignSelf : "center",
    fontSize : 17,
    fontWeight : 600,
    color : "#666",
    letterSpacing : 0.5
  },
  otpResendContainer:{
    flex:1,
    flexDirection:"row",
    justifyContent:"center"
  }

})