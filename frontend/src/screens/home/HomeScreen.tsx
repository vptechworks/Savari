import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet,Text, KeyboardAvoidingView,Platform, TouchableOpacity, Image} from "react-native";
import Svg,{Path,Circle} from "react-native-svg";
import { useFocusEffect } from '@react-navigation/native';
//components
import SearchBar from "../../components/SearchBar";
import { LocationComponent } from "../../components/LocationComponent";

const HomeScreen = ({navigation} : any) => {
  const [onSearch,setOnSearch] = useState(false)
  const [locationGranted , setLocationGranted] = useState(false)
  
  useFocusEffect(
    useCallback(() => {
      setOnSearch(false);
    },[])
  )

  const handleLocation = async () =>{
    try {
      const hasLocation = await LocationComponent();
      console.log("haslocation",hasLocation);
      if(hasLocation){
        setLocationGranted(true)
    }
    } catch (error) {
      console.log("error seting location",error )
    }
  }

  useEffect(() => {
    if(onSearch){
      navigation.navigate("SearchBar");
    }
    (async () => {
      await handleLocation();
    })();
  },[])

  const handleOnSearch = () => {
    setOnSearch(true);
  }
  // console.log(onSearch);
  


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined} // only affects iOS
      keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 0}  // adjust for header height if needed
    >
        {!locationGranted && (
          <TouchableOpacity onPress={handleLocation} style={styles.locationContainer}>
            <Text style={styles.locationHeading}>
              We could not find you
            </Text>
            <Text style={styles.locationText}>
              Tap to turn on Location
            </Text>
          </TouchableOpacity>)}
        
      <View style={styles.container}>
          <Image
                  source={require("../../assets/logo/logo3.png")} // <-- replace with your image
                  // style={styles.image}
                  style={{height:80,width:250,alignSelf:"center"}}
                  resizeMode="cover"
                />


        {!onSearch && (
          <TouchableOpacity onPress={handleOnSearch}>
          <View style={styles.searchContainer}>
          <Svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              width={28}
              height={28}
              style={styles.searchIcon}
              >
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.34-4.34"
                />
              <Circle
                cx={11}
                cy={11}
                r={8}
                />
            </Svg>
          <Text style={styles.searchPlaceholder}>Where to?</Text>
        </View>
        </TouchableOpacity>
        )
        }
      </View>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
  flex: 1,
  padding: 16,
  backgroundColor: "#fff",
},
locationContainer: {
  height: 80,
  backgroundColor: "#d0a825",
  alignItems: "center",
  justifyContent: "center",

  // Shadow / Elevation
  elevation: 8,
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 3 },
},

locationHeading: {
  fontSize: 18,
  fontFamily: "ubuntu",
  fontWeight: "700",
  letterSpacing: 0.5,
  color: "#000",
},

locationText: {
  fontSize: 14,
  fontWeight: "500",
  color: "#333",
},
  searchContainer: {
    height: 55,
    backgroundColor: "#d0a825",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 50
  },
  searchIcon: {
    marginLeft: 20
  },
  searchPlaceholder: {
    fontFamily: "ubuntu",
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 700,
  }
});

export default HomeScreen;

{/* <SearchBar onSearch={(query) => console.log("User searched for:", query)}  /> */}