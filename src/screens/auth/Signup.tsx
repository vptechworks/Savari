// screens/SignupScreen.tsx
import React, { useRef } from "react";
import { View , Text, StyleSheet , TouchableOpacity} from "react-native";
import { useForm } from "react-hook-form";
import FormInput from "../../components/Form";
import CustomButton from "../../components/Button";
import Svg,{Path} from "react-native-svg";
type SignupProps = {
  handleOtpPage : (data: string) => void;
};


const Signup: React.FC<SignupProps> = ({handleOtpPage}) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Signup data:", data);
    handleOtpPage("otp")
    // Call API here
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