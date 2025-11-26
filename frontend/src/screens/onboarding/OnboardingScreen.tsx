// src/screens/OnboardingScreen.tsx
import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet , Image} from "react-native";
import PagerView from "react-native-pager-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg ,{Path} from "react-native-svg";
import { useAuth } from "../../store/AuthContext";
const { width } = Dimensions.get("window");

const pages = [
  {
    title: " Rides for Every Season",
    desc: "Summer, Winter, or Rainy Days — we’re always there when you need us.",
    bg: "#fff",
    background:require("../../assets/onboarding/onboarding1.png") 
  },
  {
    title: "Safe & Reliable",
    desc: "Every ride is tracked, every driver is verified — your safety is our priority.",
    bg: "#fff",
    background:require("../../assets/onboarding/onboarding2.png")
  },
  {
    title: "Affordable & Convenient",
    desc: "Transparent pricing with no surprises. Ride anytime, anywhere and save money.",
    bg: "#fff",
    background:require("../../assets/onboarding/onboarding3.png")
  },
];

const OnboardingScreen = ({ navigation }: any) => {
  const pagerRef = useRef<PagerView>(null);
  const [page, setPage] = useState(0);
  const {onboarded} = useAuth();

  const handleNext = () => {
    if (page < pages.length - 1) {
      pagerRef.current?.setPage(page + 1);
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = async () => {
    // storage.set("hasOnboarded", "true");
    navigation.replace("Location");
    await onboarded();
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Pager */}
      
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >
        {pages.map((p, i) => (
          <View key={i} style={[styles.page, { backgroundColor: p.bg }]}>
            <View style={styles.skipDiv}>
              {page < pages.length - 1 ? (
          <TouchableOpacity onPress={finishOnboarding}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity> 
        ) : (
          <View style={{ width: 50 }} /> // placeholder to balance layout
        )}
            </View>
            <Image
              source={p.background}
              style={styles.onboardingImage}
              resizeMode="contain"
            />
            <Text style={styles.title}>{p.title}</Text>
            <Text style={styles.desc}>{p.desc}</Text>
            <View style={styles.page} key="1">
      </View>
      
      <View style={styles.nextGo}>
          <TouchableOpacity onPress={handleNext}>
          <Text style={styles.nextText}>
            {page === pages.length - 1 ? 
            "Go"
            : 
           (<Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 12h14M13 5l7 7-7 7"
      stroke={"black"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>)
            }
          </Text>
        </TouchableOpacity>
        </View>
          </View>
        ))}
      </PagerView>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  skipDiv :{
    flexDirection:"row",
    alignSelf:"flex-end"
  },
  skip: {
    fontSize: 16,
    color: "#666",
    fontWeight:"500",
    letterSpacing:0.5
  },
  onboardingImage:{
    marginTop:30,
    height:300,
    width:400,
  },
  title: {
    marginTop:30,
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  desc: {
    fontSize: 16,
    color: "#444",
    fontWeight: "bold",
    textAlign: "center",
  },
  next: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  dots: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  nextGo:{
    backgroundColor: '#d0a825',
    height:70,
    width:70,
    borderRadius:50,
    justifyContent:"center",
    alignItems:"center",
    marginBottom:40,
  },
  nextText:{
    color:"#000",
    fontSize:40,
    fontWeight:"bold",
  }
});
