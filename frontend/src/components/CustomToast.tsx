import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import Svg ,{Path} from "react-native-svg";

const CheckmarkIcon = () => (
  <Svg
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={2}
  stroke="#fff"
  width={26}
  height={26}
>
  <Path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
  />
  <Path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M9 12l2 2 4-4"
  />
</Svg>

);

const CloseMarkIcon = () => (
  <Svg
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={2}
  stroke="#fff"
  width={30}
  height={30}
>
  <Path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M15 9l-6 6"
  />
  <Path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"
  />
  <Path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M9 9l6 6"
  />
</Svg>

);

export const ToastConfig = {

  success: ({ text1, text2 }: any) => (
    <View style={[styles.container, styles.success]}>
      {/* <Ionicons name="checkmark-circle" size={28} color="#fff" /> */}
      <CheckmarkIcon />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.title}>{text1}</Text>
        {text2 ? <Text style={styles.message}>{text2}</Text> : null}
      </View>
    </View>
  ),

  error: ({ text1, text2 }: any) => (
    <View style={[styles.container, styles.error]}>
      {/* <Ionicons name="close-circle" size={28} color="#fff" /> */}
      <CloseMarkIcon />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.title}>{text1}</Text>
        {text2 ? <Text style={styles.message}>{text2}</Text> : null}
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    padding: 14,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  success: {
    backgroundColor: "rgba(46, 204, 113, 0.9)",
  },
  error: {
    backgroundColor: "rgba(231, 76, 60, 0.9)",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
  },
  message: {
    fontSize: 14,
    color: "#fff",
    letterSpacing: 0.5,

  },
});
