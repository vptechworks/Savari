// src/screens/WelcomeScreen.tsx
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Welcome = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* Illustration */}
      <Image
        source={require("../../assets/onboarding/welcome.png")} // <-- replace with your image
        style={styles.image}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Have a better sharing experience</Text>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.createBtn}
        onPress={() => navigation.navigate("AccountCoverPage",{
          pageType : "signup"
        })}
      >
        <Text style={styles.createBtnText}>Create an account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate("AccountCoverPage",{
          pageType : "signin"
        })}
        // onPress={() => navigation.navigate("HomeControler")}
      >
        <Text style={styles.loginBtnText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 400,
    height: 300,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 130,
    textAlign: "center",
    letterSpacing: 0.5
  },
  createBtn: {
    backgroundColor: "#d0a825",
    paddingVertical: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  createBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginBtn: {
    borderColor: "#d0a825",
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  loginBtnText: {
    color: "#d0a825",
    fontSize: 16,
    fontWeight: "600",
  },
});
