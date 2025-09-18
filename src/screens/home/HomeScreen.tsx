import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet,Text, KeyboardAvoidingView,Platform, TouchableOpacity, Image} from "react-native";
import Svg,{Path,Circle} from "react-native-svg";
import { useFocusEffect } from '@react-navigation/native';
//components
import SearchBar from "../../components/SearchBar";
import { LocationComponent } from "../../components/LocationComponent";



const HomeScreen = ({navigation} : any) => {
  const [onSearch,setOnSearch] = useState(false)
  const [location , setLocation] = useState(false)
  
  useFocusEffect(
    useCallback(() => {
      setOnSearch(false);
    },[])
  )

  useEffect(() => {
    if(onSearch){
      navigation.navigate("SearchBar");
    }

    (async () => {
      const isOn = await LocationComponent();
      if (isOn) {
        setLocation(true);
        console.log("🚀 Redirect to Welcome/Login screen here");
      }
    })();
  },[onSearch,navigation])

  const handleOnSearch = () => {
    setOnSearch(true);
  }
  console.log(onSearch);
  


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined} // only affects iOS
      keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 0}  // adjust for header height if needed
    >
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
        {!location && (
          <View>
            <Text>
              Open your Location
            </Text>
          </View>)}
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