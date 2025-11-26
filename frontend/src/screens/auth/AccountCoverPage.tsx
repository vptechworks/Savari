import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useRoute } from "@react-navigation/native";
import Signup from "./Signup";
import Signin from "./Signin"
import OTPScreen from "./OTPScreen";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Svg ,{Path} from "react-native-svg";

type RootStackParamList = {
  AccountCover: { pageType: string };
  AppStack: undefined;
  signup: undefined;
  signin: undefined;
  otp: { phone?: string };
};

type AccountCoverPageRouteProp = StackNavigationProp<RootStackParamList, "AccountCover">;

const AccountCoverPage: React.FC = () => {
  // ✅ useRoute hook with TypeScript
  const route = useRoute<RouteProp<RootStackParamList, "AccountCover">>();
  const { pageType } = route.params;
  const navigation = useNavigation<AccountCoverPageRouteProp>();


  const [page, setPage] = useState<string>(pageType);
  const [mobileNumber, setMobileNumber] = useState<string>()

  // ✅ Proper function handlers
  const handleSignupPage = () => {
    setPage("signup");
  };

  const handleSigninPage = () => {
    setPage("signin");
  };

  const handleOtpPage = (data: string) => {
    setPage("otp");
    setMobileNumber(data);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoBase}>
        <View style={{alignSelf:'flex-start',marginLeft:20}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Svg
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={1.5}
  stroke="currentColor"
  width={30}
  height={30}
>
  <Path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  />
</Svg>
    </TouchableOpacity>
        </View>
        <Image
          source={require("../../assets/logo/logo2.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.scroll}>
        <View style={styles.card}>
          <View style={styles.titleCard}>
            {/* ✅ call functions properly */}
            
            {page !=="otp" ? <TouchableOpacity onPress={handleSignupPage}>
              <Text
                style={[
                  styles.title,
                  page === "signup" && { color: "#d0a825" },
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity> : null}

            {page !== "otp" ? <TouchableOpacity onPress={handleSigninPage}>
              <Text
                style={[
                  styles.title,
                  page === "signin" && { color: "#d0a825" },
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity> : null}

           {page === "otp" ?  <Text style={[styles.title ,{color: "#d0a825"}]}>Phone Verification</Text> : null}
          </View>
          {page === "otp" ? <OTPScreen 
          /> :  page === "signup" ? <Signup handleOtpPage={handleOtpPage} /> : <Signin handleOtpPage={handleOtpPage}/>}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountCoverPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d0a825",
    justifyContent: "space-between",
  },
  logoBase: {
    height: 320,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: 200,
    marginBottom: 10,
    elevation : 5,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    position: "absolute",
    marginTop: 235,
    width: 400,
    alignSelf: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderColor: "#d0a825",
    borderWidth: 1,
    padding: 20,
    elevation: 5,
  },
  titleCard: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    marginBottom: 5,
    height : 45,
    borderBottomColor:"#D8D8D8",
    borderBottomWidth:1
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color:"#666",
  },
});
