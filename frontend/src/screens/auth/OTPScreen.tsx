import React from "react";
import { View , Text, StyleSheet, TouchableOpacity} from "react-native";
import { useForm } from "react-hook-form";
import { useDetail } from "../../store/DetailsContext";
import FormInput from "../../components/Form";
import OTPInput from "../../components/OTPInput";
import CustomButton from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

type OTPScreenProps = {
  onVarifySuccess: () => void; // callback from parent
};

const OTPScreen: React.FC<OTPScreenProps> = ({ onVarifySuccess }) => {
    const { control, handleSubmit } = useForm();
    const { mobileNumber } = useDetail();

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
      if(result.success){
        onVarifySuccess(); // call parent navigation
        AsyncStorage.setItem("userToken","true")
      }
    } catch (error) {
      console.log("error during otp verification", error)
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
      onPress={() => (console.log("otp send to your mobile"))}>
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